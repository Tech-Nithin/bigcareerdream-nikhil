import Cookies from 'js-cookie';

/**
 * Store user data in cookies with a standard expiration (7 days).
 * @param {string} key 
 * @param {any} value 
 */
export const setPersistentData = (key, value) => {
    try {
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        Cookies.set(key, stringValue, { expires: 7, path: '/' });
    } catch (error) {
        console.error('Error saving to cookies:', error);
    }
};

/**
 * Retrieve user data from cookies.
 * @param {string} key 
 * @param {boolean} isJson 
 */
export const getPersistentData = (key, isJson = true) => {
    try {
        const value = Cookies.get(key);
        if (!value) return null;
        return isJson ? JSON.parse(value) : value;
    } catch (error) {
        console.warn(`Error parsing cookie ${key}:`, error);
        return null;
    }
};

/**
 * Clear specific persistent data.
 */
export const clearPersistentData = (key) => {
    Cookies.remove(key, { path: '/' });
};

/**
 * Specifically handle the "animation seen" flag to ensure it shows again after some time.
 */
export const setAnimationSeen = () => {
    // Expires in 1 hour so the user sees it again if they return later
    Cookies.set('animation_seen', 'true', { expires: 1/24, path: '/' });
};

export const hasSeenAnimation = () => {
    return Cookies.get('animation_seen') === 'true';
};
