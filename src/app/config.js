import LoginComponent from '../pages/login/login.component';
import RegistrationComponent from '../pages/registration/registration.component';
import ForgotPasswordComponent from '../pages/forgot-password/forgot.component';
import DashboardComponent from '../pages/dashboard/dashboard.component';
import AnalyticsComponent from '../pages/dashboard/analytics/analytics.component';
import ProfileComponent from '../pages/dashboard/profile/profile.component';
import SettingsComponent from '../pages/dashboard/settings/settings.component';
import StudentComponent from '../pages/dashboard/student/student.component';


import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import decode from 'jwt-decode';


export const server ={
  url : 'http://localhost:3024/api/',
  authToken : localStorage.getItem('authToken') === null ? null : JSON.parse(localStorage.getItem('authToken')).token
}


export function setConfigToken(){
  if(localStorage.getItem('authToken')){
    server.authToken = localStorage.getItem('authToken') === null ? null : JSON.parse(localStorage.getItem('authToken')).token
  }
}




export const routes = [
    {
      path: "/login",
      component: LoginComponent,
      auth : false
    },
    {
        path: "/signup",
        component: RegistrationComponent,
        auth : false
    },
    {
        path: "/forgot-password",
        component: ForgotPasswordComponent,
        auth : false
    },
    {
      path: "/dashboard",
      component: DashboardComponent,
      auth : true,
      routes: [
        {
          path: "/dashboard/analytics",
          component: AnalyticsComponent,
          auth : true
        },
        {
          path: "/dashboard/profile",
          component: ProfileComponent,
          auth : true
        },
        {
          path: "/dashboard/settings",
          component: SettingsComponent,
          auth : true
        },
        {
          path: "/dashboard/students",
          component : StudentComponent,
          auth : true
        }
      ]
    }
  ];

  export let Auth = {
    isAuthenticated: false,
    authenticate(cb) {
      if(!isTokenExpired()){
        Auth.isAuthenticated = true;
      }else{
        Auth.isAuthenticated = false;
      }

    }
  };

  export function isTokenExpired(){
    let token = JSON.parse(localStorage.getItem('authToken'))
    try {
      const decoded = decode(token.token);
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

  export function RouteWithSubRoutes(route) {   
    return (
      <Route
        path={route.path}
        render={({props}) => (
          Auth.isAuthenticated ?( <route.component {...props} routes={route.routes} />):(<Redirect to="/login"/>)
        )}
      />
    );
}
