import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:3001/api/v1/`
});

const fetcher = (url: string) => api.get(url).then(res => res.data);

export {api, fetcher}
