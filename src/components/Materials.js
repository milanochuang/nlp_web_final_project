import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, Button, Container, Slider, Checkbox, FormControlLabel, Typography } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function Materials() {

    return (
        <>
            <h2 className='header'>News Materials</h2>
            <div className='select'>
                <FormControl sx={{ m: 1, minWidth: 650 }} size="small">
                    <InputLabel id="demo-simple-select-label">select a title</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="select a title"
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                </FormControl><br/>
        </div>
        <div className='button'>
            <Button variant="contained">MORE<ArrowRightIcon /></Button>
        </div>
        <div className='arg-filter'>
            <div>
                <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                    <InputLabel id="demo-simple-select-label">number</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="number"
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                </FormControl>
            </div>
            <div>
                <Typography>similarity score</Typography>
                <Slider 
                defaultValue={0.5} 
                aria-label="Default" 
                valueLabelDisplay="auto"
                min={0}
                max={1.0}
                step={0.001} 
                sx={{ width: 300 }}/>
            </div>
                <FormControlLabel control={<Checkbox />} label="推文" />
                <FormControlLabel control={<Checkbox />} label="噓文" />
            </div>
            <div className='button-submit'>
                <Button variant="contained">SUBMIT</Button>
            </div>
        </>
    )
}