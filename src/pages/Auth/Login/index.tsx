import React from 'react';
//mui stuff
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import Copyright from '../../../components/Base/Copyright';
import AppBar from '../AppBar';
// redux
import { connect } from 'react-redux';
import { loginUser } from '../../../redux/Actions/authActions';

const styles = createStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    paddingTop: '35px',
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // color: theme.palette.text.secondary,
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  progress: {
    position: 'absolute',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface IProps {
  auth: {
    authenticated: boolean;
  };
  history: any[];
  ui: {
    loading: boolean;
  };
  loginUser: (userData: Partial<IState>, history: any) => void;
  classes: any;
}

interface IState {
  email: string;
  password: string;
  errors: any;
}

export class Login extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  // making sure user does not return here if authenticated
  componentDidMount() {
    if (this.props.auth.authenticated) {
      this.props.history.push('/dashboard');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLFormElement | HTMLTextAreaElement>) => {
    this.setState((prevState: IState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  render() {
    const {
      classes,
      ui: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container component="main" className={classes.root}>
        <AppBar />
        <CssBaseline />
        <Grid container justify="center" className={classes.image}>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            // direction="row"
            elevation={6}
            square
          >
            <Grid className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  helperText={errors.message}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  helperText={errors.message}
                  error={errors.message ? true : false}
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  className={classes.submit}
                  type="submit"
                >
                  Sign In
                  {loading && <CircularProgress size={30} className={classes.progress} />}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/forgot-password">Forgot password?</Link>
                  </Grid>
                  <Grid item>
                    <Link to="/register">{"Don't have an account? Sign Up"}</Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  ui: state.ui,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));
