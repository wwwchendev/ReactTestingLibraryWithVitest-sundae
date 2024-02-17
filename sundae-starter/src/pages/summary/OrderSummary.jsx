import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency, displaySundaeName } from "../../utilities";

export default function OrderSummary({ setOrderPhase }) {
  const { totals, optionCounts } = useOrderDetails();

  // 將scoops物件->陣列->jsx
  // optionCounts.scoops= { Chocolate: 2, Vanilla: 1, Strawberry: 3 } 
  // 方法1:
  const scoopKeys = Object.keys(optionCounts.scoops);
  const scoopList = scoopKeys.map((key) => (
    <li key={key}>
      {`${displaySundaeName(key, 'scoop')} * ${optionCounts.scoops[key]}球`}
    </li>
  ));
  // 方法2:
  // const scoopArray = Object.entries(optionCounts.scoops);
  // const scoopList = scoopArray.map(([key, value]) => (
  //   <li key={key}>
  //     {`${displaySundaeName(key,'scoop')} * ${value}球`}
  //   </li>
  // ));

  // 只有有選擇配料的時候(配料總數不為0)才會出現配料清單
  const hasToppings = totals.toppings > 0;
  let toppingsDisplay = null;
  if (hasToppings) {
    const toppingsArray = Object.keys(optionCounts.toppings);
    const toppingList = toppingsArray.map((key) => <li key={key}>{displaySundaeName(key, 'topping')}</li>);
    toppingsDisplay = (
      <>
        <h2>配料: {formatCurrency(totals.toppings)}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <div className='mt-5'>
      <h1>訂購明細</h1>
      <h2>聖代基底: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}