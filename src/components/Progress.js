import React from 'react';
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Progress () {

    const theme = createTheme({
        palette: {
          primary: {
            light: '#fcdfd8',
            main: '#c9ada7',
            dark: '#987e78',
            contrastText: '#22223B',
          },
          secondary: {
            light: '#cbbcc9',
            main: '#9a8c98',
            dark: '#6c5f6a',
            contrastText: '#eeeeee',
          },
        },
      });

    return (
        <div className='progress'> 
          <ThemeProvider theme={theme}>
            <CircularProgress sx={{ display: 'flex', color:'secondary' }}/>
          </ThemeProvider>
        </div>
      );
}