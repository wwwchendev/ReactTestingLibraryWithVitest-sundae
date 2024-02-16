/* eslint-disable vitest/no-commented-out-tests */
import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("測試初始狀態", () => {
  render(<SummaryForm />);
  // checkbox初始狀態沒有被選取
  const checkbox = screen.getByRole("checkbox", { name: /訂購規定/i });
  expect(checkbox).not.toBeChecked();
  // confirmButton是禁用
  const confirmButton = screen.getByRole("button", { name: /確認訂單/i });
  expect(confirmButton).toBeDisabled();
});

test("Checkbox在第一次單擊時啟用按鈕，再次單擊時停用", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", { name: /訂購規定/i });
  const confirmButton = screen.getByRole("button", { name: /確認訂單/i });

  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

//userEvent 用於模擬使用者與應用程式的互動
test("訂購文字在hover狀態彈出popover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  //popover初始狀態為隱藏：
  //使用queryByText查找它是否存在，並且期望它在初始狀態下是不存在的。
  const nullPopover = screen.queryByText(/沒有任何聖代會送達/i);
  expect(nullPopover).not.toBeInTheDocument();

  //滑入時popover顯示：
  //使用getByText來確保它已經顯示在DOM中，並進行後續的斷言。
  const termsAndConditions = screen.getByText(/訂購規定/i);
  await user.hover(termsAndConditions); //userEvent APIs會回傳Promise 因此使用await等待解析 
  const popover = screen.getByText(/沒有任何聖代會送達/i);
  expect(popover).toBeInTheDocument();

  //滑出時popover消失：
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});