import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Main from "./Main";
import AppBarAndDrawer from "../../components/Container/AppBar";
import getDashboardRoutes from "../../utils/helpers";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/Actions/authActions";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: "",
    },
}));

interface IProps {
    user: any,
    match: any,
    auth: any,
    logoutUser: ()=> void
}

const Dashboard:React.FC<IProps> = (props) =>{
    const classes = useStyles();
    /* eslint-disable no-unused-vars */
    const {
        user,
        match: { path },
        auth,
        logoutUser,
    } = props;

    /* eslint-disable eqeqeq*/
    if (!auth.uid) {
        logoutUser();
        return false;
    }

    return (
        <div className={classes.root}>
            <>
                <AppBarAndDrawer
                    routes={getDashboardRoutes("merchant")}
                    matchPath={path}
                />
                <Main
                    routes={getDashboardRoutes("merchant")}
                    matchPath={path}
                    authenticated={auth.uid}
                    user={user}
                />
            </>
        </div>
    );
}


const mapStateToProps = (state) => ({
    user: state.auth.user,
    authenticated: state.auth.authenticated,
    auth: state.firebase.auth,
});

const mapActionsToProps = {
    logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
