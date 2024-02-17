import Options from "./Options";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();

  // 如果訂單中沒有任何基底，則禁用訂單按鈕
  const orderDisabled = totals.scoops === 0;

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>總計: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button disabled={orderDisabled} onClick={() => setOrderPhase("review")}>
        提交訂單
      </Button>
    </div>
  );
}