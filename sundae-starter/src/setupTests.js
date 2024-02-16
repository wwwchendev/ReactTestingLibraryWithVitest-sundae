// setupTests.js 用於配置測試環境，例如在測試之前或之後執行的全域設定、匯入測試庫中所需的依賴項等。

// 1.載入jest-dom 該庫提供了一些有用的斷言和工具，助於更輕鬆地編寫和運行測試。
import "@testing-library/jest-dom";

// 2.在測試運行啟用Mock Service Worker 用於模擬API交互
//https://mswjs.io/docs/integrations/node#test-runner
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './mocks/server'

//在所有測試運行之前啟動 Mock Service Worker，以確保它能夠攔截和處理網路請求
beforeAll(() => server.listen())
//在每個測試運行後重設 Mock Service Worker 的請求處理程序。這樣可以確保每個測試運行之間的獨立性。
afterEach(() => server.resetHandlers())
//在所有測試運行結束後關閉 Mock Service Worker。這樣可以確保在測試完成後正確釋放資源。
afterAll(() => server.close())