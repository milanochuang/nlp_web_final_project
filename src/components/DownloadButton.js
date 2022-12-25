import { CSVLink } from "react-csv";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

// 下載按鈕的 button group
export default function DownloadButtons({
  theme,
  isLoading,
  similarArticleList,
}) {
  return (
    <div className="button-download">
      <ThemeProvider theme={theme}>
        <CSVLink
          className="link"
          data={similarArticleList}
          filename="similar_article.csv"
        >
          <Button variant="contained" color="primary" disabled={isLoading}>
            下載 CSV
            <FileDownloadIcon />
          </Button>
        </CSVLink>
        <CSVLink
          className="link"
          data={similarArticleList}
          filename="similar_article.txt"
        >
          <Button variant="contained" color="primary" disabled={isLoading}>
            下載 TXT
            <FileDownloadIcon />
          </Button>
        </CSVLink>
      </ThemeProvider>
    </div>
  );
}
