import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import * as adminService from '../../services/adminService';
function RemoveTrackModal({ onClose, initialCourses }) {
    const [openCourse, setOpenCourse] = useState([]);
    const [courses, setCourses] = useState(initialCourses);
    // Toggle the visibility of the tracks within a course
    const toggleCourse = (courseId) => {
        if (openCourse.includes(courseId)) {
            setOpenCourse(openCourse.filter((id) => id !== courseId));
        } else {
            setOpenCourse([...openCourse, courseId]);
        }
    };
    const onRemoveTrack = async (trackId) => {
        try {
            const response = await adminService.removeTrack(trackId);
            if (response.message === 'Track deleted successfully') {
                setCourses(
                    courses.map((course) => ({
                        ...course,
                        tracks: course.tracks.filter((track) => track._id !== trackId),
                    })),
                );
            }
        } catch (err) {
            console.error(err);
        }
    };
    const onRemoveStep = async (stepId) => {
        try {
            const response = await adminService.removeStep(stepId);
            if (response.message === 'Step deleted successfully') {
                setCourses(
                    courses.map((course) => ({
                        ...course,
                        tracks: course.tracks.map((track) => ({
                            ...track,
                            track_steps: track.track_steps.filter((step) => step._id !== stepId),
                        })),
                    })),
                );
            }
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="fixed inset-0 flex max-h-full items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
            <div className="bg-white p-8 rounded-lg w-3/5 shadow-lg max-h-full overflow-y-auto">
                <h2 className="text-2xl mb-4">Remove Track</h2>
                <ul className="divide-y divide-black max-w-full mt-4">
                    {courses.map((course) => (
                        <li key={course._id} className="py-4">
                            <div
                                className="flex items-center justify-between space-x-4 cursor-pointer bg-gray-300 p-2 rounded-md"
                                onClick={() => toggleCourse(course._id)}
                            >
                                <span className="text-lg font-bold">{course.title}</span>
                                <span
                                    className="text-lg transform transition-transform duration-200"
                                    style={{
                                        transform: openCourse.includes(course._id) ? 'rotate(180deg)' : 'rotate(0)',
                                    }}
                                >
                                    ▼
                                </span>
                            </div>
                            {openCourse.includes(course._id) && (
                                <ul className="divide-y divide-gray-300 bg-gray-200 rounded-md px-4 py-2 mt-4">
                                    {course.tracks.map((track) => (
                                        <li key={track._id} className="py-2">
                                            <div className="flex items-center space-x-4 justify-between">
                                                <span className="text-md font-medium">{track.title}</span>
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className="text-red-500 text-sm cursor-pointer pr-4"
                                                    onClick={() => onRemoveTrack(track._id)}
                                                />
                                            </div>
                                            <ul className="divide-y divide-gray-500 bg-gray-100 rounded-md px-4 py-2 mt-2">
                                                {track.track_steps.map((step) => (
                                                    <li key={step._id} className="py-2">
                                                        <div className="flex items-center justify-between space-x-4">
                                                            <span className="text-sm font-medium">
                                                                {step.video.title}
                                                            </span>
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                                className="text-red-500 text-sm cursor-pointer "
                                                                onClick={() => onRemoveStep(step._id)}
                                                            />
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="text-sm bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RemoveTrackModal;
