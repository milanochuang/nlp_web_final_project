import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, Button, Slider, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function Materials() {
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
            <h2 className='header'>新聞素材</h2>
            <div className='select'>
                <ThemeProvider theme={theme}>
                    <FormControl sx={{ m: 1, minWidth: 650 }} size="small">
                        <InputLabel id="demo-simple-select-label">請選擇一篇文章標題</InputLabel>
                            <Select
                                color='secondary'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="請選擇一篇文章標題"
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                    </FormControl><br/>
                </ThemeProvider>
        </div>
        <div className='button'>
            <ThemeProvider theme={theme}>
                <Button variant="contained" color='primary'>MORE<ArrowRightIcon /></Button>
            </ThemeProvider>
        </div>
        <div className='arg-filter'>
            <div>
                <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                    <InputLabel id="demo-simple-select-label">篇數</InputLabel>
                        <ThemeProvider theme={theme}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="篇數"
                                color="secondary"
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </ThemeProvider>
                </FormControl>
            </div>
            <div>
                <Typography>相似度</Typography>
                <ThemeProvider theme={theme}>
                    <Slider
                    color='secondary' 
                    defaultValue={0.5} 
                    aria-label="Default" 
                    valueLabelDisplay="auto"
                    min={0}
                    max={1.0}
                    step={0.001} 
                    sx={{ width: 300 }}/>
                </ThemeProvider>
            </div>
                <ThemeProvider theme={theme}>
                    <FormControlLabel control={<Checkbox />} color="secondary" label="推文" />
                    <FormControlLabel control={<Checkbox />} color="secondary" label="噓文" />
                </ThemeProvider>
            </div>
            <div className='button-submit'>
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color='secondary'>SUBMIT</Button>
                </ThemeProvider>
            </div>
            <div className='button-download'>
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color='primary'>下載 CSV<FileDownloadIcon /></Button>
                    <Button variant="contained" color='primary'>下載 TXT<FileDownloadIcon /></Button>
                    <Button variant="contained" color='primary'>下載 PDF<FileDownloadIcon /></Button>
                </ThemeProvider>
            </div>
        </>
    )
}