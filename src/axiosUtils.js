import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://api.cognitive.microsofttranslator.com',
});

export default axiosInstance;
