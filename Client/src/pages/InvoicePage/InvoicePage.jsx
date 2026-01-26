import { useInvoicePage } from "../../hooks/useInvoicePage.js";
import { useModalTable } from "../../hooks/useModal.js";

import ModalTable from "../../components/ModalTable.jsx";
import ModalAlertment from "../../components/ModalAlertment.jsx";

const InvoicePage = ({ guestControl }) => {
  const { modal, openModal, onClose } = useModalTable();

  const useInvoice = useInvoicePage({ guestControl, openModal });

  return (
    <div className="container-fluid rounded-2 my-3 px-lg-5 px-1 py-2 col-12 bg-light mx-auto mx-4 shadow-lg">
      <h5 className="my-4">Invoice:</h5>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="border text-center">
            <tr>
              <th>Guest Name</th>
              <th>Room No</th>
              <th>Mobile</th>
              <th>Total Orders</th>
              <th>View Orders</th>
              <th>Total Amount</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {useInvoice.guestDetailsList.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-secondary py-4">
                  No Guest Details
                </td>
              </tr>
            ) : (
              useInvoice.guestDetailsList.map((guest) => (
                <tr key={guest._id} className="text-center">
                  <td>{guest.name}</td>
                  <td>{guest.roomNumber}</td>
                  <td>{guest.mobile}</td>
                  <td>{guest.orders.length || 0}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => useInvoice.showOrderedListById(guest._id)}
                    >
                      View
                    </button>
                  </td>
                  <td>₹{guest.totalAmount.toFixed(2)}</td>
                  <td>
                    {guest.payment === "Pending" ? (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => useInvoice.showAlertPaymentStatus(guest._id)}
                      >
                        Pending
                      </button>
                    ) : (
                      <button className="btn btn-sm btn-success" disabled>
                        Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {modal && (
        <ModalTable
          title={modal.title}
          content={modal.content}
          type={modal.type}
          onClose={onClose}
        />)}
        {useInvoice.selectedGuest && (
        <ModalAlertment
          user={useInvoice.selectedGuest}
          type="payment"
          onClose={useInvoice.closePaymentModal}
          onChange={useInvoice.markAsPaid}
        />
      )}
      <p className="text-center text-secondary">
        If click the "Pending" button, to change the Payment status to "Paid".
      </p>
    </div>
  );
};

export default InvoicePage;
