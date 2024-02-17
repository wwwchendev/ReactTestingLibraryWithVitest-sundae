import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from '../../constants';
import { formatCurrency } from '../../utilities';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  // optionType 可能是 'scoops' 或 'toppings
  useEffect(() => {
    //明確卸載元件->在清除函數中使用AbortController中止非同步操作
    const controller = new AbortController();
    axios
      .get(`http://localhost:3030/${optionType}`, { signal: controller.signal })
      .then((response) => setItems(response.data))
      .catch((error) => {
        if (error.name !== 'CanceledError') setError(true)
      });

    return () => { controller.abort(); }
  }, [optionType]);

  if (error) { return <AlertBanner variant={'danger'} />; }

  // 如果是scoop的資料才渲染
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType === "scoops" ? '聖代基底' : '配料'

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <>
    <div className='d-flex align-items-baseline'>
      <h2 className='me-3'>{title}</h2>
      <span>每項 {formatCurrency(pricePerItem[optionType])}</span>
    </div>
    <p>{title} 小計: {formatCurrency(totals[optionType])}</p>
    <Row className='mb-4'>{optionItems}</Row>
  </>;
}
