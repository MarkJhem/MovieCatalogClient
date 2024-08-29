import { useEffect, useState, useContext } from 'react';
// import coursesData from '../data/coursesData';
import CourseCard from '../components/CourseCard';
import UserContext from '../UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Courses(){

	const { user } = useContext(UserContext);

	// console.log(coursesData);
	// State that will be used to store the courses retrieved from the db
	const [ courses, setCourses ] = useState([])


	const fetchData = () => {

		// Allows to have a dynamic url depending whether the user that's logged in is an admin or not
        let fetchUrl = user.isAdmin === true ? `${process.env.REACT_APP_API_URL}/courses/all` : `${process.env.REACT_APP_API_URL}/courses/`

		// retrieves all courses
		fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`
            }
        })
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(typeof data.message !== "string") {

				setCourses(data)
			} else {
				setCourses([])
			}
		})
	}


	useEffect(() => {
		fetchData();
	}, [])

	return (
		<>
            {
                (user.isAdmin === true) ?
                    <AdminView coursesData={courses} fetchData={fetchData}/>
                    :
                    <UserView coursesData={courses} />
            }
        </>
	)
}