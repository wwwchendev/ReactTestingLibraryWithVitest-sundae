# Sundaes on Demand 初始碼

本專案是為了 Udemy 課程 [React Testing Library with Jest / Vitest](https://www.udemy.com/course/react-testing-library) 而建立的。

## 專案建立方式

此專案是使用以下指令建立的：

```sh
npm create vite@latest sundae-starter -- --template react
```

然後按照以下所有步驟進行操作。

我還刪除了一些不必要的檔案，並更新了

- App.jsx
- index.css
- 這個 README 檔案 😄

## 安裝 React Bootstrap、Vitest 和 React Testing Library

```sh
npm install -D vitest @vitest/ui eslint-plugin-vitest
npm install -D jsdom @testing-library/jest-dom @testing-library/react eslint-plugin-jest-dom eslint-plugin-testing-library
npm install bootstrap react-bootstrap
```

## 添加 Bootstrap

將這行添加到 _src/main.jsx_：

```js
import "bootstrap/dist/css/bootstrap.min.css";
```

## 將端口更新為 3000

為了符合 sundae 伺服器的期望並避免 CORS 錯誤，將以下內容添加到 _vite.config.js_ 中的 `defineConfig` 參數/值：

```js
  server: {
    port: 3000,
    // 如果端口 3000 已被使用，則退出（以避免 CORS 錯誤；伺服器期望使用端口 3000）
    strict: true,
  },
```

## 在 package.json 中添加 `start` 指令

為了與過去的課程視頻匹配（這些視頻是使用 create-react-app 拍攝的），將以下內容添加到 _package.json_ 的 `scripts` 陣列中：

```json
    "start": "vite",
```

## 安裝未來的相依性

對於將此專案作為 React 代碼添加的人，執行以下安裝：

```sh
npm install -D @testing-library/user-event msw
npm install axios
```

## 在 package.json 的 `test` 物件中添加測試指令

```json
  "test": "vitest --watch"
```

## 添加測試設定檔

為了在所有測試檔案中提供 [jest-dom matchers](https://github.com/testing-library/jest-dom#custom-matchers)：

1. 建立新檔案 _src/setupTests.js_
1. 添加以下內容：

```js
import "@testing-library/jest-dom";
```

## 添加 Vitest 和 Testing Library 插件到 ESLint

在 _.eslintrc.cjs_ 中：

1. 在 `extends` 陣列中添加以下內容：

```js
   'plugin:testing-library/react',
   'plugin:vitest/recommended',
```

1. 此步驟避免了在未先引入的情況下使用 `test` 和 `expect` Vitest 全域時出現的 linting 錯誤。

在頂部引入 Vitest 插件：

```js
const vitest = require("eslint-plugin-vitest");
```

然後在頂層 `module.exports` 物件中添加以下屬性/值：

```js
    globals: {
      ...vitest.environments.env.globals,
    },
```

## 更新一些 ESLint 規則

在 _.eslintrc.cjs_ 的 `rules` 物件中添加以下內容：

```js
    "no-unused-vars": "warn", // 警告，而非錯誤
    "vitest/expect-expect": "off", // 在編寫測試時消除令人分心的紅色波浪線
    "react/prop-types": "off", // 關閉 props 驗證
```

## 在保存時自動應用 ESLint 和 Prettier 格式化

1. 如果尚未安裝，請在 VSCode 中安裝 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 和 [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 擴展。
1. 建立 _.vscode/settings.json_ 檔案。
1. 添加以下內容：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

**注意**：如果在 VSCode 中使用 ESLint 遇到問題，請參考[此疑難排解指南](https://dev.to/bonnie/eslint-prettier-and-vscode-troubleshooting-ljh)。

## 更新測試的 vite 配置

根據 [Vitest Testing Library 範例](https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/vite.config.ts)，更新 _vite.config.js_。將以下內容添加到 `defineConfig` 參數中：

```js
  test: {
    globals: true,
    environment: "jsdom",
    // 這指向之前創建的設置檔案
    setupFiles: "./src/setup.js",
    // 你可能想要禁用 `css: true` 行，因為我們沒有依賴 CSS 的測試 -- 而解析 CSS 是很慢的。
    // 我在這裡保留它，因為通常人們希望在測試中解析 CSS。
    css: true,
  },
```

## 在觀察模式下運行測試的命令

```sh
npm test
```

## 參考

- [創建 Vite 專案](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
- [Vitest Testing Library 範例](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
- [Vitest ESLint 插件](https://www.npmjs.com/package/eslint-plugin-vitest)
