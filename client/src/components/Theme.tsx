import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

declare module "@material-ui/core/styles/createPalette" {
    interface Palette {
      neutral: Palette['text'];
      accent: Palette['primary'];
      accent2: Palette['primary'];
    }
    interface PaletteOptions {
      neutral: PaletteOptions['text'];
      accent: PaletteOptions['primary'];
      accent2: PaletteOptions['primary'];
    }
}

const themes = createMuiTheme({
        palette: {
            primary: {
              // light: will be calculated from palette.primary.main,
              main: '#A04000',
              // dark: will be calculated from palette.primary.main,
              // contrastText: will be calculated to contrast with palette.primary.main
            },
            secondary: {
              //light: '#13C2D7',
              main: '#F58F00',
              // dark: will be calculated from palette.secondary.main,
              //contrastText: '#13C2D7',
            },
            accent: {
              main : "#F58F00",
            },

            accent2: {
              main: "#F58F00",
            },

            neutral: {
                disabled: '#FFFAFA',
                primary: "#373945",
                hint: 'rgba(55,57,69,.7)',
                secondary: "#F5F0F5",
            },

            // Used by `getContrastText()` to maximize the contrast between
            // the background and the text.
            contrastThreshold: 3,
            // Used by the functions below to shift a color's luminance by approximately
            // two indexes within its tonal palette.
            // E.g., shift from Red 500 to Red 300 or Red 700.
            tonalOffset: 0.2,
    },
    overrides: {
        MuiAppBar: {
            
        },
    }
});

const Theme = (props: { children?: React.ReactNode }) => {
    return (
        <ThemeProvider theme={themes}>
            {props.children}
        </ThemeProvider> 
    );
}
export default Theme;