import React, { useState, useEffect, useContext } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useParams } from 'react-router-dom';
import * as apiService from '../../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faPlayCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../helpers/AuthContext';

function Learn() {
    const { slug } = useParams();
    const { authState } = useContext(AuthContext);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [expandedTracks, setExpandedTracks] = useState({});
    const [progress, setProgress] = useState({ trackIndex: 0, stepIndex: 0 });

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await apiService.showCourse(slug);
                setCourse(response);

                const progresRes = await apiService.getProgress(authState.id, response._id);
                const progressResponse = progresRes.progressRecord;
                console.log('Progress Response:', progressResponse);

                if (progressResponse && progressResponse.message !== 'Progress not found') {
                    const { track, trackStep } = progressResponse;

                    const trackIds = track.map((t) => t._id);
                    const trackStepIds = trackStep.map((ts) => ts._id);

                    console.log('Track IDs:', trackIds);
                    console.log('Track Step IDs:', trackStepIds);

                    const currentTrackIndex = response.tracks.filter((t) => trackIds.includes(t._id));
                    const CountCurrentTrackIndex = currentTrackIndex.length - 1;
                    const currentStepIndex =
                        currentTrackIndex !== -1
                            ? response.tracks[CountCurrentTrackIndex].track_steps.filter((s) =>
                                  trackStepIds.includes(s._id),
                              )
                            : -1;
                    const CountCurrentStepIndex = currentStepIndex.length - 1;
                    console.log('Current Track Index:', CountCurrentTrackIndex);
                    console.log('Current Step Index:', CountCurrentStepIndex);

                    if (CountCurrentTrackIndex !== -1 && CountCurrentStepIndex !== -1) {
                        setCurrentVideo(
                            response.tracks[CountCurrentTrackIndex].track_steps[CountCurrentStepIndex].video,
                        );
                        setExpandedTracks({ [response.tracks[CountCurrentTrackIndex]._id]: true });
                        setProgress({
                            trackIndex: CountCurrentTrackIndex,
                            stepIndex: CountCurrentStepIndex,
                        });
                    } else {
                        console.error('Track or step index not found.');
                    }
                } else {
                    if (response.tracks.length > 0 && response.tracks[0].track_steps.length > 0) {
                        setCurrentVideo(response.tracks[0].track_steps[0].video);
                        setProgress({
                            trackIndex: 0,
                            stepIndex: 0,
                        });
                        setExpandedTracks({ [response.tracks[0]._id]: true });
                    } else {
                        console.error('Course has no tracks or track steps.');
                    }
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

    const handleVideoChange = (trackIndex, stepIndex) => {
        if (
            trackIndex < progress.trackIndex ||
            (trackIndex === progress.trackIndex && stepIndex <= progress.stepIndex)
        ) {
            setCurrentVideo(course.tracks[trackIndex].track_steps[stepIndex].video);
        } else {
            alert('Complete the previous steps to access this content.');
        }
    };

    const handleProgress = async (state) => {
        if (course && currentVideo && state.playedSeconds >= currentVideo.duration - 1) {
            const currentTrackIndex = progress.trackIndex;
            const currentStepIndex = progress.stepIndex;

            let newTrackIndex = currentTrackIndex;
            let newStepIndex = currentStepIndex + 1;

            if (newStepIndex >= course.tracks[currentTrackIndex].track_steps.length) {
                newTrackIndex += 1;
                newStepIndex = 0;
            }
            const totalSteps = course.tracks.reduce((acc, track) => acc + track.track_steps.length, 0);

            // Calculate completed steps
            const completedSteps =
                course.tracks.slice(0, newTrackIndex).reduce((acc, track) => acc + track.track_steps.length, 0) +
                newStepIndex;

            const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
            if (newTrackIndex <= course.tracks.length) {
                try {
                    await apiService.saveProgress(
                        authState.id,
                        course._id,
                        course.tracks[currentTrackIndex]._id,
                        course.tracks[currentTrackIndex].track_steps[currentStepIndex]._id,
                        progressPercentage,
                    );

                    // Update progress state
                    setProgress({
                        trackIndex: newTrackIndex,
                        stepIndex: newStepIndex,
                    });
                    if (newTrackIndex === course.tracks.length) {
                        alert('Congratulations! You have completed the course.');
                        return;
                    } else {
                        // Set new current video
                        setCurrentVideo(course.tracks[newTrackIndex].track_steps[newStepIndex].video);
                    }
                } catch (error) {
                    console.error('Error saving progress:', error);
                }
            }
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
            <div className="w-1/4 p-4 overflow-y-auto max-h-screen">
                {course.tracks.map((track, trackIndex) => (
                    <div key={track._id} className="bg-gray-100">
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
                                {track.track_steps.map((step, stepIndex) => {
                                    const isCurrentVideo = currentVideo === step.video;
                                    const isCompleted =
                                        trackIndex < progress.trackIndex ||
                                        (trackIndex === progress.trackIndex && stepIndex <= progress.stepIndex);
                                    const isLocked = !isCompleted && !isCurrentVideo;

                                    return (
                                        <li
                                            key={step._id}
                                            className={`flex justify-between p-2 cursor-pointer border-b border-gray-200 ${
                                                isCurrentVideo ? 'bg-blue-100' : ''
                                            } ${isCompleted ? 'text-green-600' : ''} ${
                                                isLocked ? 'opacity-50 pointer-events-none' : ''
                                            }`}
                                            onClick={() => handleVideoChange(trackIndex, stepIndex)}
                                        >
                                            <div className="flex items-center">
                                                <FontAwesomeIcon icon={faPlayCircle} className="mr-2 text-gray-600" />
                                                {stepIndex + 1}. {step.video.title}
                                                {isCompleted && (
                                                    <FontAwesomeIcon
                                                        icon={faCheckCircle}
                                                        className="ml-2 text-green-600"
                                                    />
                                                )}
                                            </div>
                                            <div className="text-gray-600">{formatDuration(step.video.duration)}</div>
                                        </li>
                                    );
                                })}
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
