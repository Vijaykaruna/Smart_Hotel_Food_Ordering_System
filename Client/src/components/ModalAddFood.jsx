import { Modal as AddFoodModal } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { useModalAddFood } from "../hooks/useModal.js";

const ModalAddFood = ({ useFood }) => {
  const {
    showAddFoodModal,
    setShowAddFoodModal,
    handleAddFood,
    handleUpdateFood,
    editingFood,
  } = useFood;

  const { addFoodDetails, setAddFoodDetails } = useModalAddFood(editingFood);

  return (
    <AddFoodModal
      show={showAddFoodModal}
      onHide={() => setShowAddFoodModal(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <AddFoodModal.Header closeButton>
        <AddFoodModal.Title>Add Foods</AddFoodModal.Title>
      </AddFoodModal.Header>
      <AddFoodModal.Body className="d-flex flex-column gap-2 bg-secondary bg-opacity-10">
        <FloatingLabel controlId="floatingFoodName" label="Name of the foods">
          <Form.Control
            type="text"
            placeholder="Name"
            value={addFoodDetails.title}
            onChange={(e) =>
              setAddFoodDetails((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            required
          />
        </FloatingLabel>
        <Form.Select
          aria-label="Default select example"
          value={addFoodDetails.category}
          onChange={(e) =>
            setAddFoodDetails((prev) => ({
              ...prev,
              category: e.target.value,
            }))
          }
        >
          <option>Select the Category</option>
          <option value="BreakFast">BreakFast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Refreshment">Refreshment</option>
        </Form.Select>
        <FloatingLabel controlId="floatingFoodPrice" label="Price of the foods">
          <Form.Control
            type="number"
            placeholder="price"
            value={addFoodDetails.price}
            onChange={(e) =>
              setAddFoodDetails((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }))
            }
            required
          />
        </FloatingLabel>
      </AddFoodModal.Body>
      <AddFoodModal.Footer>
        <Button variant="secondary" onClick={() => setShowAddFoodModal(false)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            editingFood
              ? handleUpdateFood(editingFood._id, addFoodDetails)
              : handleAddFood(addFoodDetails)
          }
        >
          {editingFood ? "Update" : "Add"}
        </Button>
      </AddFoodModal.Footer>
    </AddFoodModal>
  );
};

export default ModalAddFood;
