import { render, screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";

//設定一個已知會出錯的測試
test("測試錯誤處理機制", async () => {
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