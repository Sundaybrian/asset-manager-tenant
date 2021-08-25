import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import PrivateRoute from '../../utils/PrivateRoute';
import { dispatchStore } from '../../redux/store';
import { logoutUser } from '../../redux/Actions/authActions';
import { SET_AUTHENTICATED } from '../../redux/types';
// MUi stuff
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useTheme } from '../../theme/theme';
import Alert from '../../components/Base/Alert';
import { defaultRoutes } from '../../routes';
import axios from 'axios';
import config from '../../config';
import Dashboard from '../../pages/Dashboard/Dashboard';

// decidin on the backend service to use
axios.defaults.baseURL = config.BACKEND_SERVICE;

function App() {
  /* eslint-disable no-unused-vars */

  React.useEffect(() => {
    // checking for jwt
    const jwtToken = localStorage.getItem('token');

    /*eslint-disable eqeqeq */
    if (jwtToken == 'Bearer undefined' || null || 'undefined') return;
    if (jwtToken) {
      const decodeToken: any = jwtDecode(localStorage.token);
      if (decodeToken.exp * 1000 < Date.now()) {
        dispatchStore(logoutUser());
      } else {
        dispatchStore({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = localStorage.token;
      }
    } else {
      console.log('yaaaap');
      localStorage.clear();
      return;
    }
  });

  const [currentTheme, setCurrentTheme] = useTheme();
  return (
    <ThemeProvider theme={currentTheme}>
      <Alert />
      <Switch>
        {defaultRoutes.map((route, index) => (
          <Route key={index} path={route.path} component={route.component} />
        ))}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
      </Switch>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
