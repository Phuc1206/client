import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faEarthAsia,
    faQuestionCircle,
    faMoon,
    faBell,
    faList,
    faUser,
    faGear,
    faSignOut,
    faArrowLeft,
    faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import Tippyy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '../../../components/Button';
import Menu from '../../../components/Popper/Menu';
import Search from '../Search';
import config from '../../../config';
import { AuthContext } from '../../../helpers/AuthContext';
import * as apiService from '../../../services/apiService';
import CourseProgress from '../../../components/CourseProgress';
import images from '../../../assets/images';
import Guide from '../../../components/Guide';
import { useDebounce } from '../../../hooks';
function Header() {
    const avatarURL = process.env.REACT_APP_BASE_URL + 'img/';
    const courseRef = useRef(null);
    const { slug } = useParams();
    let navigate = useNavigate();
    const location = useLocation();
    const { authState, setAuthState } = useContext(AuthContext);
    const [course, setCourse] = useState([]);
    const [progress, setProgress] = useState({});
    const [showCourses, setShowCourses] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const [totalSteps, setTotalSteps] = useState(0);
    const [countStep, setCountStep] = useState(0);
    const [showGuideModal, setShowGuideModal] = useState(false);

    const debouncedCourse = useDebounce(course, 1000);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (authState.status && !slug) {
                    const userResponse = await apiService.getProfile(authState.id);
                    setAvatar(userResponse.avatar);
                    const progressResponse = await apiService.getProgressUser(authState.id);
                    if (progressResponse) {
                        setProgress(progressResponse);
                    } else {
                        console.warn('No progress response received');
                    }
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [authState]);
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                if (slug && authState.status) {
                    const courseResponse = await apiService.showCourse(slug);

                    if (courseResponse) {
                        setCourse(courseResponse);
                        const getProgress = await apiService.getProgress(authState.id, courseResponse._id);
                        if (getProgress && getProgress.progressRecord) {
                            setPercentage(getProgress.progressRecord.progress);
                            setCountStep(getProgress.progressRecord.trackStep.length);
                            const totalSteps = courseResponse.tracks.reduce(
                                (acc, track) => acc + track.track_steps.length,
                                0,
                            );
                            setTotalSteps(totalSteps);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };
        if (debouncedCourse) {
            fetchCourse();
        }
    }, [slug, debouncedCourse]);
    const handleMenuChange = (MenuItem) => {
        switch (MenuItem.type) {
            case 'language':
                // handle language change
                break;
            case 'feedback':
                // handle feedback and help
                break;
            case 'darkMode':
                // handle dark mode change
                break;
            default:
                return;
        }
    };
    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faEarthAsia} />,
            title: 'Vietnamese',
            children: {
                title: 'Languages',
                data: [
                    {
                        type: 'language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'language',
                        code: 'vi',
                        title: 'Tiếng Việt',
                    },
                ],
            },
        },
        {
            icon: <FontAwesomeIcon icon={faQuestionCircle} />,
            title: 'Feedback and help',
            to: '/feedback',
        },
        {
            icon: <FontAwesomeIcon icon={faMoon} />,
            title: 'Dark mode',
        },
    ];
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/profile/',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },

        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            onClick: handleLogout,
            separate: true,
        },
    ];
    function handleLogout() {
        localStorage.removeItem('accessToken');
        setAuthState({
            username: '',
            id: 0,
            is_admin: false,
            status: false,
        });
        navigate('/login');
    }
    const handleCoursesClick = () => {
        setShowCourses((prev) => !prev);
    };
    const handleClickOutside = (event) => {
        if (courseRef.current && !courseRef.current.contains(event.target)) {
            setShowCourses(false);
        }
    };
    useEffect(() => {
        if (showCourses) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCourses]);
    return (
        <header className="bg-white shadow-md fixed w-full top-0 left-0 z-10">
            <div className="container mx-auto flex justify-between items-center py-3 px-6">
                <div className="flex items-center space-x-4">
                    {location.pathname.startsWith('/learning/') && (
                        <button onClick={() => navigate('/')} className="text-xl text-gray-600 px-2 mx-2">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    )}
                    <Link to={config.routes.home}>
                        <img
                            src="https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png"
                            alt="Logo"
                            className="w-12 h-12 rounded-2xl"
                        />
                    </Link>
                    {!location.pathname.startsWith('/learning') && (
                        <Link to="/">
                            {' '}
                            <h1 className="text-lg font-bold">Học Lập Trình</h1>{' '}
                        </Link>
                    )}
                    {location.pathname.startsWith('/learning') && <h1 className="text-lg font-bold">{course.title}</h1>}
                </div>
                {!location.pathname.startsWith('/learning') && <Search />}
                {!location.pathname.startsWith('/learning') && (
                    <div className="flex space-x-4">
                        {authState.status ? (
                            <>
                                <Tippyy delay={[0, 200]} content="Khóa học của tôi" placement="bottom">
                                    <button className="text-xl text-gray-600 px-2 mx-2" onClick={handleCoursesClick}>
                                        <FontAwesomeIcon icon={faList} />
                                    </button>
                                </Tippyy>
                                <Tippyy delay={[0, 200]} content="Thông báo" placement="bottom">
                                    <button className="text-xl text-gray-600 px-2 mx-2 ml-3">
                                        <FontAwesomeIcon icon={faBell} />
                                    </button>
                                </Tippyy>
                            </>
                        ) : (
                            <>
                                <Button text to="/register">
                                    Đăng ký
                                </Button>
                                <Button primary to="/login">
                                    Đăng nhập
                                </Button>
                            </>
                        )}
                        <Menu
                            items={authState.status ? userMenu : MENU_ITEMS}
                            onChange={handleMenuChange}
                            hideOnClick={false}
                            onClick={handleLogout}
                        >
                            {authState.status ? (
                                <img
                                    className="w-8 h-8 object-cover rounded-full "
                                    alt={`${authState.username}`}
                                    src={avatar ? `${avatarURL}${avatar}` : `${images.noImage}`}
                                />
                            ) : (
                                <button className="text-lg px-1 py-2">
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            )}
                        </Menu>
                    </div>
                )}
                {location.pathname.startsWith('/learning') && (
                    <div className="flex space-x-4">
                        <div style={{ width: 40, height: 40 }}>
                            <CircularProgressbar value={percentage} text={`${percentage}%`} />
                        </div>
                        <span className="items-center justify-center mt-2">
                            {countStep}/{totalSteps} Bài học
                        </span>
                        <Button
                            text
                            lefticon={<FontAwesomeIcon icon={faCircleQuestion} />}
                            onClick={() => setShowGuideModal(true)}
                        >
                            Hướng dẫn
                        </Button>
                    </div>
                )}
            </div>
            {showCourses && (
                <div ref={courseRef} className="fixed top-16 right-2 bg-white shadow-xl w-96 rounded-md p-4">
                    <div className="mb-4 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Khóa học của tôi</h3>
                        <a href="/profile" className="text-red-500 text-sm">
                            Xem tất cả
                        </a>
                    </div>
                    <CourseProgress progress={progress} />
                </div>
            )}
            <Guide show={showGuideModal} onClose={() => setShowGuideModal(false)} />
        </header>
    );
}
export default Header;
