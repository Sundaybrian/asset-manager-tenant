import React, { useEffect } from "react";
import * as Yup from "yup";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

//mui stuff
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme } from '@material-ui/core/styles';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

// components
import Copyright from '../../../components/Base/Copyright';
import UploadButton from "../../../components/Base/UploadButton";
import useImageHandler from "../../../hooks/useImageHandler";
import ProgressBar from "../../../components/Base/ProgressBarImages";

// redux
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/Actions/authActions";
import { RootState } from "../../../redux/Reducers/rootReducer";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: "100vh",
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    image: {
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "dark"
                ? theme.palette.grey[900]
                : theme.palette.grey[50],
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        paddingTop: "40px",
    },
    paper: {
        margin: theme.spacing(8, 8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    imageUrl: {
        height: "80px",
        width: "80px",
        margin: theme.spacing(1),
        // backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    progress: {
        position: "absolute",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const validationSchemaTenant = Yup.object({
    firstName: Yup.string().required("firstName is required"),
    lastName: Yup.string().required("lastName is required"),
    phoneNumber: Yup.string()
        .min(10, "must be atleast 10 characters")
        .max(15, "must not exceed 15 characters")
        .required(" Phone Number is required"),
    email: Yup.string().email("invalid email address").required(),
    password: Yup.string()
        .min(8)
        .max(200)
        .matches(/[^A-Za-z0-9]/, "password must contain a special character")
        .matches(/[A-Z]/, "password must contain an uppercase letter")
        .matches(/[a-z]/, "password must contain a lowercase letter")
        .matches(/[0-9]/, "password must contain a number")
        .required(),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
    ),
});


 interface IProps {
     history: any;
    
}

const Register:React.FC<IProps> = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const loading= useSelector((state:RootState) => state.ui.loading)
    const authenticated= useSelector((state:RootState) => state.auth.authenticated)


    const [values, setValues] = React.useState({
        showPassword: false,
    });


    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    

    const { file, setFile, imageUrl, setImageUrl, imageChangeHandler } =
        useImageHandler({ accept: false });

    useEffect(() => {
        if (authenticated) {
            props.history.push("/dashboard");
        }
    }, [authenticated, props.history]);

    const handleSubmit = (values, actions) => {
        const { firstName, lastName, email, phoneNumber, password } = values;

        const user = {
            first_name: firstName,
            last_name: lastName,
            email,
            phone_number: phoneNumber,
            password,
            image_url:
                imageUrl == null
                    ? "https://i.pinimg.com/originals/c1/94/c7/c194c7141911512614e8418c8be92f33.jpg"
                    : imageUrl,
        };

        dispatch(registerUser(user, props.history, actions));
        setImageUrl(null);
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid container justify="center" className={classes.image}>
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    direction="row"
                    elevation={6}
                    square
                >
                    <Grid className={classes.paper}>
                        {imageUrl ? (
                            <Avatar
                                className={classes.imageUrl}
                                src={imageUrl}
                            />
                        ) : (
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                        )}
                        <Typography component="h1" variant="h5">
                            Create Tenant Account
                        </Typography>

                        <Formik
                            initialValues={{
                                firstName: "",
                                lastName: "",
                                email: "",
                                phoneNumber: "",
                                password: "",
                                confirmPassword: "",
                            }}
                            validationSchema={validationSchemaTenant}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <Field
                                    name="firstName"
                                    type="text"
                                    label="First Name"
                                    variant="outlined"
                                    component={TextField}
                                    fullWidth
                                />

                                <Field
                                    name="lastName"
                                    type="text"
                                    label="Last Name"
                                    variant="outlined"
                                    component={TextField}
                                    fullWidth
                                />

                                <Field
                                    name="phoneNumber"
                                    type="text"
                                    label="PhoneNumber"
                                    variant="outlined"
                                    component={TextField}
                                    fullWidth
                                    placeholder="254 *** *** ***"
                                />

                                <Field
                                    variant="outlined"
                                    component={TextField}
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />

                                <Field
                                    variant="outlined"
                                    component={TextField}
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type={
                                        values.showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                >
                                                    {values.showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Field
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    component={TextField}
                                    variant="outlined"
                                    fullWidth
                                    type={
                                        values.showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                >
                                                    {values.showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                {file == null && (
                                    <UploadButton
                                        imageChangeHandler={imageChangeHandler}
                                        title={
                                            file == null
                                                ? "Upload Profile Image"
                                                : "Profile Image Uploaded Successfully"
                                        }
                                    />
                                )}

                                {file && (
                                    <ProgressBar
                                        file={file}
                                        setFile={setFile}
                                        setImageUrl={setImageUrl}
                                    />
                                )}

                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                    className={classes.submit}
                                    type="submit"
                                >
                                    Create Account
                                    {loading && (
                                        <CircularProgress
                                            size={30}
                                            className={classes.progress}
                                        />
                                    )}
                                </Button>
                            </Form>
                        </Formik>

                        <Grid container>
                            <Grid item xs>
                                <Link to="/forgot-password">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/login">
                                    {"Already have an account? Log in"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};



export default Register;
