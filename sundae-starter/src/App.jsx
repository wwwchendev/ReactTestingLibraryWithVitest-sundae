import { useState } from "react";
import Container from "react-bootstrap/Container";
//元件
import OrderEntry from "./pages/entry/OrderEntry";
// import OrderSummary from "./pages/summary/OrderSummary";
// import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
//context
import { OrderDetailsProvider } from "./contexts/OrderDetails";

export default function App() {
  //狀態管理-訂單階段
  const [orderPhase, setOrderPhase] = useState("inProgress");
  let Component = OrderEntry;  //頁面初始化
  //設定訂單階段顯示不同元件
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    // case "review":
    //   Component = OrderSummary;
    //   break;
    // case "completed":
    //   Component = OrderConfirmation;
    //   break;
    // default:
  }

  return (
    <OrderDetailsProvider>
      <Container>
        <h1 className='text-center'>專屬繽紛聖代</h1>
        <p className='text-center'>Sundaes On Demand</p>
        {<Component setOrderPhase={setOrderPhase} />}
      </Container>
    </OrderDetailsProvider>
  );
}