import * as httpRequest from '../utils/httpRequest';
export const search = async (q) => {
    try {
        const res = await httpRequest.get(`api/course/search`, {
            params: {
                q: q,
            },
        });
        return res;
    } catch (error) {
        console.error(error);
    }
};
