import { Link } from "react-router-dom"
import Main from "../components/Main"
import Row from "../components/Row"
import requests from "../utilities/Requests"
import { Collections, TvAndMovieResult } from "../utilities/types"
import { useEffect, useState } from "react"
import { collectionRequest } from "../APIs/api-methods"
import AudiovisualCollection from "../components/AudiovisualCollection"

const Home = () => {
    const [hpCollection, setHPCollection] = useState({} as Collections)
    const hpMovies: TvAndMovieResult[] = hpCollection?.parts
    useEffect(() => {
        const fetchCollections = async () => {
            const response = (await collectionRequest('1241'))
            setHPCollection(response)
        }
        fetchCollections()
    }, [])

    return (
        <>
            <Main />
            <section className="px-4 md:px-20">
                <Row rowID = '1' title='Upcoming' fetchURL = {requests.requestUpcoming.replace('{page}', '1')} />
                <Row rowID = '2' title='Popular' fetchURL = {requests.requestPopular.replace('{page}', '1')} />
                <Row rowID = '3' title='Trending' fetchURL = {requests.requestTrending} />
                <Row rowID = '4' title='Top Rated' fetchURL = {requests.requestTopRated.replace('{page}', '1')} />
            </section>
            <AudiovisualCollection collection={hpCollection} movies={hpMovies}/>
            <Link to="/search/" className="flex m-auto w-32 h-14 mb-8">
                <button className="w-32 h-14 text-center flex m-auto border bg-gray-300 text-black border-gray-300 py-2 px-5 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all">
                    <p className="text-center m-auto">See All</p>
                </button>
            </Link>
        </>
    )
}

export default Home