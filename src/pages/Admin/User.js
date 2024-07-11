import { useEffect, useState } from 'react';
import * as adminService from '../../services/adminService';
function User() {
    const [users, setUsers] = useState([]);
    const [editedUsers, setEditedUsers] = useState([]);
    useEffect(() => {
        adminService.getAllUser().then((response) => {
            setUsers(response);
            setEditedUsers(response);
        });
    }, []);
    const handleRoleChange = (event, userId) => {
        const { value } = event.target;
        const isAdmin = value === 'admin';

        // Update editedUsers locally
        const updatedUsers = editedUsers.map((user) => (user._id === userId ? { ...user, is_admin: isAdmin } : user));

        setEditedUsers(updatedUsers); // Update local state
    };
    const handleSave = () => {
        // Iterate through editedUsers and update backend
        editedUsers.forEach((user) => {
            // Call API to update user role on the server
            adminService
                .updateUserRole(user._id, user.is_admin)
                .then((response) => {
                    console.log(response);
                    console.log(`User role updated successfully for user ID: ${user._id}`);
                    // Optionally handle success response from API
                })
                .catch((error) => {
                    console.error(`Error updating user role for user ID: ${user._id}`, error);
                    // Optionally handle error response from API
                });
        });
    };
    return (
        <div className="text-gray-900 bg-gray-200">
            <div className="p-4 flex">
                <h1 className="text-3xl">Users</h1>
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
                                        value={user.is_admin ? 'admin' : 'user'}
                                        className="bg-transparent"
                                        onChange={(e) => handleRoleChange(e, user._id)}
                                    >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </td>
                                <td className="p-3 px-5">
                                    <input type="text" value={user.course_id} className="bg-transparent" readOnly />
                                </td>
                                <td className="p-3 px-5 flex justify-end">
                                    <button
                                        onClick={handleSave}
                                        type="button"
                                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default User;
