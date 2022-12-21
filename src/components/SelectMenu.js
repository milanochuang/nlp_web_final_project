import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

export default function SelectMenu({ theme, handleReturnArticleNum }) {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
        <InputLabel id="demo-simple-select-label">篇數</InputLabel>
        <ThemeProvider theme={theme}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="篇數"
            color="secondary"
            onChange={handleReturnArticleNum}
          >
            <MenuItem value={10}>回傳 10 篇文章</MenuItem>
            <MenuItem value={20}>回傳 20 篇文章</MenuItem>
            <MenuItem value={30}>回傳 30 篇文章</MenuItem>
          </Select>
        </ThemeProvider>
      </FormControl>
    </div>
  );
}
