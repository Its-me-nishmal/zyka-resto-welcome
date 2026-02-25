import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://zyka-resto-welcome.vercel.app/api';

export const api = {
    submitLead: async (data: any) => {
        const response = await axios.post(`${API_BASE_URL}/submit`, data);
        return response.data;
    },
    logVisit: async (data: { source: string; deviceId: string }) => {
        const response = await axios.post(`${API_BASE_URL}/visit`, data);
        return response.data;
    },
    getSubmissions: async (credentials: string, params: any = {}) => {
        const response = await axios.get(`${API_BASE_URL}/admin/submissions`, {
            headers: { Authorization: `Basic ${credentials}` },
            params
        });
        return response.data;
    },
    getStats: async (credentials: string) => {
        const response = await axios.get(`${API_BASE_URL}/admin/stats`, {
            headers: { Authorization: `Basic ${credentials}` }
        });
        return response.data;
    },
    getExcelUrl: (credentials: string) => {
        // We can't use axios for direct download of files as easily as a link
        // but we can proxy it or use blobs. For simplicity in a prototype:
        return `${API_BASE_URL}/admin/export/excel?auth=${credentials}`;
    },
    getPDFUrl: (credentials: string) => {
        return `${API_BASE_URL}/admin/export/pdf?auth=${credentials}`;
    }
};
