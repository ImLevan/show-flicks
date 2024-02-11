const key = import .meta.env.VITE_API_KEY

interface Requests {
    requestPopular: string
    requestTopRated: string
    requestTrending: string
    requestQuery: string
    requestUpcoming: string
    requestSpecific: string
    requestTvPopular: string
    requestTvTopRated: string
    requestGenres: string
    requestCollections: string
}

const requests: Requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page={page}`,
    requestTvPopular: `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page={page}`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page={page}`,
    requestTvTopRated: `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page={page}`,
    requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
    requestQuery: `https://api.themoviedb.org/3/search/{audiovisual}?api_key=${key}&language=en-US&query={audiovisual_title}&page={page}&include_adult=false`,
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page={page}`,
    requestSpecific: `https://api.themoviedb.org/3/{audiovisual}/{audiovisual_id}?&append_to_response=videos&api_key=${key}&language=en-US`, // Use {movie_id} as a placeholder for the movie ID
    requestGenres: `https://api.themoviedb.org/3/genre/{audiovisual}/list?api_key=${key}`,
    requestCollections: `https://api.themoviedb.org/3/collection/{collection_id}&?language=en-US&api_key=${key}`
};  

export default requests