import ArticleIcon from '@mui/icons-material/Article';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

export default function ArticleTable({
    similarTitleList
}){
    return(
        <div className='table'>
            <List>         
                {similarTitleList && similarTitleList.map((article, i) => {
                return(
                        <ListItem key={i}>
                            <ListItemAvatar>
                                <Avatar>
                                    <ArticleIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={article}
                                // secondary={secondary ? 'Secondary text' : null}
                                    />
                        </ListItem>
                            )
                        })}
            </List>
        </div>
    )
}