import { useEffect, useState } from "react"
import { popularRequest } from "../APIs/api-methods"
import { Link } from "react-router-dom"
import { TvAndMovieResult } from "../utilities/types"

const Main = (): JSX.Element =>{
    const [movies, setMovies] = useState([] as TvAndMovieResult[])
    const [currentMovieIndex, setCurrentMovieIndex] = useState(Math.floor(Math.random() * movies.length))

    useEffect(() => {
        const fetchPopularMovies = async () => {
            const response = await popularRequest(1)
            setMovies(response)
        }
        fetchPopularMovies()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * movies.length)
            setCurrentMovieIndex(randomIndex)
        }, 7000)
        return () => clearInterval(interval)
    }, [movies])

    const movie = movies[currentMovieIndex]

    const truncateString = (str: string, num: number) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...'
        } else {
            return str
        }
    }

    return (
        <div className="w-full h-[550px] text-white">
            <div className="w-full h-full">
                <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
                <img 
                    src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} 
                    className="w-full h-full object-cover" 
                    alt={movie?.title} 
                />
                <div className="absolute w-full top-[20%] p-4 md:p-8">
                    <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
                    <div className="my-4">
                        <Link to={`/movie/${movie?.id}`}>
                            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all">
                                Info
                            </button>
                        </Link>
                    </div>
                    <p className="text-gray-400 text-sm">Released: {movie?.release_date.toString()}</p>
                    <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
                        {truncateString(movie?.overview, 150)}
                    </p>                   
                </div>
            </div>
        </div>
    )
}

export default Main