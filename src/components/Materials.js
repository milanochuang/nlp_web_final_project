import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
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
                </FormControl>
        </div>
        <div className='button'>
            <Button variant="contained">MORE<ArrowRightIcon /></Button>
        </div>
        <div>
            <Box>
                <div className='select'>
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-simple-select-label">time</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="select a title"
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                    </FormControl>
                </div>
            </Box>
        </div>
        </>
    )
}