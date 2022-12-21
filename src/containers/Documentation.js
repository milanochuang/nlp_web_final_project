import React from "react";

export default function Documentation() {
  return (
    <div>
      <div>
        <h2 className="header">使用說明</h2>
      </div>
      <div className="doc-content">
        <h3 className="subtitle">關於本應用程式</h3>
        <p>
          本應用程式可檢視 PTT
          八卦版的最新文章，並在選定文章標題後，篩選出相似的文章。
        </p>
        <h3 className="subtitle">如何使用</h3>
        <p>
          於「最新文章」分頁可瀏覽 PTT
          八卦版中最新的十篇文章，點擊文字框右側的向下箭號，
          <br />
          即可閱覽內文；按下下方的「MORE」按鈕可觀看更多，每按一次會多加載十篇文章。
          <br />
          <br />
          「新聞素材」分頁可在選定文章標題後，調整「相似度」、「篇數」參數，以提供
          PTT 八卦版中的
          <br />
          相關文章，點擊「MORE」按鈕可加載更多標題；並可勾選「留言」選項，以取得文章內的留言。
          <br />
          篩選出的文章可透過點擊頁面最下方的「下載」按鈕，以生成 CSV 或 TXT
          不同的檔案類型。
          <br />
          <br />
        </p>
      </div>
    </div>
  );
}
