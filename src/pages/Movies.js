import { useContext, useEffect, useState } from "react"
import UserContext from "../UserContext"
import AdminViewMovies from "../components/AdminViewMovies";
import UserViewMovies from "../components/UserViewMovies";

export default function Movies() {

    const { user } = useContext(UserContext);
    const [movies, setMovies] = useState([]);

    const fetchMovies = () => {
        fetch('https://movieapi-amerna.onrender.com/movies/getMovies', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setMovies(data))
    }



    useEffect(() => {
        if (user.id) {
            
            fetchMovies();
            console.log(movies);
        }

    }, [user]);

    return (
        <>
            
            {
                (user.isAdmin === true) ?
                    <AdminViewMovies movies={movies} fetchMovies={fetchMovies} />
                    :
                    <UserViewMovies movies={movies} />
            }
        </>



    )
}