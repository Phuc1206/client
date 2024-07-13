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
            is_admin: isAdmin,
        };
        const res = await httpRequest.put(`admin/user/${userId}`, data);

        return res;
    } catch (error) {
        console.error(error);
    }
};
export const blockUser = async (userId) => {
    try {
        const res = await httpRequest.deleted(`admin/user/block/${userId}`);
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const unBlockUser = async (userId) => {
    try {
        const res = await httpRequest.patch(`admin/user/unblock/${userId}`);
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const getAllUsersBlocked = async () => {
    try {
        const res = await httpRequest.get(`admin/user/blocked`);
        return res;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const destroyUser = async (userId) => {
    try {
        const res = await httpRequest.deleted(`admin/user/destroy/${userId}`);
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const getAllCourses = async () => {
    try {
        const res = await httpRequest.get('admin/course');
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const removeCourse = async (courseId) => {
    try {
        const res = await httpRequest.deleted(`admin/course/remove/${courseId}`);
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const createCourse = async (newCourse) => {
    try {
        const res = await httpRequest.post('admin/course/create', newCourse);
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const updateCourse = async (courseId, newCourse) => {
    try {
        const res = await httpRequest.put(`admin/course/update/${courseId}`, newCourse);
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const createTrack = async (trackData) => {
    try {
        const res = await httpRequest.post('admin/course/track/create', trackData);
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const updateTrack = async (trackData) => {};
