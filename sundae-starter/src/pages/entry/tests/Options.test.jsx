// options.test.jsx
import { render, screen } from "@testing-library/react";
import Options from "../Options";
//context
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

test("顯示來自伺服器的每個湯匙選項的圖像", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  // 尋找圖片元素
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // 確認圖片的alt text內容
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("顯示來自伺服器的每個配料選項的圖像", async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

  // 尋找圖片元素
  const toppingImages = await screen.findAllByRole("img", { name: /topping$/i });
  expect(toppingImages).toHaveLength(3);

  // 確認圖片的alt text內容
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual(["M&Ms topping", "Hot fudge topping", "Peanut butter cups topping"]);
});
