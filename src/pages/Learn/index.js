import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as apiService from '../../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faPlayCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../helpers/AuthContext';
import Loading from '../../components/Loading';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import { Howl } from 'howler';
import soundURL from '../../assets/sound/alarm.mp3';
import QuizModal from '../../components/Quiz';
import CertificateDownload from '../../components/Certificate';
// import Summary from '../../components/Practice/Lesson';
// const NOT_TOUCH_LABEL = 'not_touch';
const CLOSE_LABEL = 'close';
const SOUND_THRESHOLD = 0.9;
const ALERT_DELAY = 1000;
const AWAY_LABEL = 'away';
function Learn() {
    const { slug } = useParams();
    const { authState } = useContext(AuthContext);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [expandedTracks, setExpandedTracks] = useState({});
    const [quizModalOpen, setQuizModalOpen] = useState(false);
    const [currentLesson, setCurrentLesson] = useState(null);
    // const [showPractice, setShowPractice] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const [progress, setProgress] = useState({ trackIndex: 0, stepIndex: 0 });
    const videoRef = useRef(null);
    const classifierRef = useRef(null);
    const mobilenetRef = useRef(null);
    const canPlaySoundRef = useRef(true);
    const notTouchStartRef = useRef(null);
    const awayStartRef = useRef(null);
    const runLoopRef = useRef(null);
    const sound = new Howl({
        src: [soundURL],
    });

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await apiService.showCourse(slug);
                setCourse(response);

                const progressRes = await apiService.getProgress(authState.id, response._id);
                const progressResponse = progressRes.progressRecord;

                if (progressResponse && progressResponse.message !== 'Progress not found') {
                    const { track, trackStep } = progressResponse;

                    const trackIds = track.map((t) => t._id);
                    const trackStepIds = trackStep.map((ts) => ts._id);

                    const currentTrackIndex = response.tracks.filter((t) => trackIds.includes(t._id));
                    const CountCurrentTrackIndex = currentTrackIndex.length - 1;
                    const currentStepIndex =
                        currentTrackIndex !== -1
                            ? response.tracks[CountCurrentTrackIndex].track_steps.filter((s) =>
                                  trackStepIds.includes(s._id),
                              )
                            : -1;
                    const CountCurrentStepIndex = currentStepIndex.length - 1;

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

    const setupCamera = async () => {
        return new Promise((resolve, reject) => {
            navigator.getUserMedia =
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;

            if (navigator.getUserMedia) {
                navigator.getUserMedia(
                    { video: true },
                    (stream) => {
                        if (videoRef.current) {
                            videoRef.current.srcObject = stream;
                            videoRef.current.addEventListener('loadeddata', resolve);
                        } else {
                            reject(new Error('Video element not found'));
                        }
                    },
                    (error) => reject(error),
                );
            } else {
                reject();
            }
        });
    };

    const loadModel = async () => {
        try {
            const response = await apiService.getModel();
            const datasetObj = response;
            const dataset = datasetObj.reduce((acc, { label, data, shape }) => {
                acc[label] = tf.tensor(data, shape);
                return acc;
            }, {});
            classifierRef.current.setClassifierDataset(dataset);
            console.log('Model loaded successfully');
        } catch (error) {
            console.error('Error loading model:', error);
        }
    };

    const run = useCallback(async () => {
        if (!videoRef.current || videoRef.current.readyState !== 4) {
            setTimeout(run, 1000);
            return;
        }
        const embedding = mobilenetRef.current.infer(videoRef.current, true);
        const result = await classifierRef.current.predictClass(embedding);
        console.log(result);

        if (result.label === CLOSE_LABEL && result.confidences[result.label] > SOUND_THRESHOLD) {
            if (!notTouchStartRef.current) {
                notTouchStartRef.current = Date.now();
            } else if (Date.now() - notTouchStartRef.current >= ALERT_DELAY && canPlaySoundRef.current) {
                sound.play();
                canPlaySoundRef.current = false;
                toast.warn('Đừng không tập trung khi học nhé!');
            }
        } else if (result.label === AWAY_LABEL && result.confidences[result.label] > SOUND_THRESHOLD) {
            if (!awayStartRef.current) {
                awayStartRef.current = Date.now();
            } else if (Date.now() - awayStartRef.current >= ALERT_DELAY && canPlaySoundRef.current) {
                sound.play();
                canPlaySoundRef.current = false;
                toast.warn('Đừng rời khỏi màn hình khi học nhé!');
            }
        } else {
            notTouchStartRef.current = null;
            awayStartRef.current = null;
            canPlaySoundRef.current = true;
        }
        runLoopRef.current = setTimeout(run, 1000);
    }, []);

    useEffect(() => {
        const initModel = async () => {
            try {
                await setupCamera();
                mobilenetRef.current = await mobilenet.load();
                classifierRef.current = knnClassifier.create();
                await loadModel();
                canPlaySoundRef.current = true;
                run();
            } catch (error) {
                console.error('Camera access denied or error occurred:', error);
            }
        };
        initModel();

        return () => {
            const video = videoRef.current;
            if (video && video.srcObject) {
                video.srcObject.getTracks().forEach((track) => track.stop());
            }
            clearTimeout(runLoopRef.current);
        };
    }, [slug, run]);

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
        console.log(state);
        if (course && currentVideo) {
            const currentTrackIndex = progress.trackIndex;
            const currentStepIndex = progress.stepIndex;

            if (currentTrackIndex === 0 && currentStepIndex === 0) {
                await apiService.saveProgress(
                    authState.id,
                    course._id,
                    course.tracks[currentTrackIndex]._id,
                    course.tracks[currentTrackIndex].track_steps[currentStepIndex]._id,
                    0,
                );
            }
        }
        //playedSeconds
        if (course && currentVideo && state.playedSeconds >= currentVideo.duration / 2 - 1) {
            const currentTrackIndex = progress.trackIndex;
            const currentStepIndex = progress.stepIndex;

            if (
                currentTrackIndex >= 0 &&
                currentTrackIndex < course.tracks.length &&
                currentStepIndex >= 0 &&
                currentStepIndex < course.tracks[currentTrackIndex].track_steps.length
            ) {
                const currentStep = course.tracks[currentTrackIndex].track_steps[currentStepIndex];
                console.log(currentStep.lesson);
                if (currentStep.lesson !== '' && currentStep.lesson) {
                    setCurrentLesson(currentStep.lesson);
                    setQuizModalOpen(true);
                }

                let newTrackIndex = currentTrackIndex;
                let newStepIndex = currentStepIndex + 1;

                if (newStepIndex >= course.tracks[currentTrackIndex].track_steps.length) {
                    newTrackIndex += 1;
                    newStepIndex = 0;
                }

                const totalSteps = course.tracks.reduce((acc, track) => acc + track.track_steps.length, 0);
                const completedSteps =
                    course.tracks.slice(0, newTrackIndex).reduce((acc, track) => acc + track.track_steps.length, 0) +
                    newStepIndex;

                const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

                if (newTrackIndex >= course.tracks.length) {
                    try {
                        const lastTrackIndex = course.tracks.length - 1;
                        const lastStepIndex = course.tracks[lastTrackIndex].track_steps.length - 1;
                        const lastStep = course.tracks[lastTrackIndex].track_steps[lastStepIndex];

                        await apiService.saveProgress(
                            authState.id,
                            course._id,
                            course.tracks[lastTrackIndex]._id,
                            lastStep._id,
                            100,
                        );
                        // setShowPractice(true);
                        // alert('Congratulations! You have completed the course.');
                        setShowCertificate(true);
                        setCurrentVideo(null);
                    } catch (error) {
                        console.error('Error saving progress:', error);
                    }
                    return;
                } else {
                    // Save progress and update the current video
                    try {
                        await apiService.saveProgress(
                            authState.id,
                            course._id,
                            course.tracks[newTrackIndex]._id,
                            course.tracks[newTrackIndex].track_steps[newStepIndex]._id,
                            progressPercentage,
                        );

                        setProgress({
                            trackIndex: newTrackIndex,
                            stepIndex: newStepIndex,
                        });

                        const nextVideo = course.tracks[newTrackIndex].track_steps[newStepIndex].video;
                        setCurrentVideo(nextVideo);
                    } catch (error) {
                        console.error('Error saving progress:', error);
                    }
                }
            } else {
                console.error('Invalid track or step index.');
            }
        }
    };
    if (loading) {
        return <Loading />;
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

                    <video ref={videoRef} className="hidden" autoPlay />
                </div>
            </div>
            <div className="w-1/4 p-4 overflow-y-auto max-h-screen">
                <h2 className="p-2 font-semibold font text-xl">Nội dung khóa học</h2>
                {course.tracks.map((track, trackIndex) => (
                    <div key={track._id} className="bg-gray-100">
                        <div
                            className="flex justify-between items-center cursor-pointer p-2 border-b border-gray-200"
                            onClick={() => toggleTrack(trackIndex)}
                        >
                            <h3 className="font-semibold">{track.title}</h3>
                            <FontAwesomeIcon icon={expandedTracks[trackIndex] ? faChevronUp : faChevronDown} />
                        </div>
                        {expandedTracks[trackIndex] &&
                            track.track_steps
                                .sort((a, b) => a.position - b.position)
                                .map((step, stepIndex) => (
                                    <div
                                        key={step._id}
                                        className={`flex items-center cursor-pointer p-2 pl-4 ${
                                            progress.trackIndex > trackIndex ||
                                            (progress.trackIndex === trackIndex && progress.stepIndex >= stepIndex)
                                                ? 'text-green-500'
                                                : 'text-gray-500'
                                        }`}
                                        onClick={() => handleVideoChange(trackIndex, stepIndex)}
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                progress.trackIndex > trackIndex ||
                                                (progress.trackIndex === trackIndex && progress.stepIndex >= stepIndex)
                                                    ? faCheckCircle
                                                    : faPlayCircle
                                            }
                                            className="mr-2"
                                        />
                                        <span>{step.video.title}</span>
                                    </div>
                                ))}
                    </div>
                ))}
            </div>
            {quizModalOpen && (
                <QuizModal
                    isOpen={quizModalOpen}
                    onRequestClose={() => setQuizModalOpen(false)}
                    lesson={currentLesson}
                />
            )}
            {/* {showPractice && <Summary />} */}
            {showCertificate && <CertificateDownload name={authState.username} course={course.title} />}
        </div>
    );
}

export default Learn;
