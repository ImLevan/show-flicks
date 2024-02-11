import { TvAndMovieData } from "../utilities/types"
import AudiovisualDescriptionCmp from "./AudiovisualDescriptionCmp";
import AudiovisualProductions from "./AudiovisualProductions";


type Props = {
    audiovisual: TvAndMovieData
}
const AudiovisualInfo: React.FC<Props> = ({audiovisual}) => {
    return (
        <div>
            <AudiovisualDescriptionCmp audiovisual={audiovisual} />
            <AudiovisualProductions audiovisual={audiovisual} />
        </div>
    )
}

export default AudiovisualInfo