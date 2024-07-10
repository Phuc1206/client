import { faGears, faHome, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Sidebar() {
    return (
        <aside className="w-24 bg-white shadow-md flex flex-shrink-0 justify-between">
            <div className="py-4 px-2 sticky items-center">
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <a
                                href="#"
                                className="block w-20 h-20 text-center items-center justify-center py-2 px-4 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-xl"
                            >
                                <FontAwesomeIcon icon={faHome} className="mb-1 text-lg mt-2" />
                                <span className="whitespace-nowrap font-semibold text-xs">Trang chủ</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block w-20 h-20 text-center items-center justify-center py-2 px-4  text-gray-700 hover:bg-gray-300 rounded-xl"
                            >
                                <FontAwesomeIcon icon={faGears} className="mb-1 text-lg mt-2" />
                                <span className="whitespace-nowrap font-semibold text-xs">Cài đặt</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block w-20 h-20 text-center items-center justify-center py-2 px-4 text-gray-700 hover:bg-gray-300 rounded-xl"
                            >
                                <FontAwesomeIcon icon={faUserSecret} className="mb-1 text-lg mt-2" />
                                <span className="whitespace-nowrap font-semibold text-xs">Admin</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
export default Sidebar;
