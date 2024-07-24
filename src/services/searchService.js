import * as httpRequest from '../utils/httpRequest';
import { toast } from 'react-toastify';
export const search = async (q) => {
    try {
        const res = await httpRequest.get(`api/course/search`, {
            params: {
                q: q,
            },
        });
        return res;
    } catch (error) {
        toast.error(`Error: ${error.response.data.error}`);
    }
};
