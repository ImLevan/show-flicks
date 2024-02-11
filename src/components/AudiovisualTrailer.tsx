
import { TvAndMovieData } from "../utilities/types"
import AudiovisualInfo from "./AudiovisualInfo"


type Props = {
    audiovisual: TvAndMovieData
}

const AudiovisualTrailer: React.FC<Props> = ({ audiovisual}) => {
    return (
        <div className="w-full h-full text-white">
            <div className="w-full h-full">
                <div className="h-dvh">
                    <img
                        src={`https://image.tmdb.org/t/p/original/${audiovisual?.backdrop_path}`}
                        className="w-full h-full object-cover"
                        alt={audiovisual?.name || audiovisual?.title}
                    />
                </div>
            </div>
            <AudiovisualInfo audiovisual={audiovisual}/>
        </div>
    )
}

export default AudiovisualTrailer