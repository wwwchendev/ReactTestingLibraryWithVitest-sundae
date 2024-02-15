/* eslint-disable vitest/no-commented-out-tests */
import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("測試初始狀態", () => {
  render(<SummaryForm />);
  // checkbox初始狀態沒有被選取
  const checkbox = screen.getByRole("checkbox", { name: /訂購規定/i });
  expect(checkbox).not.toBeChecked();
  // confirmButton是禁用
  const confirmButton = screen.getByRole("button", { name: /確認訂單/i });
  expect(confirmButton).toBeDisabled();
});

test("Checkbox在第一次單擊時啟用按鈕，再次單擊時停用", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", { name: /訂購規定/i });
  const confirmButton = screen.getByRole("button", { name: /確認訂單/i });

  fireEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  fireEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});