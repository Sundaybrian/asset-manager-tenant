import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRouteWithSubRoutes = ({ route, authenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                !authenticated ? (
                    <Redirect to="/login" />
                ) : (
                    <route.component
                        {...props}
                        routes={route.routes}
                        key={props.key}
                    />
                )
            }
        />
    );
};

const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(withRouter(PrivateRouteWithSubRoutes));
