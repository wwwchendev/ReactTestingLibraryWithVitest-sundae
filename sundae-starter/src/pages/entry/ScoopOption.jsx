import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { displaySundaeName } from '../../utilities';

export default function ScoopOptions({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    const currentValue = event.target.value;
    const currentValueFloat = parseFloat(currentValue); //確保使用數字而不是字串進行驗證

    //檢查數值是否有效
    const valueIsValid = 0 <= currentValueFloat
      && currentValueFloat <= 10
      && Math.floor(currentValueFloat) === currentValueFloat;
    setIsValid(valueIsValid);

    // 如果數值有效則使用更新數值； 如果無效更新數值為0
    const newValue = valueIsValid ? parseInt(currentValue) : 0;
    updateItemCount(name, newValue, "scoops");
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
        className='align-items-center'
      >
        <Form.Label
          column
          xs="6"
          style={{ textAlign: "right" }}
        >
          {displaySundaeName(name, 'scoop')}
          <p>{name}</p>
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}