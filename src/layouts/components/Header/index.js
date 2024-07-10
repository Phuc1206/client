import { Link, useNavigate } from 'react-router-dom';
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
} from '@fortawesome/free-solid-svg-icons';
import Tippyy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '../../../components/Button';
import Menu from '../../../components/Popper/Menu';
import Image from '../../../components/image';
import Search from '../Search';
import config from '../../../config';
import { useAuth } from '../../../hooks';

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
function Header() {
    const navigate = useNavigate();
    const currentUser = useAuth();

    //handle logic
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
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoaa',
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
        navigate('/login');
    }
    return (
        <header className="bg-white shadow-md fixed w-full top-0 left-0 z-10">
            <div className="container mx-auto flex justify-between items-center py-3 px-6">
                <div className="flex items-center space-x-4">
                    <Link to={config.routes.home}>
                        <img
                            src="https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png"
                            alt="Logo"
                            className="w-12 h-12 rounded-2xl"
                        />
                    </Link>
                    <h1 className="text-lg font-bold">Học Lập Trình Để Đi Làm</h1>
                </div>
                <Search />
                <div className="flex space-x-4">
                    {currentUser ? (
                        <>
                            <Tippyy delay={[0, 200]} content="Khóa học của tôi" placement="bottom">
                                <button className="text-xl text-gray-600 px-2 mx-2">
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
                            <Button text>Đăng ký</Button>
                            <Button primary to="/login">
                                Đăng nhập
                            </Button>
                        </>
                    )}
                    <Menu
                        items={currentUser ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}
                        hideOnClick={false}
                        onClick={handleLogout}
                    >
                        {currentUser ? (
                            <Image
                                className="w-8 h-8 object-cover rounded-full "
                                alt="Nguyen van a"
                                src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/136a8eb8f8798a032dcbd22a19eae294.jpeg?lk3s=a5d48078&nonce=86796&refresh_token=b60ec603cadd52289e47ce85aee8a5b7&x-expires=1720321200&x-signature=rL07gw1ibY%2BeiKFbHYHeFyootdM%3D&shp=a5d48078&shcp=81f88b70"
                            />
                        ) : (
                            <button className="text-lg px-1 py-2">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}
export default Header;
