import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { displaySundaeName } from '../../utilities';

export default function ToppingOption({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e) => {
    updateItemCount(name, e.target.checked ? 1 : 0, "toppings");
  };

  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
        className='align-items-center text-nowrap text-center'
      >
        <div className='d-flex justify-content-center'>
          <Form.Check type="checkbox" onChange={handleChange} label={name} />
          <p className='text-center ms-2 mb-0'>{displaySundaeName(name, 'topping')}</p>
        </div>
        <p>{name}</p>
      </Form.Group>
    </Col>
  );
}