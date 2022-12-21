import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Table from "../components/Table";
import Progress from '../components/Progress';
import ProgressLinear from '../components/ProgressLinear';
import DropMenu from '../components/DropMenu';
import Dashboard from '../components/Dashboard';
import DownloadButtons from '../components/DownloadButton';


export default function Materials() {
    const [articleList, setArticleList] = useState([])
    const [ArticleTitle, setArticleTitle] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMoreArticle, setLoadingMoreArticle] = useState(false);
    const [incrementNum, setIncrementNum] = useState(1)
    const [returnArticleNum, setReturnArticleNum] = useState(0)
    const [similariyScore, setSimilarityScore] = useState(null)
    const [similarArticleList, setSimilarArticleList] = useState([])
    const [needMessage, setNeedMessage] = useState(false)
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
        setLoadingMoreArticle(true)
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
          setLoadingMoreArticle(false)
        }).catch(error => {
          // console.error(error)
        });
      }, [incrementNum])
    
    // 呼叫 API 的標頭檔
    const returnSimilarArticleHeader = {
        method: 'get', 
        url: `http://127.0.0.1:5000/api/similarity?title=${ArticleTitle}&num=${returnArticleNum}&similarity=${similariyScore}&message=${needMessage}`, 
        headers: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*", 
          'Content-Type': 'application/json'
        }
      }
    // 呼叫 API 回傳相似的文章標題列表
    const returnSimilarArticle = () => {
        setIsLoading(true)
        axios(returnSimilarArticleHeader).then(response => {
            console.log(response.data);
            setSimilarArticleList(response.data)
            setIsLoading(false)
        })
    }

    const handleSelectedArticleTitle = (selectedTitle) => {
        setArticleTitle(selectedTitle.target.value)
      }

    const handleNeedMessage = () => {
        setNeedMessage((prev) => !prev)
    }

    const handleMoreClick = () => {
        console.log(incrementNum)
        setIncrementNum(incrementNum+1)
        console.log(incrementNum)
        setLoadingMoreArticle(true)
      }
    const handleSimilarityScore = (similarScore) => {
        console.log(similarScore)
        setSimilarityScore(similarScore.target.value)
      }
    const handleReturnArticleNum = (returnNum) => {
        setReturnArticleNum(returnNum.target.value)
      }
      
    return (
        <>
            <h2 className='header'>新聞素材</h2>
            <DropMenu 
                articleTitle={articleList} 
                selectedItem={handleSelectedArticleTitle} 
                theme={theme}
            />
            <div className='material-button'>
                <ThemeProvider theme={theme}> 
                    <Button variant="contained" color='primary' onClick={handleMoreClick} disabled={loadingMoreArticle}>MORE<ArrowRightIcon /></Button>
                    {loadingMoreArticle ? <ProgressLinear /> : <handleMoreClick />}
                </ThemeProvider>
            </div>
            <Dashboard 
                theme={theme} 
                handleSimilarityScore={handleSimilarityScore}
                handleReturnArticleNum={handleReturnArticleNum}
                handleNeedMessage={handleNeedMessage} 
            />
            <div className='button-submit'>
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color='secondary' onClick={returnSimilarArticle}>SUBMIT</Button>
                </ThemeProvider>
            </div>
            <h3 className='small-header'>相關文章</h3>
            {isLoading ? <Progress /> : <Table articleList={similarArticleList} />}
            <DownloadButtons
                theme={theme}
                similarArticleList={similarArticleList}
                isLoading={isLoading}
            />
        </>
    )
}