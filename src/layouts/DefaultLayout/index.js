import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="mt-16 flex flex-grow">
                <Sidebar />
                <div className="flex-grow bg-white p-4">{children}</div>
            </div>
        </div>
    );
}
export default DefaultLayout;
