import { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
// import { deepPurple, pink } from "@material-ui/core/colors";

const defaultTheme = {
    palette: {
        secondary: {
            light: "#ff8733",
            main: "#ff6900",
            dark: "#b24900",
            contrastText: "#000",
        },
        primary: {
            light: "#33496b",
            main: "#4E0D3A",
            dark: "#310021",
            contrastText: "#fff",
        },
    },
    typography: {
        fontFamily: "'Roboto',san-serif, cursive;",
    },
    status: {
        danger: "orange",
    },
};

export function useTheme() {
    const [currentTheme, setCurrentTheme] = useState({
        palette: {
            secondary: {
                light: "#ff8733",
                main: "#ff6900",
                dark: "#b24900",
                contrastText: "#000",
            },
            primary: {
                light: "#33496b",
                main: "#4E0D3A",
                dark: "#310021",
                contrastText: "#fff",
            },
        },
    });
    const muiTheme = createMuiTheme({
        ...defaultTheme,
        ...currentTheme,
    });
    return [muiTheme, setCurrentTheme];
}
