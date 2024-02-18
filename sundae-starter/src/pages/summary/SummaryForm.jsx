import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export default function SummaryForm({ setOrderPhase }) {
  const [tcChecked, setTcChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>沒有任何聖代會送達</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      我已閱讀並同意
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "#05eeff" }}> 訂購規定</span>
      </OverlayTrigger>
    </span>
  );

  function handleSubmit(event) {
    event.preventDefault();
    setOrderPhase("completed");
  }


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        確認訂單
      </Button>
    </Form>
  );
}