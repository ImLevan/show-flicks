import { useState } from "react";
import { TvAndMovieData, VideosResult } from "../utilities/types";
import VideoModal from "./VideoModal";

interface Props {
    audiovisual: TvAndMovieData
}

const AudiovisualDescriptionCmp: React.FC<Props> = ({audiovisual}) => {
    const [showFullText, setShowFullText] = useState(false);
    const year = audiovisual?.first_air_date ? `Start in ${new Date(audiovisual.first_air_date).getFullYear()}` : new Date(audiovisual.release_date).getFullYear()
    const seasonsOrHours = audiovisual?.number_of_seasons ? `${audiovisual.number_of_seasons} seasons ${audiovisual.number_of_episodes} episodes` : formatRuntime(audiovisual?.runtime)
    
    function formatRuntime(minutes: number): string {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        const formattedRuntime = `${hours}h ${remainingMinutes}min`;
        return formattedRuntime;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    function getTrailerID(videos: VideosResult[]): string {
        const trailer = videos.find(video => video.type === 'Trailer');
        if (trailer) {
            return trailer.key;
        }
        return videos[0].key;
    }
    
    return (
        <div className="my-10 ml-4 md:flex gap-x-20">
            <div>
                <img className="rounded" src={`https://image.tmdb.org/t/p/original/${audiovisual?.poster_path}`} width="180" height="270" alt={audiovisual?.title || audiovisual?.name} />
                <div className="flex">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-star-filled text-red-600 mt-3 mr-2"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                        />
                        <path
                            d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
                            strokeWidth="0"
                            fill="currentColor"
                        />
                    </svg>
                    <p className="mt-2 text-2xl md:text-2xl font-bold">{audiovisual?.vote_average?.toFixed(1)} <span className="text-gray-400 text-base">/10</span></p>
                </div>
            </div>
            <div className=" lg:w-[30%] xl:w-[50%]">
                <div className="flex gap-20">
                    <h1 className="text-3xl md:text-3xl font-bold">{audiovisual?.title || audiovisual?.name}</h1>
                </div>
                <div className="flex space-x-3 ">
                    <p className="text-gray-400 text-xl mt-4">{year ? year : null}</p>
                    {audiovisual?.adult ? (
                        <img className="w-14 h-7 mt-4 border border-gray-400" src="/Nc-17.svg" alt="18+" />
                    ) : (
                        <img className="w-7 h-7 mt-4" src="/RATED_G.svg" alt="ATP" />
                    )}
                    <p className="text-gray-400 text-xl mt-4">{seasonsOrHours}</p>
                </div>
                <div className="flex gap-4">
                    {audiovisual?.genres?.[0] &&
                        <p className="text-neutral-900 xl:text-xl mt-4 bg-gray-300 px-2 rounded">{audiovisual?.genres?.[0]?.name}</p>
                    }
                    {audiovisual?.genres?.[1] &&
                        <p className="text-neutral-900 xl:text-xl mt-4 bg-gray-300 px-2 rounded">{audiovisual?.genres?.[1]?.name}</p>
                    }
                </div>
                {audiovisual?.videos?.results?.length > 0 &&
                    <button
                        onClick={toggleModal}
                        className="my-8 px-8 z-30 py-4 bg-red-500 rounded-md text-white relative font-semibold font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-red-600 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#be123c;] hover:[text-shadow:2px_2px_2px_#fda4af] text-2xl"
                    >
                        Watch trailer
                    </button>
                }
            </div>
            <div className="w-full pr-4 md:w-[70%] lg:w-[40%] xl:w-[30%]">
                <h3 className="text-gray-200 text-xl">{audiovisual?.tagline?.toUpperCase()}</h3>
                <p className={`max-w-lg text-gray-400 ${showFullText ? '' : 'line-clamp-5'}`}>
                    {audiovisual?.overview}
                </p>
                <button onClick={() => setShowFullText(!showFullText)}>
                    {showFullText ? 'show less' : 'show more'}
                </button>
            </div>
            {isModalOpen && <VideoModal url_id={getTrailerID(audiovisual?.videos?.results)} onRequestClose={toggleModal} />}
        </div>
    )
}

export default AudiovisualDescriptionCmp