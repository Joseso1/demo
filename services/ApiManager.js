import axios from "axios";

export const ApiManager = axios.create({
baseURL:'http://74.208.32.103/ApiSpl/api',
responseType:'json',
withCredentials:true,
});