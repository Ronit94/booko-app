import axios from 'axios';
import {server} from './config';



axios.defaults.baseURL = window.location.hostname ==='localhost'?'http://localhost:3024/api/':"https://booko-app.herokuapp.com/api/";

axios.interceptors.request.use(req=>{
    if(server.authToken!=null){
        req.headers['authorization'] = server.authToken
    }
    return req;
})

axios.interceptors.response.use(res=>{
    res.data.status = res.status
    return res.data;    
})

export default axios;