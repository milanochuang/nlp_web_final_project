import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, Button, Slider, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Table from "./Table"

export default function Materials() {
    const [articleList, setArticleList] = useState([])
    const [ArticleTitle, setArticleTitle] = useState("")
    const [incrementNum, setIncrementNum] = useState(1)
    const [returnArticleNum, setReturnArticleNum] = useState(0)
    const [similariyScore, setSimilarityScore] = useState(null)
    const [similarTitleList, setSimilarTitleList] = useState([])
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
      // Call crawler api and send the article list to the select menu
    useEffect(()=>{
        axios({
          method: 'get', 
          url: `http://127.0.0.1:5000/crawler?load=1`, 
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

    const selectedArticleTitle = (selectedTitle) => {
        console.log(selectedTitle)
        setArticleTitle(selectedTitle.target.value)
      }
    
    // 呼叫 API 的標頭檔
    const returnSimilarTitleHeader = {
        method: 'get', 
        url: `http://127.0.0.1:5000/similarity?title=${ArticleTitle}&num=${returnArticleNum}&similarity=${similariyScore}`, 
        headers: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*", 
          'Content-Type': 'application/json'
        }
      }
    // 呼叫 API 回傳相似的文章標題列表
    const returnSimilarTitle = () => {
        console.log(returnSimilarTitleHeader)
        axios(returnSimilarTitleHeader).then(response => {
            console.log(response.data);
            setSimilarTitleList(response.data)
        })
    }

    const handleMoreClick = () => {
        console.log(12345)
        console.log(returnArticleNum)
        setIncrementNum(incrementNum+1)
        console.log(incrementNum)
      }
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
                                onChange={selectedArticleTitle}
                            >
                            {/* 選擇 title 之後將 article_title 回傳作為 API 參數 */}
                            {articleList && articleList.map((v, i) => (
                                <MenuItem value={v.article_title}>{v.article_title}</MenuItem>
                            ))}
                            </Select>
                    </FormControl><br/>
                </ThemeProvider>
        </div>
        <div className='button'>
            <ThemeProvider theme={theme}>
                <Button variant="contained" color='primary' onClick={handleMoreClick}>MORE<ArrowRightIcon /></Button>
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
                                <MenuItem value={10} onChange={(v) => setReturnArticleNum(v.target.value)}>回傳 10 篇文章</MenuItem>
                                <MenuItem value={20} onChange={(v) => setReturnArticleNum(v.target.value)}>回傳 20 篇文章</MenuItem>
                                <MenuItem value={30} onChange={(v) => setReturnArticleNum(v.target.value)}>回傳 30 篇文章</MenuItem>
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
                    sx={{ width: 300 }}
                    onChange={(e) => setSimilarityScore(e.target.value)}/>
                </ThemeProvider>
            </div>
                <ThemeProvider theme={theme}>
                    <FormControlLabel control={<Checkbox />} color="secondary" label="推文" />
                    <FormControlLabel control={<Checkbox />} color="secondary" label="噓文" />
                </ThemeProvider>
            </div>
            <div className='button-submit'>
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color='secondary' onClick={returnSimilarTitle}>SUBMIT</Button>
                </ThemeProvider>
            </div>
            {!similarTitleList
                ?"尚未回傳結果":(
                    <Table similarTitleList={similarTitleList} />
                )
            }
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