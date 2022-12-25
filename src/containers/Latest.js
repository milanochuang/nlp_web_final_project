import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "utils/axios";
import Table from "components/Table";
import Progress from "components/Progress";

// 在頁面中選取最新文章
export default function Latest() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [incrementNum, setIncrementNum] = useState(2);

  // 載入頁面時呼叫爬蟲 API 以在下拉選單中獲取最新文章列表，提供使用者選取。
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/crawler?load=${incrementNum}`)
      .then((response) => {
        setArticleList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.error(error)
      });
  }, [incrementNum]);

  // 按下「MORE」按鈕時，回傳載入次數*10的文章數
  const handleMoreClick = () => {
    setIncrementNum(incrementNum + 1);
    setIsLoading(true);
    axios
      .get(`/crawler?load=${incrementNum}`)
      .then((response) => {
        console.log(response.data);
        setArticleList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.error(error)
      });
  };

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

  return (
    <div>
      <h2 className="header">最新文章</h2>
      {isLoading ? <Progress /> : <Table articleList={articleList} />}
      <div className="latest-button">
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleMoreClick}
            disabled={isLoading}
          >
            MORE
            <ArrowRightIcon />
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
}
