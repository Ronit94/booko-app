import decode from 'jwt-decode';
import {Auth} from '../../app/config';

export const AuthService = {
  setAuthToken : (token)=>{
    localStorage.setItem('authToken',token)
    Auth.isAuthenticated = true
  },
  getAuthToken : ()=>{
    return localStorage.getItem('authToken')
  },
  deleteAuthToken : ()=>{
    localStorage.removeItem('authToken')
    Auth.isAuthenticated = false
  },
  isTokenExpired : (token)=>{
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
          return true;
      }
      else
          return false;
    }
    catch (err) {
        return false;
    }
  }

  
}