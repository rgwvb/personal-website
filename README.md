# 個人網站：GitHub Pages 與 Google Sheets

網站程式由 GitHub 管理，內容從 Google Sheets 讀取。不需服務帳號 JSON 或 API 金鑰。

內容後台：https://docs.google.com/spreadsheets/d/1SkYEZfk11xIRQTR6RdRk0q-ih3-wT3KdlSOQ8BrMvzc/edit

## 更新內容

- 個人資料：修改內容欄，更新名稱、簡介、工具、照片與聯絡方式。
- 作品：一列一件作品，填標題、摘要、內容、標籤、圖片與連結。
- 最新消息：一列一則近況。
- 顯示填 TRUE 才顯示，FALSE 可隱藏。排序數字由小到大。
- 保留第一列欄名與分頁名稱，可往下新增資料。
- 圖片與檔案先上傳 GitHub 或其他公開空間，再貼網址。試算表儲存文字和網址，不直接存放檔案。

## 網站已上線

網站：https://rgwvb.github.io/personal-website/

GitHub Pages 已使用 main 分支根目錄發布。試算表已發布並啟用自動重新發布，一般存取權為知道連結的任何人可檢視；只有擁有者能修改內容。請只放預計公開的資料。

之後改試算表，再重整網站即可。Google 快取可能延遲數分鐘。尚未發布或讀取失敗時顯示初始內容，瀏覽器主控台會標示讀取狀態。

## 原始碼

- index.html：版面。
- styles.css、content-styles.css：響應式樣式。
- app.js：作品詳細介紹、篩選與導覽。
- sheet-content.js：試算表讀取與文字、網址顯示。
- assets：概念插畫，非實際量測數據或產品截圖。

支援 GitHub Pages 專案子路徑。沒有留言或訊息送出功能。已通過 JavaScript 語法、相對路徑與內容顯示檢查；已在正式網站確認三個分頁讀取成功，以及作品篩選、介紹與切換功能正常。
