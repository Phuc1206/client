import Header from '../components/Header';

function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className="mt-16 ">
                <div className="">{children}</div>
            </div>
        </div>
    );
}
export default HeaderOnly;
