import React from 'react';
import { Button } from '@mui/material';
import Table from './Table'
import axios from "axios";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Latest() {
    const [articleList, setArticleList] = useState([])
    const [incrementNum, setIncrementNum] = useState(1)
    useEffect(()=>{
      axios({
        method: 'get', 
        url: `http://127.0.0.1:5000/api/crawler?load=${incrementNum}`, 
        headers: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*", 
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response.data);
        setArticleList(response.data)
      }).catch(error => {
        // console.error(error)
      });
    }, [])

    const handleMoreClick = () => {
      setIncrementNum(incrementNum+1)
      console.log(incrementNum)
    }

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
      <div>
        <Table articleList={articleList} title={"最新文章"} />
        <div className='button'>
            <Button variant="contained" onClick={handleMoreClick}>MORE<ArrowRightIcon /></Button>
        </div>
      </div>
    );
}