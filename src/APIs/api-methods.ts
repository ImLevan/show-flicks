import axios from "axios"
import requests from "../utilities/Requests"
import { Collections, Genre, TvAndMovieData, TvAndMovieResult, Welcome } from "../utilities/types";

export async function popularRequest(page: number): Promise<TvAndMovieResult[]> {
    const response = (await axios.get(requests.requestPopular.replace('{page}', page.toString()))).data as Welcome
    return response.results
}

export async function collectionRequest(collectionID: string): Promise<Collections> {
    const response = (await axios.get(requests.requestCollections.replace('{collection_id}', collectionID))).data as Collections
    return response
}

export async function anyRequest(requestURL: string, page: number): Promise<TvAndMovieResult[]> {
    const response = (await axios.get(requestURL.replace('{page}', page.toString()))).data as Welcome
    return response.results
}

export async function getAudiovisual(id: string, audiovisual: string) {
    try{
        const requestURL = requests.requestSpecific.replace('{audiovisual}/{audiovisual_id}', audiovisual + '/' + id)
        const response = (await axios.get(requestURL)).data as TvAndMovieData
        return response
    }catch(error){
        console.error("Error fetching movie:", error);
    }
}

export const handleSearch = async (searchQuery: string, page: number, audiovisual: string) => {
    try {
        let requestURL = requests.requestQuery.replace('{audiovisual_title}&page={page}', searchQuery + '&page=' + page)
        requestURL = requestURL.replace('{audiovisual}', audiovisual)
        const response = (await axios.get(requestURL)).data as Welcome
        const data = response.results as TvAndMovieResult[]
        return data
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
};

export const getGenres = async (audiovisual: string) => {
    try {
        const response = (await axios.get(requests.requestGenres.replace('{audiovisual}', audiovisual))).data.genres as Genre[]
        return response
    } catch (error) {
        console.error("Error fetching genres:", error);
    }
}

