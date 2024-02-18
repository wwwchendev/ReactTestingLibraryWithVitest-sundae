import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

test("檢查基底數量是否為非整數或超出範圍", async () => {
  const user = userEvent.setup();
  render(<ScoopOption key={null} name={null} imagePath={null} />);

  // 預期輸入為負數無效
  const scoopInput = await screen.findByRole("spinbutton");
  await user.clear(scoopInput);
  await user.type(scoopInput, "-1");
  expect(scoopInput).toHaveClass("is-invalid");

  // 替換為十進制輸入
  await user.clear(scoopInput);
  await user.type(scoopInput, "2.5");
  expect(scoopInput).toHaveClass("is-invalid");

  // 替換為太高的輸入
  await user.clear(scoopInput);
  await user.type(scoopInput, "11");
  expect(scoopInput).toHaveClass("is-invalid");

  // 替換為有效輸入
  // 這裡我們正在測試我們的驗證規則（即輸入可以顯示為有效）
  // 而不是react-bootstrap的回應
  await user.clear(scoopInput);
  await user.type(scoopInput, "3");
  expect(scoopInput).not.toHaveClass("is-invalid");
});