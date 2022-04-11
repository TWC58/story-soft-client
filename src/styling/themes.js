import { createTheme, responsiveFontSizes } from '@mui/material/styles'

export const storyTheme = responsiveFontSizes(createTheme({
    palette: {
        primary: {                
            light: '#a5a6f6',
            main: '#7878f1',
            dark: '#331bd8'
        },
        secondary: {
            light: '#ffab6c',
            main: '#ff9647',
            dark: '#d84f00'
        }
    },
    components: {
        div: {
            p: 100
        }
    }
}));

export const comicTheme = responsiveFontSizes(createTheme({
    palette: {
        primary: {                
            light: '#ffab6c',
            main: '#ff9647',
            dark: '#d84f00'
        },
        secondary: {
            light: '#a5a6f6',
            main: '#7878f1',
            dark: '#331bd8'
        }
    }
}));