import Axios from 'axios';

const Api = Axios.create({
    baseURL:'http://192.168.1.2:3333'
});

export default Api;