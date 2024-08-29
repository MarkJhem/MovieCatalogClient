import { CardGroup } from "react-bootstrap";
import PreviewCourses from "./PreviewCourses"
import { useEffect, useState } from "react"

export default function FeaturedCourses() {

    const [ previews, setPreviews ] = useState([]);

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}/courses`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            // Create two empty arrays to be used to store ramdom number and featured course data.
            const numbers = [];
            const featured = [];

            // We will be creating a function that will generate a number between 0 and the length of the data array (which is the fetched array)

            const generateRandomNums = () => {
                let randomNum = Math.floor(Math.random() * data.length);

                // We need to check if the index is already existing on the numbers array
                if(numbers.indexOf(randomNum) === - 1) {
                    numbers.push(randomNum);
                } else {
                    // we will just re-run the generateRandomNums
                    generateRandomNums();
                }
            }

            // For each iteration of the loop, the PreviewCourses component is rendered with the corresponding data from the data array
            for (let i = 0; i < 5; i++) {
                // generate a number
                generateRandomNums();
                console.log(numbers)

                featured.push(
                    <PreviewCourses data = {data[numbers[i]]} key={data[numbers[i]]._id}/>
                )
            }
            setPreviews(featured);
        })
    }, [])
    
    
    return (
        <>
            <h2 className="text-center">Featured Courses</h2>
            <CardGroup className="justify-content-center">
                {previews}
            </CardGroup>
        </>
    )
}