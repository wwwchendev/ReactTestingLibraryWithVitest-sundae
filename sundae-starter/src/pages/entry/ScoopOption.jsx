import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function ScoopOptions({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e) =>
    updateItemCount(name, parseInt(e.target.value), "scoops");

  const displayFlavor = {
    'Mint chip': '薄荷巧克力',
    'Vanilla': '香草',
    'Chocolate': '巧克力',
    'Salted caramel': '海鹽焦糖'
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
          {`${displayFlavor[name]} `}
          <p>{name}</p>
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            min={0}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}