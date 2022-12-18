import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, TextField } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function Latest() {
    return (
    <>
        <h2 className='header'>10 Latest Articles on PTT Gossiping Board</h2>
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