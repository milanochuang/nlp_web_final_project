import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// 回傳文章所套用的表格
export default function ArticleTable({ articleList }) {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="table">
      {articleList &&
        articleList.map((v, i) => (
          <Accordion
            expanded={expanded === `panel${i}`}
            onChange={handleChange(`panel${i}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "60%", flexShrink: 0 }}>
                {v.article_title}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {v.author}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{v.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
}
