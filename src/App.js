import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CreateCourse from './pages/CreateCourse'
function App() {
  
  return (
    <div className="App">
      <Router>
        <Link to="/createcourse/">Create Course</Link>
        <Link to="/">Home page</Link>
        <Routes>
          <Route path='/' exact element={<Home />}/>
          <Route path='/createcourse/' element={<CreateCourse />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
