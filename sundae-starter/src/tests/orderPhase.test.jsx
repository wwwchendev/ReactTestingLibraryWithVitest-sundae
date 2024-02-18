import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("正常流程下的訂單階段", async () => {
  const user = userEvent.setup();
  const { unmount } = render(<App />);

  // 1.添加冰淇淋球和配料
  const vanillaInput = await screen.findByRole("spinbutton", { name: /香草/i });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const chocolateInput = screen.getByRole("spinbutton", { name: /巧克力/i });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const hotFudgeCheckbox = await screen.findByRole("checkbox", { name: "Hot fudge" });
  await user.click(hotFudgeCheckbox);

  // 2.找到並點擊訂單摘要按鈕
  const orderSummaryButton = screen.getByRole("button", { name: /提交訂單/i });
  await user.click(orderSummaryButton);

  // 3.檢查摘要小計
  const summaryHeading = screen.getByRole("heading", { name: '訂購明細' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: /聖代基底/i });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", { name: /配料/i });
  expect(toppingsHeading).toBeInTheDocument();
  expect(screen.getByText("香草 * 1球")).toBeInTheDocument();
  expect(screen.getByText("巧克力 * 2球")).toBeInTheDocument();
  expect(screen.getByText("熱熔巧克力醬")).toBeInTheDocument();

  // 或者...
  // const optionItems = screen.getAllByRole('listitem');
  // const optionItemsText = optionItems.map((item) => item.textContent);
  // expect(optionItemsText).toEqual(['香草 * 1球', '巧克力 * 2球', '熱熔巧克力醬']);

  // 4.接受條款並點擊按鈕
  const tcCheckbox = screen.getByRole("checkbox", { name: /訂購規定/i });
  await user.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", { name: /確認訂單/i });
  await user.click(confirmOrderButton);

  // 期望顯示"載入中"
  const loading = screen.getByText(/載入中/i);
  expect(loading).toBeInTheDocument();

  // 5.檢查確認頁面文字與訂單編號
  // 這個是異步的，因為在摘要和確認頁面之間有一個發送到服務器的 POST 請求
  const completeHeader = await screen.findByRole("heading", { name: /訂購完成/i });
  expect(completeHeader).toBeInTheDocument();

  // "載入中"已消失
  const notLoading = screen.queryByText("載入中");
  expect(notLoading).not.toBeInTheDocument();
  const orderNumber = await screen.findByText(/訂單編號是 123455676/i);
  expect(orderNumber).toBeInTheDocument();

  // 6.找到並點擊確認頁面上的"新訂單"按鈕,檢查冰淇淋球和配料是否已重置
  const newOrderButton = screen.getByRole("button", { name: /再次訂購/i });
  await user.click(newOrderButton);
  const scoopsTotal = await screen.findByText("聖代基底 小計: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("配料 小計: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  unmount(); //明確卸載組件以觸發清理時的網絡請求取消
});

test("如果沒有選擇配料，配料標題不會出現在訂單明細頁面上", async () => {
  const user = userEvent.setup();
  render(<App />);

  // 增加基底但不選擇配料
  // await screen.findByRole 是一個異步操作，它會等待元素出現在 DOM 中後再返回元素，因此在這種情況下使用 findByRole 更合適，因為它會等待 React 渲染完成後再查找元素。
  const vanillaInput = await screen.findByRole("spinbutton", { name: /香草/i });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const chocolateInput = screen.getByRole("spinbutton", { name: /巧克力/i });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  // 找到並點擊提交訂單按鈕
  const orderSummaryButton = screen.getByRole("button", { name: /提交訂單/i });
  await user.click(orderSummaryButton);

  const scoopsHeading = screen.getByRole("heading", { name: "聖代基底: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole("heading", { name: /配料:/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});