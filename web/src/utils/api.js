/**
 * Standardized API utility for Big Career Dream.
 * Automatically handles base URL resolution based on environment.
 */

const getApiBaseUrl = () => {
    const configured = import.meta.env.VITE_API_URL;
    if (configured) {
        return configured;
    }
    // In development, use local server
    if (import.meta.env.DEV) {
        return 'http://localhost:4000/api/v1';
    }
    // Production fallback: use the deployed Vercel API
    return 'https://bigcareerdream-merged.vercel.app/api/v1';
};

const API_BASE = getApiBaseUrl();

/**
 * Generic fetch wrapper with error handling and consistent formatting.
 */
export const api = {
    async request(endpoint, options = {}) {
        const url = `${API_BASE}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...defaultHeaders,
                    ...options.headers,
                },
            });

            const contentType = response.headers.get('content-type');
            let data;
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            if (!response.ok) {
                const errorMsg = (data && typeof data === 'object' && (data.detail || data.error || data.message)) ||
                    (data && typeof data === 'string' ? data : `Request failed: ${response.status}`);
                throw new Error(errorMsg);
            }

            return data;
        } catch (error) {
            console.error(`[API Error] ${endpoint}:`, error.message);
            throw error;
        }
    },

    get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    },

    post(endpoint, body, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body)
        });
    }
};

export default api;
