import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../redux/Reducers/rootReducer';

const PrivateRoute = ({ component: Component, user, auth, ...rest }) => {
  return <Route {...rest} render={(props) => (!auth? <Redirect to="/login" /> : <Component {...props} />)} />;
};

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  auth: state.auth.authenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
