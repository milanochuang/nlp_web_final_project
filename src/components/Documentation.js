import React from 'react';

export default function Documentation() {
    return (
        <div>
            <div>
                <h2 className='header'>使用說明</h2>
            </div>
            <div className='doc-content'>
                <h3 className='subtitle'>關於本應用程式</h3>
                <p>本應用程式可檢視 PTT 八卦版的最新文章，並在選定文章標題後，篩選出最近一個月內的相似文章。</p>
                <h3 className='subtitle'>如何使用</h3>
                <p>
                    於最新文章分頁可瀏覽 PTT 八卦版中最新的十篇文章標題，按下下方的「MORE」按鈕可觀看更多。<br/>
                    下拉選定文章標題後，即可在下方文字框中檢視全文，亦可透過連結至 PTT 查看原文。<br/>
                    <br/>
                    新聞素材分頁可在選定文章標題後，調整「篇數」、「相似度」參數，以提供 PTT 八卦版近一個月內的<br/>
                    相關文章，點擊「MORE」按鈕可瀏覽更多；並可勾選「推文」或「噓文」選項，以檢視文章中的留言。<br/>
                    篩選出的文章可透過點選最下方的「下載」按鈕，以生成 CSV、TXT 或 PDF 不同的檔案類型。<br/>
                    <br/>
                </p>
            </div>
        </div>
    )
}