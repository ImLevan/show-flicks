import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAudiovisual } from "../APIs/api-methods"
import AudiovisualTrailer from "../components/AudiovisualTrailer";
import { TvAndMovieData } from "../utilities/types";


const SpAudiovisual: React.FC = () => {
    const { id, audiovisual } = useParams()
    const [audiovisualData, setAudiovisualData] = useState({} as TvAndMovieData)
    const navigate = useNavigate()

    useEffect(() => {
        if (audiovisual && audiovisual !== 'movie' && audiovisual !== 'tv') {
            navigate('/notfound')
        }
    }, [audiovisual, navigate]);

    useEffect(() => {
        const fetchMovie = async () => {
            if(id && audiovisual){
                const response = await getAudiovisual(id, audiovisual)
                if(response){
                    setAudiovisualData(response)
                }else{
                    navigate('/notfound')
                }
            }
        }
        fetchMovie()
    }, [audiovisual, id, navigate])

    return (
        <>
            <AudiovisualTrailer audiovisual={audiovisualData} />
        </>
    )
}

export default SpAudiovisual