import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

export default function DropMenu( {
    articleTitle,
    selectedItem,
    theme
}){
    
return (
    <div className='select'>
                <ThemeProvider theme={theme}>
                    <FormControl sx={{ m: 1, minWidth: 650 }} size="small">
                        <InputLabel id="demo-simple-select-label">請選擇一篇文章標題</InputLabel>
                            <Select
                                color='secondary'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="請選擇一篇文章標題"
                                onChange={selectedItem}
                            >
                            {/* 選擇 title 之後將 article_title 回傳作為 API 參數 */}
                            {articleTitle && articleTitle.map((v, i) => (
                                <MenuItem value={v.article_title}>{v.article_title}</MenuItem>
                            ))}
                            </Select>
                    </FormControl><br/>
                </ThemeProvider>
        </div>
)}