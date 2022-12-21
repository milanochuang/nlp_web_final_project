import { Checkbox, FormControlLabel } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import SelectMenu from "./SelectMenu";
import { Typography, Slider } from "@mui/material";

export default function Dashboard({
  theme,
  handleSimilarityScore,
  handleReturnArticleNum,
  handleNeedMessage,
}) {
  return (
    <div className="arg-filter">
      <div>
        <Typography>相似度</Typography>
        <ThemeProvider theme={theme}>
          <Slider
            color="secondary"
            defaultValue={0.5}
            aria-label="Default"
            valueLabelDisplay="auto"
            min={0}
            max={1.0}
            step={0.001}
            sx={{ width: 300 }}
            onChange={handleSimilarityScore}
          />
        </ThemeProvider>
      </div>
      <SelectMenu
        theme={theme}
        handleReturnArticleNum={handleReturnArticleNum}
      />
      <ThemeProvider theme={theme}>
        <FormControlLabel
          control={<Checkbox onChange={handleNeedMessage} />}
          color="secondary"
          label="留言"
        />
      </ThemeProvider>
    </div>
  );
}
