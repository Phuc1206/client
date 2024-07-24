import React, { useEffect, useState } from 'react';
import * as adminService from '../../services/adminService';

function UserBlocked() {
    const [users, setUsers] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false); // State to manage modal visibility
    const [userToDelete, setUserToDelete] = useState(null); // State to store user to be deleted

    const fetchUsersBlocked = async () => {
        try {
            const response = await adminService.getAllUsersBlocked();
            setUsers(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsersBlocked();
    }, []);

    const handleUnBlock = async (userId) => {
        try {
            const response = await adminService.unBlockUser(userId);

            if (response.user.modifiedCount === 1) {
                fetchUsersBlocked();
            } else {
                console.log('No user was blocked or modified.');
            }
        } catch (error) {
            console.error('Error blocking user:', error);
        }
    };

    const handleDestroy = async (userId) => {
        try {
            const response = await adminService.destroyUser(userId);
            if (response.message === 'User deleted successfully') {
                fetchUsersBlocked();
            } else {
                console.log('No user was deleted');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const showDeleteModal = (userId) => {
        setUserToDelete(userId);
        setDeleteModalVisible(true);
    };

    const hideDeleteModal = () => {
        setUserToDelete(null);
        setDeleteModalVisible(false);
    };

    const confirmDelete = async () => {
        if (userToDelete) {
            await handleDestroy(userToDelete);
            hideDeleteModal();
        }
    };

    return (
        <div className="text-gray-900 bg-gray-200">
            <div className="p-4 flex flex-col">
                <h1 className="text-3xl">Users</h1>
                <a className="mt-2 text-blue-500 hover:underline" href="/user">
                    Danh sách người dùng
                </a>
            </div>
            <div className="px-3 py-4 flex justify-center">
                <table className="w-full text-md bg-white shadow-md rounded mb-4">
                    <tbody>
                        <tr className="border-b">
                            <th className="text-left p-3 px-5">Full Name</th>
                            <th className="text-left p-3 px-5">User Name</th>
                            <th className="text-left p-3 px-5">Email</th>
                            <th className="text-left p-3 px-5">Role</th>
                            <th className="text-left p-3 px-5">Course</th>
                            <th></th>
                        </tr>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b hover:bg-orange-100 bg-gray-100">
                                <td className="p-3 px-5">
                                    <input type="text" value={user.fullname} className="bg-transparent" readOnly />
                                </td>
                                <td className="p-3 px-5">
                                    <input type="text" value={user.username} className="bg-transparent" readOnly />
                                </td>
                                <td className="p-3 px-5">
                                    <input type="text" value={user.email} className="bg-transparent" readOnly />
                                </td>
                                <td className="p-3 px-5">
                                    <select defaultValue={user.is_admin ? 'admin' : 'user'} className="bg-transparent">
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </td>
                                <td className="p-3 px-5">
                                    <input type="text" value={user.course_id} className="bg-transparent" readOnly />
                                </td>
                                <td className="p-3 px-5 flex justify-end">
                                    <button
                                        onClick={() => handleUnBlock(user._id)}
                                        type="button"
                                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Bỏ chặn
                                    </button>
                                    <button
                                        onClick={() => showDeleteModal(user._id)}
                                        type="button"
                                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            <div
                className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 ${
                    deleteModalVisible ? '' : 'hidden'
                }`}
            >
                <div className="bg-white p-4 rounded-lg w-full max-w-md">
                    <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                    <p className="mb-4">Are you sure you want to delete this user?</p>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={hideDeleteModal}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserBlocked;
