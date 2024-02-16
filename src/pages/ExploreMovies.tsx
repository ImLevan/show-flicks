import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { anyRequest, handleSearch, popularRequest } from "../APIs/api-methods"
import InfiniteScroll from 'react-infinite-scroll-component'
import requests from "../utilities/Requests"
import AudiovisualGrid from "../components/AudiovisualGrid"
import { TvAndMovieResult } from "../utilities/types"

const ExploreMovies: React.FC = () => {
    const { audiovisual } = useParams()
    const [searchParams] = useSearchParams()
    const q = searchParams.get('q')
    const filter = searchParams.get('filter')
    const isMovie = audiovisual === 'movies'
    const [media, setMedia] = useState([] as TvAndMovieResult[])
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate()

    //usar el "filter" y el "audiovisual" para hacer la peticion segun lo que se pida y el filtro que se mande
    //Voy a usar los useEffect para cargar las peliculas

    useEffect(() => {
        if (audiovisual && audiovisual !== 'movies' && audiovisual !== 'tv') {
            navigate('/notfound') // Redirigir al usuario a la ruta de not-found si audiovisual no es "movies" ni "tv"
        }
    }, [audiovisual, navigate, q]);

    useEffect(() => {
        const fetchData = async () => {
            let response;
            if (q) {
                if (audiovisual === 'tv') {
                    response = await handleSearch(q, 1, 'tv');
                } else {
                    response = await handleSearch(q, 1, 'movie');
                }
            } else {
                if (audiovisual === 'tv') {
                    if(filter){
                        switch (filter){
                            case 'popular':
                                response = await anyRequest(requests.requestTvPopular, 1);
                                break;
                            case 'top_rated':
                                response = await anyRequest(requests.requestTvTopRated, 1);
                                break;                         
                            default:
                                response = await anyRequest(requests.requestTvPopular, 1);
                                break;
                        }
                    }else{
                        response = await anyRequest(requests.requestTvPopular, 1);
                    }
                } else {
                    if(filter){
                        switch (filter){
                            case 'popular':
                                response = await popularRequest(1);
                                break;
                            case 'top_rated':
                                response = await anyRequest(requests.requestTopRated, 1);
                                break; 
                            case 'upcoming':
                                response = await anyRequest(requests.requestUpcoming, 1);
                                break                       
                            default:
                                response = await popularRequest(1);
                                break;
                        }
                    }else{
                        response = await popularRequest(1);
                    }
                }
            }
            if (response) {
                setMedia(response);
            }
        };

        fetchData();
    }, [audiovisual, filter, q]);

    // const loadMoreMovies = async () => {
    //     const nextPage = currentPage + 1;
    //     const response = q
    //         ? audiovisual === 'tv'
    //             ? await handleSearch(q, nextPage, 'tv')
    //             : await handleSearch(q, nextPage, 'movie')
    //         : audiovisual === 'tv'
    //             ? await anyRequest(requests.requestTvPopular, nextPage)
    //             : await popularRequest(nextPage);
    //     if (response) {
    //         setMedia(prevMovies => [...prevMovies, ...response]);
    //         setCurrentPage(nextPage);
    //     }
    // };

    const loadMoreMovies = async () => {
        const nextPage = currentPage + 1;
        let response: TvAndMovieResult[] | undefined;
        if (q) {
            if (audiovisual === 'tv') {
                response = await handleSearch(q, nextPage, 'tv');
            } else {
                response = await handleSearch(q, nextPage, 'movie');
            }
        } else {
            if (audiovisual === 'tv') {
                if(filter){
                    switch (filter){
                        case 'popular':
                            response = await anyRequest(requests.requestTvPopular, nextPage);
                            break;
                        case 'top_rated':
                            response = await anyRequest(requests.requestTvTopRated, nextPage);
                            break;                         
                        default:
                            response = await anyRequest(requests.requestTvPopular, nextPage);
                            break;
                    }
                }else{
                    response = await anyRequest(requests.requestTvPopular, nextPage);
                }
            } else {
                if(filter){
                    switch (filter){
                        case 'popular':
                            response = await popularRequest(nextPage);
                            break;
                        case 'top_rated':
                            response = await anyRequest(requests.requestTopRated, nextPage);
                            break; 
                        case 'upcoming':
                            response = await anyRequest(requests.requestUpcoming, nextPage);
                            break                       
                        default:
                            response = await popularRequest(nextPage);
                            break;
                    }
                }else{
                    response = await popularRequest(nextPage);
                }
            }
        }
        if (response) {
            setMedia(prevMovies => [...prevMovies, ...(response as TvAndMovieResult[])]);
            setCurrentPage(nextPage);
        }
    };


    return (
        <div>
            <InfiniteScroll
                dataLength={media.length} // Longitud actual de la lista de películas
                next={loadMoreMovies} // Función a llamar para cargar más películas
                hasMore={true} // Indica si hay más elementos para cargar
                loader={<h4>Loading...</h4>} // Componente que se muestra mientras se cargan más películas
                endMessage={<p>No hay más películas</p>} // Mensaje al llegar al final de la lista
                scrollThreshold={0.9} // Porcentaje de la altura de la ventana para activar la carga
            >
                <header className="px-5 md:px-8 lg:px-12 2xl:px-16 text-center mb-10 mt-[60px] pt-8">
                    <h2 className="uppercase text-3xl font-semibold text-white">Explore</h2>
                    <p className="text-base text-gray-300 mt-4">Explore and discover new movies or series. Search your favorite movie.</p>
                </header>
                <main className="px-5 md:px-8 lg:px-12 2xl:px-16 min-h-screen bg-[#0a0a0a] pb-20">
                    <header className="text-center py-10">
                        <h3 className="uppercase text-lg text-gray-400">All {audiovisual === 'movies' ? audiovisual : audiovisual + ' shows'} currently available</h3>
                    </header>
                    <section className="flex flex-col gap-10 md:grid md:gap-x-2 md:gap-y-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-9 lg:gap-x-4 xl:grid-cols-4">
                        {media.map((media: TvAndMovieResult, id: number) => (
                            <AudiovisualGrid key={id} audiovisual={media} isMovie={isMovie} />
                        ))}
                    </section>
                </main>
            </InfiniteScroll>
        </div>
    )
}

export default ExploreMovies