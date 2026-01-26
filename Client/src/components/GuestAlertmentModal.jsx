import { Modal as GuestAlert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
const GuestAlertmentModal = ({ useGuest }) => {
  return (
    <GuestAlert
      show={useGuest.showAlertmentModal}
      onHide={() => useGuest.setShowAlertmentModal(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <GuestAlert.Header closeButton>
        <GuestAlert.Title>Conformation</GuestAlert.Title>
      </GuestAlert.Header>
      <GuestAlert.Body>
        <p className="fw-bold text-center border bg-body-secondary ">{`Total Amount: Rs.${useGuest.totalAmount}`}</p>
        <p className="text-center font-monospace">
          "You can pay the amount when you check out; it will be added to your
          room bill."
        </p>
        <p className="text-center text-danger fst-italic">
          Thank you for ordering!
        </p>
      </GuestAlert.Body>
      <GuestAlert.Footer>
        <Button variant="secondary" onClick={() => useGuest.setShowAlertmentModal(false)}>
          Close
        </Button>
        <Button variant="danger" onClick={useGuest.handleGuestOrder}>
          Order
        </Button>
      </GuestAlert.Footer>
    </GuestAlert>
  );
};

export default GuestAlertmentModal;
