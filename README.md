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

## 首次上線（尚待完成）

1. 在 GitHub 帳號 rgwvb 建立 personal-website 公開儲存庫。
2. 將 ZIP 解壓縮後，把 index.html、CSS、JavaScript 和 assets 資料夾上傳至儲存庫根目錄，使用 main 分支。
3. 在儲存庫 Settings → Pages → Source 選 Deploy from a branch，Branch 選 main，資料夾選 /(root)，按 Save。
4. 在試算表「檔案 → 共用 → 發布到網路」發布整份文件。只放預計公開的內容。
5. 等待 GitHub Pages 部署完成，開啟 Pages 設定頁顯示的網址。

之後改試算表，再重整網站即可。Google 快取可能延遲數分鐘。尚未發布或讀取失敗時顯示初始內容，瀏覽器主控台會標示讀取狀態。

## 原始碼

- index.html：版面。
- styles.css、content-styles.css：響應式樣式。
- app.js：作品詳細介紹、篩選與導覽。
- sheet-content.js：試算表讀取與文字、網址顯示。
- assets：概念插畫，非實際量測數據或產品截圖。

支援 GitHub Pages 專案子路徑。沒有留言或訊息送出功能。部署前已完成 JavaScript 語法檢查；尚未完成瀏覽器驗證與公開試算表的端到端同步測試。
