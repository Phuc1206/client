import React, { useState, useEffect, useContext } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useParams } from 'react-router-dom';
import * as apiService from '../../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../helpers/AuthContext';
function Learn() {
    const { slug } = useParams();
    const { authState } = useContext(AuthContext);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [expandedTracks, setExpandedTracks] = useState({});

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await apiService.showCourse(slug);
                setCourse(response);
                const progressResponse = await apiService.getProgress(authState.id, response._id);

                if (progressResponse) {
                    const { track, trackStep } = progressResponse;
                    console.log(progressResponse);
                    setCurrentVideo(trackStep.video);
                    setExpandedTracks({ [track._id]: true });
                } else if (progressResponse.message === 'Progress not found') {
                    setCurrentVideo(response.tracks[0].track_steps[0].video);
                }
            } catch (error) {
                console.error('Error fetching course:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [slug, authState.id]);

    const toggleTrack = (trackIndex) => {
        setExpandedTracks((prev) => ({
            ...prev,
            [trackIndex]: !prev[trackIndex],
        }));
    };
    const handleVideoChange = (track, step) => {
        setCurrentVideo(step.video);
        apiService.saveProgress(authState.id, course._id, track._id, step._id, 0);
    };

    const handleProgress = (state) => {
        if (course && currentVideo) {
            const currentTrack = course.tracks.find((track) =>
                track.track_steps.some((step) => step.video.url === currentVideo.url),
            );
            const currentStep = currentTrack.track_steps.find((step) => step.video.url === currentVideo.url);
            if (state.playedSeconds === currentVideo.duration) {
                const nextStepIndex = currentTrack.track_steps.findIndex((step) => step === currentStep) + 1;

                if (nextStepIndex < currentTrack.track_steps.length) {
                    const nextStep = currentTrack.track_steps[nextStepIndex];
                    handleVideoChange(nextStep);
                }
            }
            apiService.saveProgress(authState.id, course._id, currentTrack._id, currentStep._id, state.playedSeconds);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div className="flex h-full">
            <div className="w-3/4">
                <div className="w-full relative h-dvh">
                    {currentVideo && (
                        <ReactPlayer
                            url={currentVideo.url}
                            className="rounded-lg"
                            controls
                            onProgress={handleProgress}
                            width="100%"
                            height="72%"
                            config={{
                                youtube: {
                                    playerVars: { showinfo: 1 },
                                },
                            }}
                        />
                    )}
                </div>
                <div className="ml-32 -mt-44">
                    <h1 className="text-4xl font-bold">
                        {currentVideo ? currentVideo.title : 'Select a lesson to start learning'}
                    </h1>
                </div>
            </div>
            <div className="w-1/4 p-4 overflow-y-auto max-h-screen ">
                {course.tracks.map((track, trackIndex) => (
                    <div key={track._id} className=" bg-gray-100">
                        <div
                            className="flex justify-between items-center cursor-pointer p-2 border-b border-gray-200"
                            onClick={() => toggleTrack(trackIndex)}
                        >
                            <h3 className="text-2xl font-bold">
                                {trackIndex + 1}. {track.title}
                            </h3>
                            <FontAwesomeIcon
                                icon={expandedTracks[trackIndex] ? faChevronUp : faChevronDown}
                                className="text-gray-600"
                            />
                        </div>
                        {expandedTracks[trackIndex] && (
                            <ul className="list-none p-0">
                                {track.track_steps.map((step, stepIndex) => (
                                    <li
                                        key={step._id}
                                        className="flex justify-between p-2 cursor-pointer border-b border-gray-200 hover:bg-gray-200"
                                        onClick={() => handleVideoChange(track, step)}
                                    >
                                        <div className="flex items-center">
                                            <FontAwesomeIcon icon={faPlayCircle} className="mr-2 text-gray-600" />
                                            {stepIndex + 1}. {step.video.title}
                                        </div>
                                        <div className="text-gray-600">{formatDuration(step.video.duration)}</div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export default Learn;
