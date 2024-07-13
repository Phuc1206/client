import React, { useState } from 'react';
import * as adminService from '../../services/adminService';

function EditTrackForm({ tracks, onClose }) {
    const [editedTracks, setEditedTracks] = useState(
        tracks.map((track) => ({
            _id: track._id,
            title: track.title,
            duration: track.duration,
            track_steps: track.track_steps.map((step) => ({
                _id: step._id,
                title: step.lesson.question,
                content: step.lesson.explanation,
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
                        duration: editedTrack.duration,
                        track_steps: editedTrack.track_steps.map((step) => ({
                            title: step.title,
                            content: step.content,
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
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor={`stepTitle-${trackIndex}-${stepIndex}`}
                                    >
                                        Step Title
                                    </label>
                                    <input
                                        type="text"
                                        id={`stepTitle-${trackIndex}-${stepIndex}`}
                                        name="title"
                                        value={step.title}
                                        onChange={(e) => handleInputChange(trackIndex, stepIndex, e)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                                        htmlFor={`stepContent-${trackIndex}-${stepIndex}`}
                                    >
                                        Step Content
                                    </label>
                                    <textarea
                                        id={`stepContent-${trackIndex}-${stepIndex}`}
                                        name="content"
                                        value={step.content}
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
