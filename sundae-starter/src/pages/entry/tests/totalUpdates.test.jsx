//totalUpdates.test.jsx 用來測試整體元件更新
import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("基底改變的時候更新基底小計價格", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  //確認小計初始值為 $0.00
  const scoopsSubtotal = screen.getByText("基底 小計: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //更新基底:香草口味一球並確認小計金額 (2*1=2)
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /Vanilla/i,
  });
  await user.clear(vanillaInput); //⚠️通常在測試過程中，為了確保測試的可靠性，會先清除掉原有的數值，以確保測試結果不會受到之前的輸入影響。
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  //更新基底:巧克力口味兩球並確認小計金額 (香草2+巧克力2*2=6)
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /Chocolate/i,
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("配料改變的時候更新配料小計價格", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  //確認小計初始值為 $0.00
  const toppingsTotal = screen.getByText("配料 小計: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  //加入M&Ms並檢查小計
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: /M&Ms/i,
  });
  await user.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");

  //加入熱熔巧克力醬並檢查小計
  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: /Hot fudge/i, });
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("3.00");

  //移除熱熔巧克力醬並檢查小計
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");
});