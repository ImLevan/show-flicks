import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import MovieCmp from "./MovieCmp"
import { TvAndMovieResult } from "../utilities/types"

type Props = {
    rowID: string
    movies: TvAndMovieResult[]
}

const GeneralRow: React.FC<Props> = ({ rowID, movies}) => {
    const sliderLeft = () => {
        const slider = document.getElementById('slider' + rowID)!
        slider.scrollLeft = slider.scrollLeft - 500
    }

    const sliderRight = () => {
        const slider = document.getElementById('slider' + rowID)!
        slider.scrollLeft = slider.scrollLeft + 500
    }

    return (
        <div className="relative flex items-center group mb-24 ">
            <MdChevronLeft
                onClick={sliderLeft}
                className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                size={40}
            />
            <div id={'slider' + rowID} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
                {movies?.map((movie: TvAndMovieResult, id: number) => (
                    <MovieCmp key={id} movie={movie} />
                ))}
            </div>
            <MdChevronRight
                onClick={sliderRight}
                className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                size={40}
            />
        </div>
    )
}

export default GeneralRow