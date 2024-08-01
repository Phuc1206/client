import * as httpRequest from '../utils/httpRequest';
import { toast } from 'react-toastify';
export const getAllUser = async () => {
    try {
        const res = await httpRequest.get(`admin/user`);
        return res;
    } catch (error) {
        toast.error(`Error: ${error.response.data.error}`);
        throw error;
    }
};
export const updateUserRole = async (userId, isAdmin) => {
    try {
        const data = {
            is_admin: isAdmin,
        };
        const res = await httpRequest.put(`admin/user/${userId}`, data);
        toast.success(`${res.message}`);
        return res;
    } catch (error) {
        toast.error(`Error: ${error.response.data.error}`);
        throw error;
    }
};
export const removeUserFromCourse = async (userId, courseId) => {
    try {
        const res = await httpRequest.deleted(`admin/user/remove/${userId}/${courseId}`);
        toast.success(`${res.message}`);
        return res;
    } catch (error) {
        toast.error(`Error: ${error.response.data.error}`);
        throw error;
    }
};
export const blockUser = async (userId) => {
    try {
        const res = await httpRequest.deleted(`admin/user/block/${userId}`);
        toast.success(`${res.message}`);
        return res;
    } catch (error) {
        toast.error(`Error: ${error.response.data.error}`);
        throw error;
    }
};
export const unBlockUser = async (userId) => {
    try {
        const res = await httpRequest.patch(`admin/user/unblock/${userId}`);
        toast.success(`${res.message}`);
        return res;
    } catch (error) {
        toast.error(`Error: ${error.response.data.error}`);
        throw error;
    }
};
export const getAllUsersBlocked = async () => {
    try {
        const res = await httpRequest.get(`admin/user/blocked`);
        return res;
    } catch (error) {
        toast.error(`Error: ${error.response.data.error}`);
        throw error;
    }
};
export const destroyUser = async (userId) => {
    try {
        const res = await httpRequest.deleted(`admin/user/destroy/${userId}`);
        toast.success(`${res.message}`);
        return res;
    } catch (error) {
        toast.error(`Error: ${error.response.data.error}`);
        throw error;
    }
};
export const getAllCourses = async () => {
    try {
        const res = await httpRequest.get('admin/course');
        return res;
    } catch (error) {
        toast.error(`Error: ${error.response.data.error}`);
        throw error;
    }
};
export const removeCourse = async (courseId) => {
    try {
        const res = await httpRequest.deleted(`admin/course/remove/${courseId}`);
        return res;
    } catch (error) {
        toast.error(`Error: ${error.response.data.error}`);
        throw error;
    }
};
export const createCourse = async (newCourse) => {
    try {
        const res = await httpRequest.post('admin/course/create', newCourse);
        return res;
    } catch (error) {
        toast.error(`Error: ${error.response.data.error}`);
        throw error;
    }
};
export const updateCourse = async (courseId, newCourse) => {
    try {
        const res = await httpRequest.put(`admin/course/update/${courseId}`, newCourse);
        return res;
    } catch (error) {
        toast.error(`Error: ${error.response.data.error}`);
        throw error;
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
export const updateTrack = async (trackId, trackData) => {
    try {
        const res = await httpRequest.put(`admin/course/track/update/${trackId}`, trackData);
        return res;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const removeStep = async (stepId) => {
    try {
        const res = await httpRequest.deleted(`admin/course/track/step/delete/${stepId}`);
        toast.success(`${res.message}`);
        return res;
    } catch (error) {
        toast.error(`Error: ${error.response.data.error}`);
        throw error;
    }
};
export const removeTrack = async (trackId) => {
    try {
        const res = await httpRequest.deleted(`admin/course/track/delete/${trackId}`);
        toast.success(`${res.message}`);
        return res;
    } catch (error) {
        toast.error(`Error: ${error.response.data.error}`);
        throw error;
    }
};
export const saveModel = async (formData) => {
    try {
        const res = await httpRequest.post('admin/model/save', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    } catch (error) {
        toast.error(`Error: ${error.response.data.error}`);
        throw error;
    }
};
