import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import * as apiService from '../../services/apiService';
import Image from '../../components/image';

function Profile() {
    const { authState } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [avatarFile, setAvatarFile] = useState(null);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiService.getProfile(authState.id);
                setUser(response);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, [authState]);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatarFile(file);
        }
    };

    const handleUploadAvatar = async () => {
        if (avatarFile) {
            try {
                const formData = new FormData();
                formData.append('avatar', avatarFile);

                await apiService.uploadAvatar(authState.id, formData);
            } catch (err) {
                console.error('Error uploading avatar:', err);
            }
        } else {
            console.error('Please select an image to upload.');
        }
    };

    return (
        <section className="py-10 my-auto">
            <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
                <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center">
                    <div>
                        <div className="w-full rounded-sm bg-[url('https://fullstack.edu.vn/assets/cover-profile-CDYcrPwJ.png')] bg-cover bg-center bg-no-repeat h-48 flex justify-center items-center">
                            {avatarFile ? (
                                <div className="mt-48 flex justify-center w-[141px] h-[141px] bg-blue-300 rounded-full overflow-hidden">
                                    <img
                                        src={URL.createObjectURL(avatarFile)}
                                        alt="Uploaded Avatar"
                                        className="w-[141px] h-[141px] object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="mt-48 flex justify-center w-[141px] h-[141px] bg-blue-300 rounded-full">
                                    <img
                                        className={'rounded-full'}
                                        src={`http://localhost:3001/img/${user.avatar}`}
                                        alt="User Avatar"
                                    />
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            style={{ display: 'none' }}
                            id="upload-avatar"
                        />
                        <label htmlFor="upload-avatar" className="block text-center mt-14 text-blue-500 cursor-pointer">
                            Choose Avatar
                        </label>
                        <button
                            className="block mx-auto mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                            onClick={handleUploadAvatar}
                        >
                            Upload Avatar
                        </button>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">{user.fullname}</h2>
                            <span className="text-sm">Email: {user.email}</span>
                        </div>
                        {user.course_id && user.course_id.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold">Khóa học đã tham gia:</h3>
                                <div className="flex flex-wrap gap-4">
                                    {user.course_id.map((course) => (
                                        <div
                                            key={course._id}
                                            className="bg-white rounded-lg p-4 shadow w-full md:w-1/2 lg:w-1/3"
                                        >
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="w-full h-40 object-cover rounded-lg mb-2"
                                            />
                                            <div className="mt-2">
                                                <h4 className="text-lg font-semibold">{course.title}</h4>
                                                <p className="text-sm">{course.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;
