const DB_NAME = 'JobBoardDB';
const DB_VERSION = 3;

// Tab store mapping
const TAB_STORES = {
    jobs: 'scoredJobs',
    'quick-apply': 'quickApplyJobs',
    'linkedin-apply': 'linkedinJobs',
    'w2-c2c': 'w2Jobs',
};
const META_STORE_NAME = 'jobMetadata';

const getAllStoreNames = () => Object.values(TAB_STORES);

export const initDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            // Create all tab stores
            for (const store of getAllStoreNames()) {
                if (!db.objectStoreNames.contains(store)) {
                    db.createObjectStore(store, { keyPath: 'id' });
                }
            }
            if (!db.objectStoreNames.contains(META_STORE_NAME)) {
                db.createObjectStore(META_STORE_NAME);
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
};

const getStoreName = (tab = 'jobs') => TAB_STORES[tab] || TAB_STORES['jobs'];
const getMetaKey = (tab = 'jobs') => `${getStoreName(tab)}_meta`;

export const saveJobs = async (jobs, tab = 'jobs') => {
    const db = await initDB();
    const storeName = getStoreName(tab);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        store.clear();
        jobs.forEach(job => store.add({ ...job, cachedAt: Date.now() }));
        transaction.oncomplete = () => resolve();
        transaction.onerror = (event) => reject(event.target.error);
    });
};

export const getJobs = async (tab = 'jobs') => {
    const db = await initDB();
    const storeName = getStoreName(tab);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = () => {
            const jobs = request.result;
            const now = Date.now();
            // Expire after 30 minutes, or if < 50 jobs (stale old cache)
            const freshJobs = jobs.filter(j => (now - j.cachedAt) < 30 * 60 * 1000);
            if (freshJobs.length < 50 && jobs.length > 0) {
                resolve([]); // Stale/small cache - bust it
            } else {
                resolve(freshJobs);
            }
        };

        request.onerror = (event) => reject(event.target.error);
    });
};

export const saveMetadata = async (meta, tab = 'jobs') => {
    const db = await initDB();
    const key = getMetaKey(tab);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(META_STORE_NAME, 'readwrite');
        const store = transaction.objectStore(META_STORE_NAME);
        store.put(meta.total, `${key}_total`);
        store.put(meta.scannedTotal, `${key}_scannedTotal`);
        transaction.oncomplete = () => resolve();
        transaction.onerror = (event) => reject(event.target.error);
    });
};

export const getMetadata = async (tab = 'jobs') => {
    const db = await initDB();
    const key = getMetaKey(tab);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(META_STORE_NAME, 'readonly');
        const store = transaction.objectStore(META_STORE_NAME);
        const totalReq = store.get(`${key}_total`);
        const scannedReq = store.get(`${key}_scannedTotal`);
        transaction.oncomplete = () => resolve({
            total: totalReq.result || 0,
            scannedTotal: scannedReq.result || 0,
        });
        transaction.onerror = (event) => reject(event.target.error);
    });
};

export const clearJobs = async (tab = null) => {
    const db = await initDB();
    // If a specific tab, clear only that store; otherwise clear all
    const storesToClear = tab ? [getStoreName(tab)] : getAllStoreNames();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([...storesToClear, META_STORE_NAME], 'readwrite');
        storesToClear.forEach(s => transaction.objectStore(s).clear());
        transaction.objectStore(META_STORE_NAME).clear();
        transaction.oncomplete = () => resolve();
        transaction.onerror = (event) => reject(event.target.error);
    });
};
