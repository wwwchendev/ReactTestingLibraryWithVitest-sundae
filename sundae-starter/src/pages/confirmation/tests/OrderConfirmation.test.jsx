import { render, screen } from "../../../test-utils/testing-library-utils";
import { server } from "../../../mocks/server";
import { HttpResponse, http } from "msw";

import OrderConfirmation from "../OrderConfirmation";

test("伺服器回應提交訂單錯誤", async () => {
  //利用resetHandlers把回應的json資料設為null
  server.resetHandlers(
    http.post("http://localhost:3030/order", () => {
      return new HttpResponse(null, { status: 500 }); //HTTP狀態碼500代表「內部服務器錯誤」
    })
  );

  render(<OrderConfirmation />);

  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent("發生意料之外的問題，請稍後再試。");
});