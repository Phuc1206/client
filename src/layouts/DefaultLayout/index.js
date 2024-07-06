import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div className="flex flex-col">
            <Header />
            <div className="mt-20 h-96 flex w-full max-w-full">
                <Sidebar />
                <div className="w-full">{children}</div>
            </div>
        </div>
    );
}
export default DefaultLayout;
