import React from 'react';
import { Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useState, useEffect } from "react";

export default function Latest() {
    const [expanded, setExpanded] = useState(false);
    const [articleList, setArticleList] = useState([])
    const [incrementNum, setIncrementNum] = useState(1)
    const handleChange =
      (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

    useEffect(()=>{
      axios({
        method: 'get', 
        url: `http://127.0.0.1:5000/crawler?load=${incrementNum}`, 
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
    return (
      <div>
        <h2 className='header'>最新文章</h2>
        {articleList && articleList.map((v, i) => (
          <Accordion expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
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
        ))}
        <div className='button'>
            <Button variant="contained" onClick={handleMoreClick}>MORE<ArrowRightIcon /></Button>
        </div>
      </div>
    );
}