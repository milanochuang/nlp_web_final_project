import React from "react";
import { Button } from "@mui/material";
import Table from "../components/Table";
import axios from "axios";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Progress from "../components/Progress";

export default function Latest() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [incrementNum, setIncrementNum] = useState(2);
  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "get",
      url: `http://127.0.0.1:5000/api/crawler?load=${incrementNum}`,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        setArticleList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.error(error)
      });
  }, [incrementNum]);

  const handleMoreClick = () => {
    setIncrementNum(incrementNum + 1);
    console.log(incrementNum);
    setIsLoading(true);
    axios({
      method: "get",
      url: `http://127.0.0.1:5000/api/crawler?load=${incrementNum}`,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    })
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
