import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import axios from "utils/axios";
import Table from "components/Table";
import Progress from "components/Progress";
import ProgressLinear from "components/ProgressLinear";
import DropMenu from "components/DropMenu";
import Dashboard from "components/Dashboard";
import DownloadButtons from "components/DownloadButton";

// 選取寫作材料之頁面，在此可決定回傳API之參數，如感興趣之文章，並操作儀表板，如相似度（bar）、回傳文章數、是否需要留言等，並加入下載按鈕。
export default function Materials() {
  const [articleList, setArticleList] = useState([]);
  const [ArticleTitle, setArticleTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMoreArticle, setLoadingMoreArticle] = useState(false);
  const [incrementNum, setIncrementNum] = useState(1);
  const [returnArticleNum, setReturnArticleNum] = useState(0);
  const [similariyScore, setSimilarityScore] = useState(null);
  const [similarArticleList, setSimilarArticleList] = useState([]);
  const [needMessage, setNeedMessage] = useState(false);

  // 主題參數
  const theme = createTheme({
    palette: {
      primary: {
        light: "#fcdfd8",
        main: "#c9ada7",
        dark: "#987e78",
        contrastText: "#22223B",
      },
      secondary: {
        light: "#cbbcc9",
        main: "#9a8c98",
        dark: "#6c5f6a",
        contrastText: "#eeeeee",
      },
    },
  });

  // 載入頁面時呼叫爬蟲 API 以在下拉選單中獲取最新文章列表，提供使用者選取。
  useEffect(() => {
    setLoadingMoreArticle(true);
    axios
      .get(`/crawler?load=${incrementNum}`)
      .then((response) => {
        setArticleList(response.data);
        setLoadingMoreArticle(false);
      })
      .catch((error) => {
        // console.error(error)
      });
  }, [incrementNum]);

  // 呼叫 API 回傳相似的文章標題列表
  const returnSimilarArticle = () => {
    setIsLoading(true);
    axios
      .get(
        `/similarity?${[
          `title=${ArticleTitle}`,
          `num=${returnArticleNum}`,
          `similarity=${similariyScore}`,
          `message=${needMessage}`,
        ].join("&")}`
      )
      .then((response) => {
        console.log(response.data);
        setSimilarArticleList(response.data);
        setIsLoading(false);
      });
  };

  // 將選取文章指配給 articleTitle，作為之後呼叫 API 的參數
  const handleSelectedArticleTitle = (selectedTitle) => {
    setArticleTitle(selectedTitle.target.value);
  };

  // 勾取欄的狀態切換
  const handleNeedMessage = () => {
    setNeedMessage((prev) => !prev);
  };

  // 載入更多文章的載入次數
  const handleMoreClick = () => {
    setIncrementNum(incrementNum + 1);
    setLoadingMoreArticle(true);
  };

  // 指定相似度的參數設定
  const handleSimilarityScore = (similarScore) => {
    setSimilarityScore(similarScore.target.value);
  };

  // 回傳文章篇數的參數設定
  const handleReturnArticleNum = (returnNum) => {
    setReturnArticleNum(returnNum.target.value);
  };

  return (
    <>
      <h2 className="header">新聞素材</h2>
      <DropMenu
        articleTitle={articleList}
        selectedItem={handleSelectedArticleTitle}
        theme={theme}
      />
      <div className="material-button">
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleMoreClick}
            disabled={loadingMoreArticle}
          >
            MORE
            <ArrowRightIcon />
          </Button>
          {loadingMoreArticle ? <ProgressLinear /> : <handleMoreClick />}
        </ThemeProvider>
      </div>
      <Dashboard
        theme={theme}
        handleSimilarityScore={handleSimilarityScore}
        handleReturnArticleNum={handleReturnArticleNum}
        handleNeedMessage={handleNeedMessage}
      />
      <div className="button-submit">
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="secondary"
            onClick={returnSimilarArticle}
          >
            SUBMIT
          </Button>
        </ThemeProvider>
      </div>
      <h3 className="small-header">相關文章</h3>
      {isLoading ? <Progress /> : <Table articleList={similarArticleList} />}
      <DownloadButtons
        theme={theme}
        similarArticleList={similarArticleList}
        isLoading={isLoading}
      />
    </>
  );
}
