import { Collections, TvAndMovieResult } from "../utilities/types"
import GeneralRow from "./GeneralRow"

interface Props {
    collection: Collections
    movies: TvAndMovieResult[]
}

const AudiovisualCollection: React.FC<Props> = ({collection, movies}) => {

    return (
        <section className="my-10 sm:my-16 relative h-full min-h-[700px] sm:h-[800px] lg:h-[96vh] xl:h-screen flex flex-col">
            <figure className="absolute -z-10 before:w-full before:h-full before:absolute before:inset-0 before:bg-gradient-to-t before:from-transparent before:from-10% before:to-black/70 sm:before:bg-gradient-to-tl sm:before:to-black/80 sm:before:from-0% w-full h-full bottom-0">
                <img className="2xl:block object-cover h-full w-full object-top" src={`https://image.tmdb.org/t/p/original/${collection?.parts?.[0]?.backdrop_path}`} alt={collection?.name} loading="lazy" width="1920" height="1080" decoding="async" />
            </figure>
            <div className="justify-between ml-8 relative z-10 p-6 md:p-10 lg:p-12 2xl:px-16 2xl:py-12 gap-4 flex flex-1">
                <div className="flex flex-col ">
                    <div className="mb-4 max-w-xl text-gray-200 text-base">
                        <strong>{collection?.name?.toUpperCase()}</strong>
                    </div>
                    <div className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold uppercase max-w-xl">
                        <span>20 YEARS OF MOVIE MAGIC</span>
                        <h2 className="my-4 [text-wrap:wrap]">HARRY POTTER</h2>
                    </div>
                    <p className="text-white max-w-xs sm:max-w-md line-clamp-6">{collection?.overview}</p>
                </div>
                <img className="object-cover h-[320px] w-[180px]" src={`https://image.tmdb.org/t/p/original/${collection?.poster_path}`} alt={collection?.name} />
            </div>
            <div className="px-4 md:px-40">
                <GeneralRow rowID='5' movies={movies} />
            </div>
        </section>
    )
}

export default AudiovisualCollection