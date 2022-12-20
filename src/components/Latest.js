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
<<<<<<< HEAD
        <Table articleList={articleList} title={"最新文章"} />
        <div className='button'>
            <Button variant="contained" onClick={handleMoreClick}>MORE<ArrowRightIcon /></Button>
=======
        <h2 className='header'>最新文章</h2>
        {articleList && articleList.map((v, i) => (
          <div className='article'>
            <Accordion expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '60%', flexShrink: 0 }}>
                  {v.article_title}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{v.author}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {v.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
        <div className='latest-button'>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color='primary' onClick={handleMoreClick}>MORE<ArrowRightIcon /></Button>
          </ThemeProvider>
>>>>>>> origin
        </div>
      </div>
    );
}