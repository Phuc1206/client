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
export const getProfile = async (userId) => {
    try {
        const res = await httpRequest.get(`api/profile/${userId}`);
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const uploadAvatar = async (userId, formData) => {
    try {
        const res = await httpRequest.post(`api/upload-avatar/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const showCourse = async (slug) => {
    try {
        const res = await httpRequest.get(`api/course/${slug}`);
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const enrollCourse = async (courseId, userId) => {
    try {
        const res = await httpRequest.post(`api/course/enroll/${courseId}`, { userId });
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const getProgress = async (userId, courseId) => {
    try {
        const res = await httpRequest.get(`api/get-progress/${userId}/${courseId}`);
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const getProgressUser = async (userId) => {
    try {
        const res = await httpRequest.get(`api/get-progress-user/${userId}`);
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const saveProgress = async (userId, courseId, trackId, trackStepId, progress) => {
    try {
        const res = await httpRequest.post(`api/save-progress`, { userId, courseId, trackId, trackStepId, progress });
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
