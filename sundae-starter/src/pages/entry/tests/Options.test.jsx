import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("顯示來自伺服器的每個湯匙選項的圖像", async () => {
  render(<Options optionType="scoops" />);

  // 尋找頁面中alt包含'scoop'的圖片元素，斷言元素只會有2個(來自mock-service-worker)
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // 確認圖片的alt text內容
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});