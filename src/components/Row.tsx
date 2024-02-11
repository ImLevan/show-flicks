import { useEffect, useState } from "react"
import { anyRequest } from "../APIs/api-methods"
import { TvAndMovieResult } from "../utilities/types"
import GeneralRow from "./GeneralRow"

type Props = {
    title: string
    fetchURL: string
    rowID: string
}

const Row: React.FC<Props> = ({title, fetchURL, rowID}) => {
    const [movies, setMovies] = useState([] as TvAndMovieResult[])

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await anyRequest(fetchURL, 1)
            setMovies(response)
        }
        fetchMovies()
    }, [fetchURL])

    return (
        <>
            <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
            <GeneralRow rowID={rowID} movies={movies} />
        </>
    )
}

export default Row