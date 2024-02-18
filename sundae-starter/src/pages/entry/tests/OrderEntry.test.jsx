import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";

//設定一個已知會出錯的測試
test.skip("測試錯誤處理機制", async () => {
  //利用resetHandlers把回應的json資料設為null
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );
  //重新渲染組件
  render(<OrderEntry />);

  //斷言頁面中出現2個alert
  // const alerts = await screen.findAllByRole("alert");
  const alerts = await screen.findAllByText("發生意料之外的問題，請稍後再試。");
  expect(alerts).toHaveLength(2);
});

test("如果沒有選擇基底，禁用訂購按鈕", async () => {
  const user = userEvent.setup();
  // jest.fn() 是測試框架中的一個功能，用於創建假的函數(mock function)，以模擬實際函數的行為但不會執行實際的函數代碼。
  // 這在測試中非常有用，因為它允許我們在測試中模擬函數的行為，而不依賴於實際的代碼。
  render(<OrderEntry setOrderPhase={vitest.fn()} />);

  // 訂單按鈕應該首先被停用，甚至在選項加載之前也是如此
  const orderButton = screen.getByRole("button", { name: /提交訂單/i });
  expect(orderButton).toBeDisabled();

  // 期望添加勺子後啟用按鈕
  const vanillaInput = await screen.findByRole("spinbutton", { name: /香草/i });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(orderButton).toBeEnabled();

  // 移除湯匙後預計按鈕會再次停用
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "0");
  expect(orderButton).toBeDisabled();
});