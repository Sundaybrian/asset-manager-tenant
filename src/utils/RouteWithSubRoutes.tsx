import React from 'react';
import { Route, withRouter } from 'react-router-dom';

function RouteWithSubRoutes(route) {
  return <Route path={route.path} render={(props) => <route.component {...props} routes={route.routes} />} />;
}

export default withRouter(RouteWithSubRoutes);
