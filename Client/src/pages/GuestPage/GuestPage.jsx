import { FaPlusCircle } from "react-icons/fa";

import Button from "react-bootstrap/Button";
import { useGuestPage } from "../../hooks/useGuestPage";
import ModalAddGuest from "../../components/ModalAddGuest.jsx";

const GuestPage = ({ guestControl, triggerToast }) => {
  const useGuest = useGuestPage({ guestControl });

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container-fluid">
      <div className="rounded-2 my-3 px-lg-5 px-1 py-2 col-12 bg-light shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="h5 my-4">Guest Details</p>
          <Button onClick={() => useGuest.setShowAddGuestModal(true)}>
            <FaPlusCircle className="fs-4" /> Add Guest
          </Button>
        </div>

        {useGuest.showAddGuestModal && (
          <ModalAddGuest useGuest={useGuest} triggerToast={triggerToast} />
        )}

        <div className="table-responsive">
          <table className="table table-bordered table-hover table-striped align-middle">
            <thead className="border">
              <tr className="text-center">
                <th>Name</th>
                <th>Mobile</th>
                <th>Room</th>
                <th>Guests</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>isStay</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {useGuest.guestDetailsList.map((guest) => (
                <tr key={guest._id} className="text-center">
                  <td>{guest.name}</td>
                  <td>{guest.mobile}</td>
                  <td>{guest.roomNumber}</td>
                  <td>{guest.guests}</td>
                  <td>{formatDate(guest.checkIn)}</td>
                  <td>{formatDate(guest.checkOut)}</td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      {guest.isStay === "Yes" ? (
                        <Button
                          variant="success"
                          onClick={() => useGuest.handleUpdateStay(guest._id)}
                        >
                          Yes
                        </Button>
                      ) : (
                        <Button variant="danger" disabled>
                          No
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-center text-secondary">
            If click the "<span className="text-success">Yes</span>" button, to change the stay status to "<span className="text-danger">No</span>".
          </p>
        </div>
      </div>
    </div>
  );
};
export default GuestPage;
