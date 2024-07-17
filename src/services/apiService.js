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
