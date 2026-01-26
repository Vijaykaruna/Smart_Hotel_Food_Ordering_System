import { useState } from "react";
import { Modal as GuestVerify } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ModalGuestVerify = ({ useGuest }) => {
  const [mobile, setMobile] = useState("");

  return (
    <GuestVerify
      show={useGuest.showGuestVerify}
      onHide={() => {
        useGuest.setShowGuestVerify(false);
      }}
      centered
    >
      <GuestVerify.Header closeButton>
        <GuestVerify.Title>Guest Verification</GuestVerify.Title>
      </GuestVerify.Header>

      <GuestVerify.Body className="text-center">
        <p className="fw-bold">Room Number : {useGuest.selectRoom}</p>

        <Form.Group className="mb-2">
          <Form.Label>Enter the mobile number</Form.Label>
            <Form.Control
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
        </Form.Group>
      </GuestVerify.Body>

      <GuestVerify.Footer>
        <Button
          variant="primary"
          onClick={() =>
            useGuest.handleGuestVerify(useGuest.selectRoom, mobile)
          }
        >
          Verify
        </Button>
      </GuestVerify.Footer>
    </GuestVerify>
  );
};

export default ModalGuestVerify;
