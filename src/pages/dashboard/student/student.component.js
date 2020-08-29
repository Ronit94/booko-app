import React from 'react';
import {Switch, withRouter} from 'react-router-dom';
import {RouteWithSubRoutes} from '../../../app/config';





function StudentComponent(props) {
    return (
          <Switch>
              {props.routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
          </Switch>       
      );
}


export default withRouter(StudentComponent)