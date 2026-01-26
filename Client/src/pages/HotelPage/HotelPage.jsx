import { useEffect } from "react";

import ModalAlertment from "../../components/ModalAlertment.jsx";
import ModalTable from "../../components/ModalTable.jsx";

import { useHotelPage } from "../../hooks/useHotelPage.js";
import { useModalTable } from "../../hooks/useModal.js";

const HotelPage = ({ hotelControl, useAuth }) => {
  const { modal, openModal, onClose } = useModalTable();

  const useHotel = useHotelPage({ hotelControl, openModal });

  useEffect(() => {
    if (useAuth.user.isAdmin) {
      hotelControl.getAllHotelDetails();
    } else {
      hotelControl.getHotelDetails();
    }
  }, []);
  return (
    <div className="container-fluid rounded-2 my-1 mx-4 px-lg-5 px-1 py-2 col-12 bg-light mx-auto shadow-lg">
      <p className="h5 my-3">Subscription</p>
      {useAuth.user.isAdmin ? (
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered align-middle">
            <thead className="border">
              <tr className="text-center">
                <th scope="col">User</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Rooms</th>
                <th scope="col">Subscription</th>
                <th scope="col">Hotel</th>
                <th scope="col">Address</th>
                <th scope="col">Active plan</th>
                <th scope="col">Actived Date</th>
                <th scope="col">Deactive Date</th>
                <th scope="col">Plans history</th>
              </tr>
            </thead>
            <tbody>
              {hotelControl.allHotelDetails.map((hotel) => {
                const lastPlan =
                  hotel.subcripedHistory.length > 0
                    ? hotel.subcripedHistory[hotel.subcripedHistory.length - 1]
                    : null;
                return (
                  <tr key={hotel._id} className="text-center">
                    <td>{hotel.user}</td>
                    <td>{hotel.email}</td>
                    <td>{hotel.mobile}</td>
                    <td>{hotel.rooms}</td>
                    <td>
                      {hotel.isSubscripe === true ? (
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            useHotel.handleShowSubcriptionModal(
                              hotel._id,
                              false,
                            )
                          }
                        >
                          Active
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            useHotel.handleShowSubcriptionModal(hotel._id, true)
                          }
                        >
                          Inactive
                        </button>
                      )}
                    </td>
                    <td>{hotel.hotel}</td>
                    <td>{hotel.address}</td>
                    <td>{lastPlan?.planDetails || "-"}</td>
                    <td>{lastPlan?.activeDate || "-"}</td>
                    <td>{lastPlan?.deActiveDate || "-"}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          useHotel.HandleShowPlanDetails(hotel.subcripedHistory)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-center text-secondary">
            If click the "Inactive" button, to change the subscribe status to
            "Active".
          </p>
        </div>
      ) : (
        <div>
          {hotelControl.hotelDetails.isSubscripe === false ? (
            <p className="text-center text-danger fs-5 fw-bold">
              <mark className="bg-warning">
                " Your account subscription has expired. Please renew to
                continue enjoying our services. "
              </mark>
            </p>
          ) : (
            <p className="text-center text-danger fs-5 fw-bold">
              <mark className="bg-success">
                " Your account has been successfully subscribed. You can now
                enjoy all our services and features. "
              </mark>
            </p>
          )}
          <div>
            <p className="h5 my-3">Plans History</p>
            <table className="table table-striped table-hover table-bordered align-middle">
              <thead>
                <tr className="text-center">
                  <th>Plan</th>
                  <th>Active Date</th>
                  <th>Deactive Date</th>
                </tr>
              </thead>
              <tbody>
                {hotelControl.hotelDetails.subcripedHistory?.length > 0 ? (
                  hotelControl.hotelDetails.subcripedHistory.map((plan, i) => (
                    <tr key={i} className="text-center">
                      <td>{plan.planDetails}</td>
                      <td>{plan.activeDate}</td>
                      <td>{plan.deActiveDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">
                      No subscription history found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {useHotel.selectedUser && (
        <ModalAlertment
          user={useHotel.selectedUser}
          type={useHotel.updateSubscripe ? "subscribe" : "de-subscribe"}
          onClose={useHotel.closeAlertment}
          onChange={useHotel.handleUpdateHotelSubcription}
        />
      )}
      {modal && (
        <ModalTable
          title={modal.title}
          content={modal.content}
          type={modal.type}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default HotelPage;
