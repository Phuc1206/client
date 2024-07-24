import { useEffect, useState } from 'react';
import * as adminService from '../../services/adminService';

function User() {
    const [users, setUsers] = useState([]);
    const [updatedUsers, setUpdatedUsers] = useState({});
    const [showRemoveCourseModal, setShowRemoveCourseModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await adminService.getAllUser();
            setUsers(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const getRoleLabel = (isAdmin) => {
        return isAdmin ? 'admin' : 'user';
    };

    const handleRoleChange = (event, userId) => {
        const newRole = event.target.value === 'admin';
        setUpdatedUsers((prev) => ({
            ...prev,
            [userId]: {
                ...prev[userId],
                is_admin: newRole,
            },
        }));
    };

    const handleSave = () => {
        const promises = Object.entries(updatedUsers).map(([userId, updatedUser]) =>
            adminService.updateUserRole(userId, updatedUser.is_admin),
        );
        Promise.all(promises)
            .then(() => {
                fetchUsers();
                setUpdatedUsers({});
            })
            .catch((error) => {
                console.error('Error saving users:', error);
            });
    };

    const handleBlock = async (userId) => {
        try {
            const response = await adminService.blockUser(userId);

            if (response.user.modifiedCount === 1) {
                fetchUsers();
            } else {
                console.log('No user was blocked or modified.');
            }
        } catch (error) {
            console.error('Error blocking user:', error);
        }
    };

    const handleRemoveCourse = async (userId, courseId) => {
        setLoading(true);
        try {
            await adminService.removeUserFromCourse(userId, courseId);
            setSelectedUser((prev) => ({
                ...prev,
                course_id: prev.course_id.filter((course) => course._id !== courseId),
            }));
            fetchUsers();
        } catch (error) {
            console.error('Error removing user from course:', error);
        } finally {
            setLoading(false);
        }
    };

    const openRemoveCourseModal = (user) => {
        setSelectedUser(user);
        setShowRemoveCourseModal(true);
    };

    const closeRemoveCourseModal = () => {
        setShowRemoveCourseModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="text-gray-900 bg-gray-200">
            <div className="p-4 flex flex-col">
                <h1 className="text-3xl">Users</h1>
                <a className="mt-2 text-blue-500 hover:underline" href="/userBlocked">
                    Danh sách bị chặn
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
                                    <select
                                        value={getRoleLabel(updatedUsers[user._id]?.is_admin ?? user.is_admin)}
                                        className="bg-transparent"
                                        onChange={(e) => handleRoleChange(e, user._id)}
                                    >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </td>
                                <td className="p-3 px-5">
                                    <button
                                        onClick={() => openRemoveCourseModal(user)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {user.course_id.length}
                                    </button>
                                </td>
                                <td className="p-3 px-5 flex justify-end">
                                    <button
                                        onClick={handleSave}
                                        type="button"
                                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Lưu
                                    </button>
                                    <button
                                        onClick={() => handleBlock(user._id)}
                                        type="button"
                                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Chặn
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showRemoveCourseModal && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-bold mb-4">Courses for {selectedUser.fullname}</h2>
                        {selectedUser.course_id.map((course) => (
                            <div key={course._id} className="flex items-center justify-between mb-2">
                                <span>{course.title}</span>
                                <button
                                    onClick={() => handleRemoveCourse(selectedUser._id, course._id)}
                                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                >
                                    {loading ? 'Removing...' : 'Remove'}
                                </button>
                            </div>
                        ))}
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                onClick={closeRemoveCourseModal}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default User;
