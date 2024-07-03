import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateCourse from './pages/CreateCourse';
import Login from './pages/Login';
function App() {
    return (
        <div className="App">
            <Router>
                <Link to="/createcourse/">Create Course</Link>
                <Link to="/">Home page</Link>
                <Link to="/login">Login</Link>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/createcourse/" element={<CreateCourse />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
