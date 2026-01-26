import Modal from "react-bootstrap/Modal";
import { QRCodeCanvas } from "qrcode.react";

const QRModal = ({ useMain }) => {
    const Main = useMain; 
  return (
    <Modal show={Main.showQR} centered onHide={() => Main.setShowQR(false)}>
      <Modal.Header closeButton>
        <Modal.Title>QR Code</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <QRCodeCanvas className="p-2 border border-2"
          value={Main.link}
          size={200}
        />
      </Modal.Body>
    </Modal>
  );
};
export default QRModal;
