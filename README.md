## 說明

本專案使用 React Testing Library 和 Jest/Vitest 測試框架，加深React測試的理解和練習。  
以下是一些主要的測試邏輯：

- 檢查元素是否存在：使用測試工具提供的方法，如 getByRole()、getByText() 等，確保渲染的元素存在於 DOM 中。
- 檢查內容是否顯示正確：通過斷言測試工具提供的方法，如 expect()，檢查元素的內容是否與預期相符。
- 有條件的禁用按鈕：模擬特定情況下的使用者操作，觸發相應的狀態改變，然後檢查按鈕是否被禁用。
- 驗證輸入值有效性：模擬使用者輸入，例如在輸入框中輸入數字或文字，然後檢查輸入值是否被正確地處理和驗證。
- 錯誤處理：測試錯誤情況，如服務器錯誤或無效的輸入，並確保應用程序能夠正確處理這些情況並顯示相應的錯誤信息。

還有測試工具：
- 使用 Mock Service Worker（MSW）模擬服務器的行為，以便在測試中模擬服務器的回應，確保應用程序在不同情況下能夠正確處理來自服務器的數據。
- 使用測試工具提供的 render 函數的 wrapper 屬性，可以將測試元件包裝在自定義Provider中。為測試注入額外的上下文、狀態。

### 相關連結
- [React Testing Library with Jest / Vitest](https://www.udemy.com/course/react-testing-library/)
- [學習筆記](https://wwwchen.dev/blogs?q=ReactTestingLibrary)

### 啟動步驟：

1. 複製資料庫：

   在終端機中使用以下命令來複製資料庫
   
   ```bash
   git clone https://github.com/wwwchendev/ReactTestingLibraryWithVitest-sundae.git
   ```

2. 開啟後端伺服器  
    - 進入目錄
      ```bash
      cd sundae-server
      ```
    - 執行以下命令以安裝所需的 npm 套件：
      ```bash
      npm install
      ```
    - 運行以下命令以啟動伺服器：
      ```bash
      npm run dev
      ```

3. 開啟專案  
    - 進入目錄
      ```bash
      cd sundae-starter
      ```
    - 執行以下命令以安裝所需的 npm 套件：
      ```bash
      npm install
      ```
    - 運行以下命令以啟動伺服器：
      ```bash
      npm run dev
      ```
    - 在瀏覽器中打開以下連結： [http://localhost:3000/](http://localhost:3000/)
