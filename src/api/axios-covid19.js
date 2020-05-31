import axios from 'axios';

const instance = axios.create({
    baseURL:'https://api.covid19india.org/'
});

export default instance;