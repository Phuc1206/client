import Header from "./Header";
import Sidebar from "./Sidebar";

function DefaultLayout() {
    return(
        <div>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        {/* Content goes here */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DefaultLayout;