import { Link } from "react-router-dom";
import { TvAndMovieResult } from "../utilities/types";

type Props = {
    audiovisual: TvAndMovieResult;
    isMovie: boolean; // True for movie, false for TV show
};

const AudiovisualGrid: React.FC<Props> = ({ audiovisual, isMovie }) => {
    const { backdrop_path, id, title, release_date, name, first_air_date } = audiovisual;
    const monthNames = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (!backdrop_path) {
        return null; // No renderizar el componente si no hay póster
    }

    const formattedDate = isMovie
        ? release_date
            ? `${monthNames[new Date(release_date).getMonth()]} ${new Date(release_date).getFullYear()}`
            : null
        : first_air_date
            ? `${monthNames[new Date(first_air_date).getMonth()]} ${new Date(first_air_date).getFullYear()}`
            : null;

    const type = isMovie ? "movie" : "tv";

    return (
        <Link to={`/${type}/${id}`} className="hover:scale-110 transition">
            <div className="w-[100%] sm:w-[100%] md:w-[100%] lg:w-[100%] inline-block cursor-pointer relative p-2">
                <img className="w-full rounded-lg h-auto block" src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} alt={title || name} />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                    <p className="white-space-normal text-2xl md:text-lg lg:text-xl font-bold flex justify-center items-center h-full text-center">
                        {title || name}<br></br>
                        {formattedDate}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default AudiovisualGrid;