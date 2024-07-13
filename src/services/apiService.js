import * as httpRequest from '../utils/httpRequest';
export const getHome = async () => {
    try {
        const res = await httpRequest.get('api/');
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
