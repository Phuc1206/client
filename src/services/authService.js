import * as httpRequest from '../utils/httpRequest';
import { toast } from 'react-toastify';
export const register = async (data) => {
    try {
        const res = await httpRequest.post(`auth/`, data);
        return res;
    } catch (error) {
        if (error.response) {
            toast.error(`Error: ${error.response.data.error}`);
        } else if (error.request) {
            toast.error('Error: No response from server');
        } else {
            toast.error(`Error: ${error.message}`);
        }
        return null;
    }
};
export const login = async (data) => {
    try {
        const res = await httpRequest.post(`auth/login/`, data);
        return res;
    } catch (error) {
        if (error.response) {
            toast.error(`Error: ${error.response.data.error}`);
        } else if (error.request) {
            toast.error('Error: No response from server');
        } else {
            toast.error(`Error: ${error.message}`);
        }
        return null;
    }
};
export const getUser = async () => {
    try {
        const res = await httpRequest.get(`auth/`, {
            headers: {
                accessToken: localStorage.getItem('accessToken'),
            },
        });
        return res;
    } catch (error) {
        console.error(error);
    }
};
