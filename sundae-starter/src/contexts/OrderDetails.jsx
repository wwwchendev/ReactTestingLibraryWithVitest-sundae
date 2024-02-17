import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

// 建立自訂鉤子來檢查是否在Provider有效作用域中
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);
  if (!contextValue) {
    throw new Error("useOrderDetails需在有效作用域中調用");
  }
  return contextValue;
}

export function OrderDetailsProvider(props) {
  //訂單內容
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, // example: { Chocolate: 1, Vanilla: 2 }
    toppings: {}, // example: { "Gummi Bears": 1 }
  });

  //更新訂單內容
  function updateItemCount(itemName, newItemCount, optionType) {
    //寫法一：React推薦寫法，更新狀態的過程在一個函數內完成，並且依賴先前的狀態。這種方式通常更安全可靠。
    setOptionCounts((previousOptionCounts) => ({
      ...previousOptionCounts,
      [optionType]: {
        ...previousOptionCounts[optionType],
        [itemName]: newItemCount,
      },
    }));

    //寫法二：比較直觀但可能會有狀態過期覆蓋等淺在問題
    // see https://www.udemy.com/course/react-testing-library/learn/#questions/18721990/
    // const newOptionCounts = { ...optionCounts };
    // newOptionCounts[optionType][itemName] = newItemCount;
    // setOptionCounts(newOptionCounts);
  }

  //清空訂單內容
  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  //從訂單內容狀態值算出總計金額的方法
  function calculateTotal(optionType) {
    // 取得基底或配料的數量陣列 (for example, [1, 2])
    const countsArray = Object.values(optionCounts[optionType]);
    // 算出數量加總 
    const totalCount = countsArray.reduce((total, value) => total + value, 0);
    // 數量加總和對應的價格常數相乘
    return totalCount * pricePerItem[optionType];
  }

  //總計
  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}