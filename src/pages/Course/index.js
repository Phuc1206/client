import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as apiService from '../../services/apiService';
import { AuthContext } from '../../helpers/AuthContext'; // Import the AuthContext
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faMinus,
    faPlayCircle,
    faGaugeHigh,
    faFilm,
    faClock,
    faBatteryFull,
} from '@fortawesome/free-solid-svg-icons';

function Course() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState([]);
    const checkEnrollment = (course) => {
        if (course.students_count && course.students_count.includes(authState.id)) {
            navigate(`/learning/${slug}`);
        }
    };
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await apiService.showCourse(slug);
                setCourse(response);
                setExpanded(new Array(response.tracks.length).fill(false));
                checkEnrollment(response);
            } catch (error) {
                console.error('Error fetching course:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [slug]);

    const toggleExpand = (index) => {
        setExpanded(expanded.map((exp, i) => (i === index ? !exp : exp)));
    };

    const handleEnroll = async () => {
        try {
            await apiService.enrollCourse(course._id, authState.id);
            navigate(`/learning/${slug}`);
        } catch (error) {
            console.error('Error enrolling in course:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!course) {
        return <div>Course not found</div>;
    }

    const totalSteps = course.tracks.reduce((acc, track) => acc + track.track_steps.length, 0);
    function formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-start">
                <div className="w-2/3">
                    <h1 className="text-3xl font-bold">{course.title}</h1>
                    <p className="text-gray-700 mt-2">{course.description}</p>
                    <div className="mt-6">
                        <h2 className="text-xl font-bold">Nội dung khóa học</h2>
                        <p className="text-gray-600">
                            {course.tracks.length} chương • {totalSteps} bài học • Thời lượng {course.duration}
                        </p>
                        <div className="mt-8">
                            {course.tracks.map((track, index) => (
                                <div key={track._id} className="mt-2 border border-gray-300 rounded-lg p-4">
                                    <div
                                        className="font-bold text-lg flex justify-between items-center cursor-pointer"
                                        onClick={() => toggleExpand(index)}
                                    >
                                        <span>
                                            {expanded[index] ? (
                                                <FontAwesomeIcon icon={faMinus} className="text-red-500 mr-2" />
                                            ) : (
                                                <FontAwesomeIcon icon={faPlus} className="text-red-500 mr-2" />
                                            )}
                                            {index + 1}. {track.title}
                                        </span>
                                        <span>{track.track_steps.length} bài học</span>
                                    </div>
                                    {expanded[index] && (
                                        <ul className="ml-8 mt-6">
                                            {track.track_steps.map((step, stepIndex) => (
                                                <li
                                                    key={step._id}
                                                    className="text-gray-700 flex justify-between items-center"
                                                >
                                                    <span>
                                                        <FontAwesomeIcon
                                                            icon={faPlayCircle}
                                                            className="text-red-500 mr-2"
                                                        />
                                                        {stepIndex + 1}. {step.video.title}
                                                    </span>
                                                    <span className="text-gray-500">
                                                        {formatDuration(step.video.duration)}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-96">
                    <img src={course.image} alt={course.title} className="w-full h-52 object-cover rounded-lg" />
                    <div className="mt-4 p-4 bg-white rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-blue-500">Miễn phí</h3>

                        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg" onClick={handleEnroll}>
                            Đăng ký học
                        </button>

                        <div className="mt-4">
                            <div className="flex items-center mb-2">
                                <FontAwesomeIcon icon={faGaugeHigh} />
                                <span className="ml-2 text-gray-700">{course.level}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <FontAwesomeIcon icon={faFilm} />
                                <span className="ml-2 text-gray-700">Tổng số {totalSteps} bài học</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <FontAwesomeIcon icon={faClock} />
                                <span className="ml-2 text-gray-700">Thời lượng {course.duration}</span>
                            </div>
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faBatteryFull} />
                                <span className="ml-2 text-gray-700">Học mọi lúc, mọi nơi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Course;
