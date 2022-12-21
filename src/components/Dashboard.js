import { Checkbox, FormControlLabel } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import SelectMenu from './SelectMenu';
import SimilarityBar from './SimilarityBar';
export default function Dashboard({
    theme,
    handleSimilarityScore,
    handleReturnArticleNum,
    handleNeedMessage
}){
    return(
        <div className='arg-filter'>
            <SimilarityBar
            handleSimilarityScore={handleSimilarityScore}
            theme={theme}
            />
            <SelectMenu 
                theme={theme}
                handleReturnArticleNum={handleReturnArticleNum}
            />
            <ThemeProvider theme={theme}>
                <FormControlLabel control={<Checkbox onChange={handleNeedMessage}/>} color="secondary" label="留言" />
            </ThemeProvider>
        </div>
    )
}