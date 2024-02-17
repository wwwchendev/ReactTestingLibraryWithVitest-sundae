// options.test.jsx
import { render, screen } from "../../../test-utils/testing-library-utils";
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
