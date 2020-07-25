import axios from 'axios';
import {server} from './config';
import {message} from 'antd';


axios.defaults.baseURL = window.location.hostname ==='localhost'?'http://localhost:3024/api/':"https://booko-app.herokuapp.com/api/";

axios.interceptors.request.use(req=>{
    if(server.authToken!=null){
        req.headers['authorization'] = server.authToken
    }
    return req;
})

axios.interceptors.response.use(res=>{
    if(res.status===401){
        message.warn(res.message)
    }
    res.data.status = res.status
    return res.data;    
})

export default axios;