import { createTheme, responsiveFontSizes } from '@mui/material/styles'

export const storyTheme = responsiveFontSizes(createTheme({
    palette: {
        primary: {                
            light: '#9ec8e5',
            main: '#3e92cc',
            dark: '#2a528f'
        },
        secondary: {
            light: '#f9c576',
            main: '#f7ac3b',
            dark: '#eb910a'
        }
    },
}));

export const comicTheme = responsiveFontSizes(createTheme({
    palette: {
        primary: {                
            light: '#f9c576',
            main: '#f7ac3b',
            dark: '#eb910a'
        },
        secondary: {
            light: '#9ec8e5',
            main: '#3e92cc',
            dark: '#2a528f'
        }
    }
}));