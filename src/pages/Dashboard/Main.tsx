import React, { Component } from "react";
import { Route } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { withRouter } from "react-router-dom";
import Content from "../../Container/Content";
import { logoutUser } from "../../../Redux/Actions/authActions";
import store from "../../../Redux/store";

const styles = (theme) =>
    createStyles({
        toolbar: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    });

/* eslint-disable no-useless-constructor */

export class Main extends Component {
    constructor(props) {
        super(props);
    }

    goHome = () => {
        this.props.history.push(
            `${this.props.matchPath}/${this.props.routes[1].path}`
        );
    };

    componentDidMount() {
        // redirect to the first available link
        // if (this.props.location.pathname === this.props.matchPath) {
        this.goHome();
        // }
    }

    render() {
        const { matchPath, authenticated } = this.props;
        return (
            <Content>
                <Route
                    path={`${matchPath}/:id`}
                    render={(props) => {
                        // not authenticated,we kick user out
                        if (!authenticated) {
                            store.dispatch(logoutUser());

                            return;
                        }

                        let goToPage = this.props.routes.find((p) => {
                            return p.text === props.match.params.id;
                        });

                        return (
                            <goToPage.component
                                routes={
                                    // sending routes thru, will be useful for containers
                                    goToPage.routes !== null
                                        ? goToPage.routes
                                        : []
                                }
                                {...props}
                            />
                        );
                    }}
                />
            </Content>
        );
    }
}

export default withRouter(withStyles(styles)(Main));
