import { Link } from "react-router-dom"
import { TvAndMovieResult } from "../utilities/types";

type Props = {
    movie: TvAndMovieResult
}

const MovieCmp: React.FC<Props> = ({movie}) => {

    const monthNames = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (!movie.backdrop_path) {
        return null; // No renderizar el componente si no hay póster
    }

    //Cambiar los nombres 'movie'
    return (
        <Link to={`/movie/${movie?.id}`}>
            <div className="w-[60%] sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[25%] inline-block cursor-pointer relative p-2">
                <img className="w-full rounded-lg h-auto block" src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`} alt={movie?.title} />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                    <p className="white-space-normal text-sm md:text-base lg:text-sm xl:text-base 2xl:text-xl font-bold flex justify-center items-center h-full text-center">
                        {movie?.title}<br></br>
                        {movie?.release_date ? monthNames[new Date(movie.release_date).getMonth()] + " " + new Date(movie.release_date).getFullYear(): null}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default MovieCmp