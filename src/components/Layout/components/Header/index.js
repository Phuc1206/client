import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faSignIn } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import PopperWrapper from '../../../Popper/Wrapper';
import CourseItem from '../../../CourseItem';
import Button from '../../../Button';
function Header() {
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            setSearchResults([]);
        }, 0);
    });
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <div className="flex items-center space-x-4">
                    <img src="https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png" alt="Logo" className="w-12 h-12" />
                    <h1 className="text-lg font-bold">Học Lập Trình Để Đi Làm</h1>
                </div>
                <Tippy
                    interactive
                    visible={searchResults.length > 0}
                    render={(attrs) => (
                        <div className="w-96 max-w-lg" tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className="text-slate-400 text-sm font-medium px-3 py-1">Khóa học</h4>
                                <CourseItem />
                                <CourseItem />
                                <CourseItem />
                                <CourseItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className="flex-1 flex justify-center relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm khóa học, bài viết, video, ..."
                            className="relative w-96 max-w-lg px-4 py-2 border rounded-full pr-12 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                invalid:border-pink-500 invalid:text-pink-600
                                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                            spellCheck={false}
                        />
                        <button className="absolute ml-72  top-1/2 transform -translate-y-1/2 text-gray-500 opacity-50">
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <button className="absolute ml-72 top-1/2 transform -translate-y-1/2 text-gray-500 opacity-50">
                            <FontAwesomeIcon icon={faSpinner} />
                        </button>
                        {/* <Tippy content="tìm kiếm"> */}
                        <button className="flex items-center px-2 opacity-70 text-gray-500 hover:opacity-100 active:text-gray-950">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        {/* </Tippy> */}
                    </div>
                </Tippy>
                <div className="flex space-x-4">
                    {/* <button className="text-white bg-orange-500 px-4 py-2 rounded-lg">Đăng ký</button>
                    <button className="text-white bg-orange-600 px-4 py-2 rounded-lg">Đăng nhập</button> */}
                    <Button text>Đăng ký</Button>
                    <Button primary>Đăng nhập</Button>
                </div>
            </div>
        </header>
    );
}
export default Header;
