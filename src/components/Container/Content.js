import React from "react";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    content: {
        flexGrow: 1,
        overflow: "auto",
        padding: theme.spacing(2),

        // [theme.breakpoints.up("sm")]: {
        //     width: `calc(100% - ${drawerWidth}px)`,
        //     marginLeft: drawerWidth,
        // },
    },

    toolbar: {
        // display: "flex",
        alignItems: "center",
        // justifyContent: "flex-end",
        paddingTop: theme.spacing(3),
        padding: theme.spacing(0, 1),
        position: "relative",
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(4),
    },
}));

function Content({ children }) {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <Container maxWidth="xl" className={classes.toolbar}>
                {children}
            </Container>
        </main>
    );
}

export default Content;
