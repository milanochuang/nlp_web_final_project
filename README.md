# React 新聞素材應用程式

## 檔案總覽
```

├── api                          # 連接 PTT api
|   ├── data
|   |   └── data.json            # PTT 資料
|   ├── api.py                   # 跑動以連接 api
|   ├── config.py                # 填入自己的 PTT username 及 password
|   └── requirements.txt         # 需求套件
|
├── public                       
|   ├── index.html
|   └── styles.css               # 應用程式的頁面設計
|
└──src
    ├── components               # 應用程式中所使用的元件
    |   ├── Dashboard.js         # 參數儀錶板部件
    |   ├── DownloadButton.js    # 下載按鈕部件
    |   ├── DropMenu.js          # 下拉選單部件
    |   ├── Progress.js          # 資料加載部件
    |   ├── ProgressLinear.js    # 資料加載部件 (線型)
    |   ├── SelectMenu.js        # 下拉篇數選單部件
    |   ├── SimilarityBar.js     # 相似度拉動元件
    |   └── Table.js             # 資料呈現表格
    |
    ├── containers               # 應用程式頁面
    |   ├── Contact.js           # 聯絡我們頁面
    |   ├── Documentation.js     # 使用說明頁面
    |   ├── Latest.js            # 最新文章頁面
    |   ├── Materials.js         # 新聞素材頁面
    |   └── PageHeader.js        # 頁面切換選單
    |
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── reportWebVitals.js
    ├── setupProxy.js            # 連接本地伺服器的 api 資料 (依照 api 路徑更改 proxyMiddleware 的第一個參數，本 api 設定為 '/api'
    └── setupTests.js
  
```
## 操作步驟
### 1. 開啟虛擬環境

為避免套件版本不相符，可建立虛擬環境以跑動程式。

  #### (1) 於終端機 (Mac) 或 Anaconda Prompt (Windows) 輸入以下指令：
```
# 建立虛擬環境
conda create --name <自訂虛擬環境名稱> python=3

# 進入虛擬環境
activate <虛擬環境名稱>

```

  #### (2) 若要離開虛擬環境，則輸入以下指令：
```
# 離開虛擬環境
deactivate
```

### 2. 連接 api

  #### (1) 於 data 資料夾放入自己的資料：`data.json`
 
 ※ 本應用程式所使用之 PTT 資料透過以下[網路爬蟲](https://github.com/jwlin/ptt-web-crawler)取得

  #### (2) 新增 `config.py` 檔案，並輸入自己的 PTT username 和 password
```
username: <PTT username>
password: <PTT password>
```
  #### (3) 進入 api 資料夾
```
cd api
```
  #### (4) 下載需求套件
```
pip install -r requirements.txt
```
  #### (5) 跑動 `api.py` 檔案
```
python api.py
```

### 3. 載入 react 需求套件
```
yarn install
```

### 4. 跑動 react 應用程式
```
yarn start
```
