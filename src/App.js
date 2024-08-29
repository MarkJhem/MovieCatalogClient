import { useState, useEffect } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
// import Banner from './components/Banner';
// import Highlights from './components/Highlights';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseView from './pages/CourseView';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import AddCourse from './pages/AddCourse';
import Error from './pages/Error';
import { UserProvider } from './UserContext';

function App() {


  // Global user state
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })
  
  useEffect(() => {

    fetch(`https://movieapi-amerna.onrender.com/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)

        if (typeof data.user !== "undefined") {

          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin
          });

        } else {

          setUser({
            id: null,
            isAdmin: null
          });

        }

      })

  }, []);

  // Function for clearing the localStorage on logout
  const unsetUser = () => {
    localStorage.clear();
  }

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar />
        <Container>
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseView />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/addCourse" element={<AddCourse/>} />
            <Route path="*" element={<Error />} />


            <Route path='/' element={<Home />} />

            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />

            <Route path='/workout' element={<Movie />} />


            <Route path='/addmovie' element={<Movie />} />
          </Routes>
        </Container>
      </Router>
      </UserProvider>
  );
}

export default App;
