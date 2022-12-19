import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, TextField } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Latest() {
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
    <>
        <h2 className='header'>最新文章</h2>
        <div className='select'>
            <ThemeProvider theme={theme}>
                <FormControl sx={{ m: 1, minWidth: 650 }} size="small">
                    <InputLabel id="demo-simple-select-label">請選擇一篇文章標題</InputLabel>
                        <Select
                            color="secondary"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="請選擇一篇文章標題"
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                </FormControl>
        </ThemeProvider>
        </div>
        <div className='button'>
            <ThemeProvider theme={theme}>
                <Button variant="contained" color='primary'>MORE<ArrowRightIcon /></Button>
            </ThemeProvider>
        </div>
        <div className='select'>
            <TextField id="outlined-basic" label="content" variant="outlined" sx={{ m: 5, minWidth: 650 }} size="large" />
        </div>
        <div className='select'>
            <TextField id="outlined-basic" label="comment" variant="outlined" sx={{ m: 5, minWidth: 650 }} size="large" />
        </div>
        <div className='select'>
            <TextField id="outlined-basic" label="link" variant="outlined" sx={{ m: 5, minWidth: 650 }} size="small" />
        </div>
    </>
    );
}