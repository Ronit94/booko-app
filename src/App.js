import React from 'react';
import {routes,Auth} from './app/config';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import PageNotFoundComponent from './pages/exceptions/pagenotfound.component'
import decode from 'jwt-decode';
import './App.css';


function App() {
  if(!isTokenExpired()){
    Auth.isAuthenticated = true
  }
  return (
    <Router>
        <Switch>
        <Route exact path='/' render={() => (
						Auth.isAuthenticated ? 
								(<Redirect to="/dashboard/analytics" />) : 
								(<Redirect to="/login" />)
					)} />

          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
          <Route component={PageNotFoundComponent}/>
        </Switch>
    </Router>
  );
}

function RouteWithSubRoutes(route) {   
  return (
    <Route
       path={route.path}
      render={({props}) => (
        route.auth ? Auth.isAuthenticated ?  ( <route.component {...props} routes={route.routes} />) :  (<Redirect to="/login"/>) : !Auth.isAuthenticated ? 
        ( <route.component {...props} routes={route.routes} />) : (<Redirect to="/dashboard/analytics" />)
      )}
    />
  );
}

function isTokenExpired(){
  try{
    let token = JSON.parse(localStorage.getItem('authToken'))
    const decoded = decode(token.token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    }
    else
      return false;
  }catch(error){
    return true
  }
}

export default App;
