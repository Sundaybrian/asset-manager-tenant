import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Main from './Main';
import AppBarAndDrawer from '../../components/Container/AppBar';
import getDashboardRoutes from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/Actions/authActions';
import { RootState } from '../../redux/Reducers/rootReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '',
  },
}));

interface IProps {
  user: any;
  match: any;
  auth: any;
  logoutUser: () => void;
}

const Dashboard = (props) => {
  /* eslint-disable no-unused-vars */
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    match: { path },
  } = props;

  const user = useSelector((state: RootState) => state.auth.user);
  const authenticated = useSelector((state: RootState) => state.auth.authenticated);

  if (!authenticated) {
    dispatch(logoutUser());
    return false;
  }

  return (
    <div className={classes.root}>
      <>
        <AppBarAndDrawer routes={getDashboardRoutes('merchant')} matchPath={path} />
        <Main routes={getDashboardRoutes('merchant')} matchPath={path} authenticated={authenticated} user={user} />
      </>
    </div>
  );
};

export default Dashboard;
