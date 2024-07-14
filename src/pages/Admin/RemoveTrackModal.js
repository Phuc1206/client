function RemoveTrackModal({ onClose, courses }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
            <div className="bg-white p-8 rounded-lg w-3/5 shadow-lg max-h-full overflow-y-auto">
                <h2 className="text-2xl mb-4">Remove Track</h2>
                <ul className="divide-y divide-gray-300 max-w-full mt-4 border">
                    {courses.map((course) => (
                        <li key={course._id} className="py-4">
                            <div className="flex items-center space-x-4">
                                <span className="text-lg font-bold">{course.title}</span>
                            </div>

                            <ul className="divide-y divide-gray-300 bg-gray-50 rounded-md px-4 py-2 mt-4">
                                {course.tracks.map((track) => (
                                    <li key={track._id} className="py-2">
                                        <div className="flex items-center space-x-4">
                                            <span className="text-md font-medium">{track.title}</span>
                                        </div>

                                        <ul className="divide-y divide-gray-300 bg-gray-100 rounded-md px-4 py-2 mt-2">
                                            {track.track_steps.map((step) => (
                                                <li key={step._id} className="py-2">
                                                    <div className="flex items-center space-x-4">
                                                        <span className="text-sm font-medium">{step.video.title}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
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
