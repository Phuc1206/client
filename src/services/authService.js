import * as httpRequest from '../utils/httpRequest';
export const register = async (data) => {
    try {
        const res = await httpRequest.post(`auth/`, data);
        return res;
    } catch (error) {
        console.error(error);
    }
};
export const login = async (data) => {
    try {
        const res = await httpRequest.post(`auth/login/`, data);
        return res;
    } catch (error) {
        console.error(error);
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
