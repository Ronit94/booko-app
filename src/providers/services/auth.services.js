import decode from 'jwt-decode';
import {Auth} from '../../app/config';
import firebase from '../../app/firebase';


export const AuthService = {
  setAuthToken : (token)=>{
    return new Promise((resolve,reject)=>{
      localStorage.setItem('authToken',token)
      Auth.isAuthenticated = true
      resolve(true)
    })
  },
  getAuthToken : ()=>{
    return JSON.parse(localStorage.getItem('authToken')).token
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
  },
  fileUpload : (file,path)=>{
    return new Promise((resolve,reject)=>{
      var storageRef = firebase.storage().ref()
      storageRef.child(path).put(file)
      .then(snapshot => {
          snapshot.ref.getDownloadURL().then((url)=>{
            resolve(url)
          })
      })
      .catch((error)=>{
        reject(error)
      })
    })
  }

  
}