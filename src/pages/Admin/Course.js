import React, { useEffect, useState } from 'react';
import * as adminService from '../../services/adminService';
import CreateTrackForm from './CreateTrackForm';
import EditTrackForm from './EditTrackForm';
import RemoveTrackModal from './RemoveTrackModal';
function Course() {
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [singleCourseToDelete, setSingleCourseToDelete] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [newCourse, setNewCourse] = useState({
        title: '',
        description: '',
        image: '',
        level: '',
        duration: '',
    });
    const [editCourseId, setEditCourseId] = useState(null);
    const [showEditTrackModal, setShowEditTrackModal] = useState(false);
    const [showCreateTrackModal, setShowCreateTrackModal] = useState(false);
    const [showRemoveTrackModal, setShowRemoveTrackModal] = useState(false);
    const [selectedCourseTracks, setSelectedCourseTracks] = useState([]);

    const fetchCourses = async () => {
        try {
            const response = await adminService.getAllCourses();
            setCourses(response);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [showCreateTrackModal, showRemoveTrackModal, showEditTrackModal]);

    const handleCheckboxChange = (courseId) => {
        setSelectedCourses((prevSelectedCourses) =>
            prevSelectedCourses.includes(courseId)
                ? prevSelectedCourses.filter((id) => id !== courseId)
                : [...prevSelectedCourses, courseId],
        );
    };

    const handleRemove = async (courseId) => {
        try {
            await adminService.removeCourse(courseId);
            fetchCourses();
        } catch (e) {
            console.error('Error removing course:', e);
        }
    };

    const handleRemoveMultiple = async () => {
        try {
            await Promise.all(selectedCourses.map((courseId) => adminService.removeCourse(courseId)));
            fetchCourses();
            setSelectedCourses([]);
        } catch (e) {
            console.error('Error removing courses:', e);
        }
    };

    const confirmRemoveMultiple = () => {
        setShowDeleteConfirm(true);
        setSingleCourseToDelete(null);
    };

    const confirmRemoveSingle = (courseId) => {
        setShowDeleteConfirm(true);
        setSingleCourseToDelete(courseId);
    };

    const handleConfirmDelete = () => {
        if (singleCourseToDelete) {
            handleRemove(singleCourseToDelete);
        } else {
            handleRemoveMultiple();
        }
        setShowDeleteConfirm(false);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
    };
    const handleCreateCourse = async () => {
        try {
            if (isEditMode) {
                await adminService.updateCourse(editCourseId, newCourse);
            } else {
                await adminService.createCourse(newCourse);
            }
            fetchCourses();
            setShowCreateModal(false);
            setNewCourse({
                title: '',
                description: '',
                image: '',
                level: '',
                duration: '',
            });
            setIsEditMode(false);
            setEditCourseId(null);
        } catch (error) {
            console.error('Error creating/updating course:', error);
        }
    };
    const handleEditCourse = (course) => {
        setNewCourse({
            title: course.title,
            description: course.description,
            image: course.image,
            level: course.level,
            duration: course.duration,
        });
        setEditCourseId(course._id);
        setIsEditMode(true);
        setShowCreateModal(true);
    };
    const handleEditTrack = (courseTracks) => {
        setSelectedCourseTracks(courseTracks);
        setShowEditTrackModal(true);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="p-4 flex justify-between ">
                <h1 className="text-2xl font-bold ">Courses</h1>

                <div className="flex space-x-2">
                    <button
                        className="text-sm bg-red-500  hover:bg-red-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => setShowRemoveTrackModal(true)}
                    >
                        Remove Track
                    </button>
                    <button
                        className="text-sm bg-orange-500  hover:bg-orange-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => setShowCreateTrackModal(true)}
                    >
                        Create Track
                    </button>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        type="button"
                        className="text-sm bg-green-500 hover:bg-green-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                        Create
                    </button>
                    <button
                        type="button"
                        onClick={confirmRemoveMultiple}
                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                        Remove
                    </button>
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center"></div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title Course
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Image URL
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Level
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Students
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Duration
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tracks
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course._id} className="bg-white border-b hover:bg-gray-50">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id={`checkbox-table-search-${course._id}`}
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                        checked={selectedCourses.includes(course._id)}
                                        onChange={() => handleCheckboxChange(course._id)}
                                    />
                                    <label htmlFor={`checkbox-table-search-${course._id}`} className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {course.title}
                            </th>
                            <td className="text-left px-6 py-4 truncate max-w-xs" title={course.description}>
                                {course.description}
                            </td>
                            <td className="px-6 py-4">{course.image}</td>
                            <td className="px-6 py-4">{course.level}</td>
                            <td className="px-6 py-4">{course.students_count.length}</td>
                            <td className="px-6 py-4">{course.duration}</td>
                            <td className="px-6 py-4">{course.tracks.length}</td>
                            <td className="flex items-center px-6 py-4 whitespace-nowrap">
                                <a
                                    onClick={() => handleEditTrack(course.tracks)}
                                    className="font-medium text-blue-600 hover:underline cursor-pointer mr-2"
                                >
                                    Edit Track
                                </a>
                                <a
                                    onClick={() => {
                                        handleEditCourse(course);
                                    }}
                                    className="font-medium text-blue-600 hover:underline cursor-pointer"
                                >
                                    Edit
                                </a>
                                <a
                                    onClick={() => confirmRemoveSingle(course._id)}
                                    className="font-medium text-red-600 hover:underline ms-3 cursor-pointer"
                                >
                                    Remove
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showDeleteConfirm && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-xl mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete the selected courses?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleConfirmDelete}
                                className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={handleCancelDelete}
                                className="text-sm bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline ml-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showCreateModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg w-3/5 shadow-lg">
                        <h2 className="text-2xl mb-4">{isEditMode ? 'Edit Course' : 'Create New Course'}</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleCreateCourse();
                            }}
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={newCourse.title}
                                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    value={newCourse.description}
                                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    id="image"
                                    value={newCourse.image}
                                    onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
                                    Level
                                </label>
                                <input
                                    type="text"
                                    id="level"
                                    value={newCourse.level}
                                    onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
                                    Duration
                                </label>
                                <input
                                    type="text"
                                    id="duration"
                                    value={newCourse.duration}
                                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="submit"
                                    className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                >
                                    {isEditMode ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="text-sm bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline ml-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showCreateTrackModal && <CreateTrackForm onClose={() => setShowCreateTrackModal(false)} />}
            {showEditTrackModal && (
                <EditTrackForm tracks={selectedCourseTracks} onClose={() => setShowEditTrackModal(false)} />
            )}
            {showRemoveTrackModal && (
                <RemoveTrackModal courses={courses} onClose={() => setShowRemoveTrackModal(false)} />
            )}
        </div>
    );
}

export default Course;
