import Banner from '../components/Banner';
import FeaturedCourses from '../components/FeaturedCourses';
import Highlights from '../components/Highlights';


export default function Home() {
	
	const data = {
       title: "Zuitt Coding Bootcamp",
       content: "Opportunities for everyone, everywhere",
       destination: "/courses",
       label: "Enroll now!"
   }

   return (
       <>
           <Banner data={data}/>
           <FeaturedCourses/>
           <Highlights />
       </>
   )
}