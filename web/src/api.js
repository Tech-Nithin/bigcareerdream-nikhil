const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:4000/api/v1' : 'https://bigcareerdream-merged.vercel.app/api/v1');

const handleResponse = async (response) => {
    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
        data = await response.json();
    } else {
        data = { message: await response.text() };
    }

    if (!response.ok) {
        // Log the error for debugging
        console.error(`[API Error] ${response.status} ${response.url}`, data);
        throw new Error(data.detail || data.message || `Error ${response.status}: ${response.statusText}`);
    }
    return data;
};

export const api = {
    uploadResume: async (file) => {
        const formData = new FormData();
        formData.append('resume', file);
        formData.append('parsedData', JSON.stringify({ email: 'unknown@example.com' })); // Fallback for old standalone upload

        const response = await fetch(`${API_BASE}/onboarding/save-resume`, {
            method: 'POST',
            body: formData,
        });

        return response.json();
    },

    uploadExcel: async (file, date) => {
        const formData = new FormData();
        formData.append('excel', file);
        formData.append('date', date);

        const response = await fetch(`${API_BASE}/datasets/upload-excel`, {
            method: 'POST',
            body: formData,
        });

        return response.json();
    },

    getJobs: async () => {
        const response = await fetch(`${API_BASE}/jobs/jobs-json`);
        return response.json();
    },

    getDatasetDates: async () => {
        const response = await fetch(`${API_BASE}/datasets/dates`);
        return response.json();
    },

    getJobsByDate: async (date) => {
        const response = await fetch(`${API_BASE}/datasets/jobs-by-date?date=${encodeURIComponent(date)}`);
        return response.json();
    },

    checkHealth: async () => {
        const response = await fetch(`${API_BASE}/health`);
        return response.json();
    },

    submitFeedback: async (feedbackData) => {
        const response = await fetch(`${API_BASE}/feedback/feedback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedbackData),
        });
        return response.json();
    },

    submitHelpRequest: async (ticketData) => {
        const response = await fetch(`${API_BASE}/feedback/help-support`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ticketData),
        });
        return response.json();
    },

    parseResume: async (formData) => {
        const response = await fetch(`${API_BASE}/onboarding/parse-resume`, {
            method: 'POST',
            body: formData,
        });
        return response.json();
    },

    saveResume: async (formData) => {
        const response = await fetch(`${API_BASE}/onboarding/save-resume`, {
            method: 'POST',
            body: formData,
        });
        return response.json();
    },

    getUserResumes: async (clientId) => {
        const response = await fetch(`${API_BASE}/onboarding/resumes/${clientId}`);
        return response.json();
    },

    getResumeDetails: async (id) => {
        const response = await fetch(`${API_BASE}/onboarding/resume/${id}`);
        return response.json();
    },

    updateResumeDetails: async (id, data) => {
        const response = await fetch(`${API_BASE}/onboarding/resume/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    deleteResume: async (id) => {
        const response = await fetch(`${API_BASE}/onboarding/resume/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    },

    uploadClientPicture: async (clientId, file) => {
        const formData = new FormData();
        formData.append('picture', file);
        formData.append('client_id', clientId);

        const response = await fetch(`${API_BASE}/onboarding/upload-client-picture`, {
            method: 'POST',
            body: formData,
        });
        return response.json();
    },

    getClientPicture: async (clientId) => {
        const response = await fetch(`${API_BASE}/onboarding/client-picture/${clientId}`);
        return response.json();
    },

    deleteClientPicture: async (clientId) => {
        const response = await fetch(`${API_BASE}/onboarding/client-picture/${clientId}`, {
            method: 'DELETE',
        });
        return response.json();
    },

    getDiceJobs: async ({ search = '', filter = '', limit = 50, offset = 0, date = '', client_id = '', forceRefresh = false } = {}) => {
        const params = new URLSearchParams({ limit, offset });
        if (search) params.set('search', search);
        if (filter) params.set('filter', filter);
        if (date) params.set('date', date);
        if (client_id) params.set('client_id', client_id);
        if (forceRefresh) params.set('force_refresh', 'true');
        const response = await fetch(`${API_BASE}/jobs/dice-jobs?${params}`);
        return response.json();
    },

    getWorkdayJobs: async ({ client_id = '', page = 1, limit = 10 } = {}) => {
        const params = new URLSearchParams({ client_id, page, limit });
        const response = await fetch(`${API_BASE}/jobs/workday-jobs?${params}`);
        return response.json();
    },

    getQuickApplyJobs: async ({ client_id = '', page = 1, limit = 10 } = {}) => {
        const params = new URLSearchParams({ client_id, page, limit });
        const response = await fetch(`${API_BASE}/jobs/quick-apply-jobs?${params}`);
        return response.json();
    },

    getLinkedInApplyJobs: async ({ client_id = '', page = 1, limit = 10 } = {}) => {
        const params = new URLSearchParams({ client_id, page, limit });
        const response = await fetch(`${API_BASE}/jobs/linkedin-jobs?${params}`);
        return response.json();
    },

    getW2Jobs: async ({ client_id = '', page = 1, limit = 10 } = {}) => {
        const params = new URLSearchParams({ client_id, page, limit });
        const response = await fetch(`${API_BASE}/jobs/w2-jobs?${params}`);
        return response.json();
    },

    getJobDetails: async (jobId, clientId) => {
        const response = await fetch(`${API_BASE}/jobs/details/${jobId}${clientId ? `?client_id=${clientId}` : ''}`);
        return response.json();
    },

    // Saved / Applied Jobs Persistence
    saveJob: async (clientId, job) => {
        const response = await fetch(`${API_BASE}/jobs/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ client_id: clientId, job }),
        });
        return response.json();
    },

    unsaveJob: async (clientId, jobId) => {
        const response = await fetch(`${API_BASE}/jobs/unsave`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ client_id: clientId, job_id: jobId }),
        });
        return response.json();
    },

    getSavedJobs: async (clientId) => {
        const response = await fetch(`${API_BASE}/jobs/saved/${clientId}`);
        return response.json();
    },

    applyJob: async (clientId, job) => {
        const response = await fetch(`${API_BASE}/jobs/apply`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ client_id: clientId, job }),
        });
        return response.json();
    },

    getAppliedJobs: async (clientId) => {
        const response = await fetch(`${API_BASE}/jobs/applied/${clientId}`);
        return response.json();
    },

    getDashboardStats: async (clientId) => {
        const response = await fetch(`${API_BASE}/stats/dashboard${clientId ? `?client_id=${clientId}` : ''}`);
        return response.json();
    },

    // Authentication & Promotion
    paymentSuccess: async (leadId) => {
        const response = await fetch(`${API_BASE}/auth/payment-success`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lead_id: leadId }),
        });
        return response.json();
    },

    register: async (clientId, password) => {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ client_id: clientId, password }),
        });
        return handleResponse(response);
    },

    login: async (email, password) => {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return handleResponse(response);
    },

    getClientProfile: async (clientId) => {
        const response = await fetch(`${API_BASE}/onboarding/client/${clientId}`);
        return handleResponse(response);
    },

    updateClientProfile: async (clientId, data) => {
        const response = await fetch(`${API_BASE}/onboarding/client/${clientId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    updateClientDomain: async (clientId, data) => {
        const response = await fetch(`${API_BASE}/onboarding/update-client-domain`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ client_id: clientId, ...data }),
        });
        return handleResponse(response);
    },
};

export default api;
