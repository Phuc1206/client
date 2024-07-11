import * as httpRequest from '../utils/httpRequest';
export const getAllUser = async () => {
    try {
        const res = await httpRequest.get(`admin/user`);
        return res;
    } catch (error) {
        console.error(error);
    }
};
export const updateUserRole = async (userId, isAdmin) => {
    try {
        const data = {
            isAdmin: isAdmin,
        };
        const res = await httpRequest.put(`admin/user/${userId}`, data);

        return res;
    } catch (error) {
        console.error(error);
    }
};
