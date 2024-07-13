import React, { useState, useEffect, useRef } from 'react';
import * as adminService from '../../services/adminService';

function CreateTrackForm({ onClose }) {
    const [courses, setCourses] = useState([]);
    const [newTrack, setNewTrack] = useState({
        course_id: '',
        title: '',
        position: '',
        duration: '',
        track_steps: [],
    });
    const fetchCourses = async () => {
        try {
            const coursesData = await adminService.getAllCourses();
            setCourses(coursesData);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, []);
    const [trackSteps, setTrackSteps] = useState([{ position: '', lesson: {}, video: {} }]);
    const lastTrackStepRef = useRef(null);

    const handleTrackStepChange = (index, field, value) => {
        const newTrackSteps = [...trackSteps];
        newTrackSteps[index] = { ...newTrackSteps[index], [field]: value };
        setTrackSteps(newTrackSteps);
    };

    const addTrackStep = () => {
        setTrackSteps([...trackSteps, { position: '', lesson: {}, video: {} }]);
    };
    const removeTrackStep = (index) => {
        const newTrackSteps = [...trackSteps];
        newTrackSteps.splice(index, 1);
        setTrackSteps(newTrackSteps);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trackData = { ...newTrack, track_steps: trackSteps };
        try {
            await adminService.createTrack(trackData);
            onClose();
        } catch (error) {
            console.error('Error creating track:', error);
        }
    };
    const scrollToBottom = () => {
        lastTrackStepRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };
    useEffect(() => {
        scrollToBottom();
    }, [trackSteps.length]);
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
            <div className="bg-white p-8 rounded-lg w-3/5 max-h-full shadow-lg overflow-y-auto">
                <h2 className="text-2xl mb-4">Create New Track</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="course">Select a Course:</label>
                    <select
                        id="course"
                        value={newTrack.course_id}
                        onChange={(e) => setNewTrack({ ...newTrack, course_id: e.target.value })}
                        className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select a course</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={newTrack.title}
                            onChange={(e) => setNewTrack({ ...newTrack, title: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                            Position
                        </label>
                        <input
                            type="number"
                            id="position"
                            value={newTrack.position}
                            onChange={(e) => setNewTrack({ ...newTrack, position: e.target.value })}
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
                            value={newTrack.duration}
                            onChange={(e) => setNewTrack({ ...newTrack, duration: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {trackSteps.map((step, index) => (
                        <div
                            key={index}
                            className="mb-4"
                            ref={index === trackSteps.length - 1 ? lastTrackStepRef : null}
                        >
                            <h3 className="text-lg font-bold">Track Step {index + 1}</h3>
                            <div className="mb-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor={`position-${index}`}
                                >
                                    Position
                                </label>
                                <input
                                    type="number"
                                    id={`position-${index}`}
                                    value={step.position}
                                    onChange={(e) => handleTrackStepChange(index, 'position', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor={`question-${index}`}
                                >
                                    Question
                                </label>
                                <input
                                    type="text"
                                    id={`question-${index}`}
                                    value={step.lesson.question || ''}
                                    onChange={(e) =>
                                        handleTrackStepChange(index, 'lesson', {
                                            ...step.lesson,
                                            question: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor={`answer-${index}`}
                                >
                                    Answer
                                </label>
                                <input
                                    type="text"
                                    id={`answer-${index}`}
                                    value={step.lesson.answer || ''}
                                    onChange={(e) =>
                                        handleTrackStepChange(index, 'lesson', {
                                            ...step.lesson,
                                            answer: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor={`option_a-${index}`}
                                >
                                    Option A
                                </label>
                                <input
                                    type="text"
                                    id={`option_a-${index}`}
                                    value={step.lesson.option_a || ''}
                                    onChange={(e) =>
                                        handleTrackStepChange(index, 'lesson', {
                                            ...step.lesson,
                                            option_a: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor={`option_b-${index}`}
                                >
                                    Option B
                                </label>
                                <input
                                    type="text"
                                    id={`option_b-${index}`}
                                    value={step.lesson.option_b || ''}
                                    onChange={(e) =>
                                        handleTrackStepChange(index, 'lesson', {
                                            ...step.lesson,
                                            option_b: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor={`option_c-${index}`}
                                >
                                    Option C
                                </label>
                                <input
                                    type="text"
                                    id={`option_c-${index}`}
                                    value={step.lesson.option_c || ''}
                                    onChange={(e) =>
                                        handleTrackStepChange(index, 'lesson', {
                                            ...step.lesson,
                                            option_c: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor={`option_d-${index}`}
                                >
                                    Option D
                                </label>
                                <input
                                    type="text"
                                    id={`option_d-${index}`}
                                    value={step.lesson.option_d || ''}
                                    onChange={(e) =>
                                        handleTrackStepChange(index, 'lesson', {
                                            ...step.lesson,
                                            option_d: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor={`explanation-${index}`}
                                >
                                    Explanation
                                </label>
                                <textarea
                                    id={`explanation-${index}`}
                                    value={step.lesson.explanation || ''}
                                    onChange={(e) =>
                                        handleTrackStepChange(index, 'lesson', {
                                            ...step.lesson,
                                            explanation: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor={`video-url-${index}`}
                                >
                                    Video URL
                                </label>
                                <input
                                    type="text"
                                    id={`video-url-${index}`}
                                    value={step.video.url || ''}
                                    onChange={(e) =>
                                        handleTrackStepChange(index, 'video', { ...step.video, url: e.target.value })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor={`video-title-${index}`}
                                >
                                    Video Title
                                </label>
                                <input
                                    type="text"
                                    id={`video-title-${index}`}
                                    value={step.video.title || ''}
                                    onChange={(e) =>
                                        handleTrackStepChange(index, 'video', { ...step.video, title: e.target.value })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            {/* Add more fields for video attributes */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => removeTrackStep(index)}
                                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Remove Track Step
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addTrackStep}
                        className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Track Step
                    </button>
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                            Create
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-sm bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline ml-2"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTrackForm;
