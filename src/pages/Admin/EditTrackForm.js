import React, { useState } from 'react';
import * as adminService from '../../services/adminService';

function EditTrackForm({ tracks, onClose }) {
    const [editedTracks, setEditedTracks] = useState(
        tracks.map((track) => ({
            _id: track._id,
            course_id: track.course_id,
            title: track.title,
            position: track.position,
            duration: track.duration,
            track_steps: track.track_steps.map((step) => ({
                _id: step._id,
                position: step.position,
                question: step.lesson?.question || '',
                answer: step.lesson?.answer || '',
                option_a: step.lesson?.option_a || '',
                option_b: step.lesson?.option_b || '',
                option_c: step.lesson?.option_c || '',
                option_d: step.lesson?.option_d || '',
                explanation: step.lesson?.explanation || '',
                videoTitle: step.video.title,
                videoUrl: step.video.url,
            })),
        })),
    );

    const handleInputChange = (trackIndex, stepIndex, event) => {
        const { name, value } = event.target;
        const newTracks = [...editedTracks];
        newTracks[trackIndex].track_steps[stepIndex] = {
            ...newTracks[trackIndex].track_steps[stepIndex],
            [name]: value,
        };
        setEditedTracks(newTracks);
    };

    const handleUpdateTrack = async () => {
        try {
            await Promise.all(
                editedTracks.map(async (editedTrack) => {
                    await adminService.updateTrack(editedTrack._id, {
                        title: editedTrack.title,
                        position: editedTrack.position,
                        duration: editedTrack.duration,
                        track_steps: editedTrack.track_steps.map((step) => ({
                            _id: step._id,
                            lesson: {
                                question: step.question,
                                answer: step.answer,
                                option_a: step.option_a,
                                option_b: step.option_b,
                                option_c: step.option_c,
                                option_d: step.option_d,
                                explanation: step.explanation,
                            },
                            video: { title: step.videoTitle, url: step.videoUrl },
                        })),
                    });
                }),
            );
            onClose();
        } catch (error) {
            console.error('Error updating tracks:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
            <div className="bg-white p-8 rounded-lg w-3/5 max-h-full overflow-y-auto shadow-lg">
                <h2 className="text-2xl mb-4">Edit Tracks</h2>
                {editedTracks.map((track, trackIndex) => (
                    <div key={track._id} className="mb-8">
                        <h3 className="text-lg font-bold mb-2">Track Title: {track.title}</h3>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor={`trackTitle-${trackIndex}`}
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id={`trackTitle-${trackIndex}`}
                                name="title"
                                value={track.title}
                                onChange={(e) => {
                                    const newTracks = [...editedTracks];
                                    newTracks[trackIndex].title = e.target.value;
                                    setEditedTracks(newTracks);
                                }}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor={`trackTitle-${trackIndex}`}
                            >
                                Position
                            </label>
                            <input
                                type="text"
                                id={`trackTitle-${trackIndex}`}
                                name="title"
                                value={track.position}
                                onChange={(e) => {
                                    const newTracks = [...editedTracks];
                                    newTracks[trackIndex].position = e.target.value;
                                    setEditedTracks(newTracks);
                                }}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor={`trackDuration-${trackIndex}`}
                            >
                                Duration
                            </label>
                            <input
                                type="text"
                                id={`trackDuration-${trackIndex}`}
                                name="duration"
                                value={track.duration}
                                onChange={(e) => {
                                    const newTracks = [...editedTracks];
                                    newTracks[trackIndex].duration = e.target.value;
                                    setEditedTracks(newTracks);
                                }}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-2">Steps:</h4>
                            {track.track_steps.map((step, stepIndex) => (
                                <div key={step._id} className="mb-4">
                                    <h5 className="text-lg font-bold mb-2">Step {stepIndex + 1}</h5>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2 ml-4 mr-2"
                                        htmlFor={`stepPosition-${trackIndex}-${stepIndex}`}
                                    >
                                        Position
                                    </label>
                                    <input
                                        type="text"
                                        id={`stepPosition-${trackIndex}-${stepIndex}`}
                                        name="position"
                                        value={step.position}
                                        onChange={(e) => handleInputChange(trackIndex, stepIndex, e)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor={`stepQuestion-${trackIndex}-${stepIndex}`}
                                    >
                                        Question
                                    </label>
                                    <input
                                        type="text"
                                        id={`stepQuestion-${trackIndex}-${stepIndex}`}
                                        name="question"
                                        value={step.question}
                                        onChange={(e) => handleInputChange(trackIndex, stepIndex, e)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                                        htmlFor={`stepAnswer-${trackIndex}-${stepIndex}`}
                                    >
                                        Answer
                                    </label>
                                    <input
                                        type="text"
                                        id={`stepAnswer-${trackIndex}-${stepIndex}`}
                                        name="answer"
                                        value={step.answer}
                                        onChange={(e) => handleInputChange(trackIndex, stepIndex, e)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                                        htmlFor={`stepOptionA-${trackIndex}-${stepIndex}`}
                                    >
                                        Option A
                                    </label>
                                    <input
                                        type="text"
                                        id={`stepOptionA-${trackIndex}-${stepIndex}`}
                                        name="option_a"
                                        value={step.option_a}
                                        onChange={(e) => handleInputChange(trackIndex, stepIndex, e)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                                        htmlFor={`stepOptionB-${trackIndex}-${stepIndex}`}
                                    >
                                        Option B
                                    </label>
                                    <input
                                        type="text"
                                        id={`stepOptionB-${trackIndex}-${stepIndex}`}
                                        name="option_b"
                                        value={step.option_b}
                                        onChange={(e) => handleInputChange(trackIndex, stepIndex, e)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                                        htmlFor={`stepOptionC-${trackIndex}-${stepIndex}`}
                                    >
                                        Option C
                                    </label>
                                    <input
                                        type="text"
                                        id={`stepOptionC-${trackIndex}-${stepIndex}`}
                                        name="option_c"
                                        value={step.option_c}
                                        onChange={(e) => handleInputChange(trackIndex, stepIndex, e)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                                        htmlFor={`stepOptionD-${trackIndex}-${stepIndex}`}
                                    >
                                        Option D
                                    </label>
                                    <input
                                        type="text"
                                        id={`stepOptionD-${trackIndex}-${stepIndex}`}
                                        name="option_d"
                                        value={step.option_d}
                                        onChange={(e) => handleInputChange(trackIndex, stepIndex, e)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                                        htmlFor={`stepExplanation-${trackIndex}-${stepIndex}`}
                                    >
                                        Explanation
                                    </label>
                                    <textarea
                                        id={`stepExplanation-${trackIndex}-${stepIndex}`}
                                        name="explanation"
                                        value={step.explanation}
                                        onChange={(e) => handleInputChange(trackIndex, stepIndex, e)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                                        htmlFor={`stepVideoTitle-${trackIndex}-${stepIndex}`}
                                    >
                                        Video Title
                                    </label>
                                    <input
                                        type="text"
                                        id={`stepVideoTitle-${trackIndex}-${stepIndex}`}
                                        name="videoTitle"
                                        value={step.videoTitle}
                                        onChange={(e) => handleInputChange(trackIndex, stepIndex, e)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                                        htmlFor={`stepVideoUrl-${trackIndex}-${stepIndex}`}
                                    >
                                        Video URL
                                    </label>
                                    <input
                                        type="text"
                                        id={`stepVideoUrl-${trackIndex}-${stepIndex}`}
                                        name="videoUrl"
                                        value={step.videoUrl}
                                        onChange={(e) => handleInputChange(trackIndex, stepIndex, e)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={handleUpdateTrack}
                        className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-sm bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline ml-2"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditTrackForm;
