import axios from 'axios';
const instance = axios.create({
    baseURL:  "use-own-api-endpoint"
});
// Where you would set stuff like your 'Authorization' header, etc ...
//axios.defaults.headers.post['Content-Type'] = 'application/json';
export default instance;