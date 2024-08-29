import { useState, useEffect } from 'react';
import CourseSearch from './CourseSearch';
import CourseCard from './CourseCard';
import CourseSearchByPrice from './CourseSearchByPrice'


export default function UserView({coursesData}) {

    const [ courses, setCourses ] = useState([])

    useEffect(() => {
        const coursesArr = coursesData.map(course => {

            if(course.isActive === true) {
                return (
                    <CourseCard courseProp={course} key={course._id}/>
                    )
            } else {
                return null;
            }
        })

        //set the courses state to the result of our map function, to bring our returned course component outside of the scope of our useEffect where our return statement below can see.
        setCourses(coursesArr)

    }, [coursesData])

    return(
        <>  
            <CourseSearch/>
            <hr />
            <br />

            <CourseSearchByPrice />
      
            <hr />
            <br />
            { courses }
        </>
        )
}

