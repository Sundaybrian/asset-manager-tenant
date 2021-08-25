import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, user, auth, ...rest }) => {
  return <Route {...rest} render={(props) => (!auth.uid ? <Redirect to="/login" /> : <Component {...props} />)} />;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  auth: state.firebase.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
