import { ThemeProvider } from '@mui/material/styles';
import { Typography, Slider } from '@mui/material';
export default function SimilarityBar({
    handleSimilarityScore,
    theme
}){
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
                onChange={handleSimilarityScore}/>
        </ThemeProvider>
    </div>
}