import axios, { AxiosInstance } from "axios";

const pokeApi: AxiosInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
});


export default pokeApi;