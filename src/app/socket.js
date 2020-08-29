import socketIOClient from "socket.io-client";

const endPoint = window.location.hostname ==='localhost'?'http://localhost:3024':"https://booko-app.herokuapp.com";

const socket = socketIOClient(endPoint);


export {socket}