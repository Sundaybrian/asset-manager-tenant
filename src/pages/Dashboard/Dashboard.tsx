import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Main from "./Main";
import AppBarAndDrawer from "../../Container/AppBar";
import getDashboardRoutes from "../../../Utils/helpers";
import { connect } from "react-redux";
import { logoutUser } from "../../../Redux/Actions/authActions";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: "",
    },
}));

function Dashboard(props) {
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

Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    authenticated: state.auth.authenticated,
    auth: state.firebase.auth,
});

const mapActionsToProps = {
    logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
