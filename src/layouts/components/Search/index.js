import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Tippyy from '@tippyjs/react';
import Tippy from '@tippyjs/react/headless';

import * as searchServices from '../../../services/searchService';
import PopperWrapper from '../../../components/Popper/Wrapper';
import CourseItem from '../../../components/CourseItem';
import { useDebounce } from '../../../hooks';
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResults([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debounced);
            setSearchResults(result);
            setLoading(false);
        };
        fetchApi();
    }, [debounced]);
    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setSearchValue(value);
        }
    };
    return (
        <div>
            <Tippy
                interactive
                visible={searchResults.length > 0 && showResult}
                render={(attrs) => (
                    <div className="w-96 max-w-lg" tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className="text-slate-400 text-sm font-medium px-3 py-1">Khóa học</h4>
                            {searchResults.map((result) => (
                                <CourseItem key={result._id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className="flex-1 flex justify-center relative">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Tìm kiếm khóa học, bài viết, video, ..."
                        className="relative w-96 max-w-lg px-4 py-2 border rounded-full pr-12 font-sans focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500 placeholder-shown:border-gray-500"
                        spellCheck={false}
                        value={searchValue}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button
                            className="absolute ml-72  top-1/2 transform -translate-y-1/2 text-gray-500 opacity-50"
                            onClick={() => {
                                setSearchValue('');
                                inputRef.current.focus();
                                setSearchResults([]);
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && (
                        <button className="absolute ml-72 top-1/4  text-gray-500 opacity-50 animate-spin ">
                            <FontAwesomeIcon icon={faSpinner} />
                        </button>
                    )}
                    <Tippyy content="tìm kiếm" placement="bottom" delay={[0, 100]}>
                        <button
                            id="search-btn"
                            className="flex items-center px-2 opacity-70 text-gray-500 hover:opacity-100 active:text-gray-950"
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </Tippyy>
                </div>
            </Tippy>
        </div>
    );
}
export default Search;
