import { Modal as AddGuestModal, Button, Form } from "react-bootstrap";
import { useModalAddGuest } from "../hooks/useModal.js";

const ModalAddGuest = ({ useGuest, triggerToast }) => {
  const useModal = useModalAddGuest({ useGuest, triggerToast });

  return (
    <AddGuestModal
      show
      onHide={() => {
        useGuest.setShowAddGuestModal(false);
      }}
    >
      <AddGuestModal.Header closeButton>
        <AddGuestModal.Title>Add Guest Booking</AddGuestModal.Title>
      </AddGuestModal.Header>
      <AddGuestModal.Body>
        <Form>
          {useModal.formFields.map((form) =>
            form.name !== "roomNumber" ? (
              <Form.Group key={form.id} className="mb-2">
                <Form.Label>{form.label}</Form.Label>
                <Form.Control
                  name={form.name}
                  type={form.type}
                  placeholder={form.placeholder}
                  value={form.value}
                  onChange={form.onChange}
                  required
                />
              </Form.Group>
            ) : (
              <Form.Group key={form.id} className="mb-2">
                <Form.Label>{form.label}</Form.Label>

                <Form.Select
                  name={form.name}
                  value={form.value}
                  onChange={form.onChange}
                  required
                >
                  <option value="">Select Room</option>
                  <option value={100}>100</option>
                  <option value={101}>101</option>
                  <option value={102}>102</option>
                  <option value={103}>103</option>
                  <option value={104}>104</option>
                </Form.Select>
              </Form.Group>
            ),
          )}
        </Form>
      </AddGuestModal.Body>
      <AddGuestModal.Footer>
        <Button
          variant="secondary"
          onClick={() => useGuest.setShowAddGuestModal(false)}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={useModal.newGuestDetails}>
          Add Booking
        </Button>
      </AddGuestModal.Footer>
    </AddGuestModal>
  );
};

export default ModalAddGuest;
