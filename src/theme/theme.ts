import { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
// import { deepPurple, pink } from "@material-ui/core/colors";

const defaultTheme = {
  palette: {
    secondary: {
      light: '#ff8733',
      main: '#ff6900',
      dark: '#b24900',
      contrastText: '#000',
    },
    primary: {
      light: '#7986cb',
      main: '#3f51b5',
      dark: '#303f9f',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: "'Roboto',san-serif, cursive;",
  },
  status: {
    danger: 'orange',
  },
};

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState({
    palette: {
      secondary: {
        light: '#ff8733',
        main: '#ff6900',
        dark: '#b24900',
        contrastText: '#000',
      },
      primary: {
        light: '#7986cb',
        main: '#3f51b5',
        dark: '#303f9f',
        contrastText: '#fff',
      },
    },
  });
  const muiTheme = createMuiTheme({
    ...defaultTheme,
    ...currentTheme,
  });
  return [muiTheme, setCurrentTheme];
}
