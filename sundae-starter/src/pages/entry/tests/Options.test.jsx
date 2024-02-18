// options.test.jsx
import { render, screen } from "../../../test-utils/testing-library-utils";
import { userEvent } from "@testing-library/user-event";
import Options from "../Options";

test("顯示來自伺服器的每個湯匙選項的圖像", async () => {
  render(<Options optionType="scoops" />);

  // 尋找圖片元素
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // 確認圖片的alt text內容
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("顯示來自伺服器的每個配料選項的圖像", async () => {
  render(<Options optionType="toppings" />);

  // 尋找圖片元素
  const toppingImages = await screen.findAllByRole("img", { name: /topping$/i });
  expect(toppingImages).toHaveLength(3);

  // 確認圖片的alt text內容
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual(["M&Ms topping", "Hot fudge topping", "Peanut butter cups topping"]);
});

test("如果scoop輸入無效數值，則不更新總計", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // 等待伺服器回應並渲染資料後尋找vanillaInput元素
  const vanillaInput = await screen.findByRole("spinbutton", { name: /Vanilla/i });
  const scoopsSubtotal = screen.getByText("聖代基底 小計: $0.00"); //初始小計為0

  await user.clear(vanillaInput);

  //輸入無效數值-香草基底"2.5"個，確保小計為0
  //.type() 會一次鍵入一個字符，類似於使用鍵盤輸入文字的操作。
  await user.type(vanillaInput, "2.5");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");

  //輸入無效數值-香草基底"100"個，確保小計為0
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "100");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");

  //輸入無效數值-香草基底"-1"個，確保小計為0
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");
});