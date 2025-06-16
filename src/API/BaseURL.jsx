import axios from 'axios'

const base = axios.create({
     baseURL: 'https://api.coingecko.com/api/v3/coins'
});
export default function BaseURL(params) {
     return base.get(params);
}
