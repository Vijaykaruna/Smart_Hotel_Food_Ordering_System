import { IoCheckmarkSharp } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";

import ModalTable from "../../components/ModalTable.jsx";

import { useOrderPage } from "../../hooks/useOrderPage.js";
import { useModalTable } from "../../hooks/useModal.js";
import { useEffect } from "react";

const OrderPage = ({ orderControl }) => {
  const { modal, openModal, onClose } = useModalTable();

const useOrder = useOrderPage({ orderControl, openModal });

useEffect(() => {
  useOrder.getAllOrders();
}, []);

  return (
    <div className="container-fluid rounded-2 my-3 mx-4 px-lg-5 px-1 py-2 col-12 bg-light mx-auto shadow-lg">
      <p className="h5 my-3">Order List:</p>
      {modal && (
        <ModalTable
          title={modal.title}
          content={modal.content}
          type={modal.type}
          onClose={onClose}
        />
      )}
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="border">
            <tr className="text-center">
              <th scope="col">Name</th>
              <th scope="col">Room No</th>
              <th scope="col">Date</th>
              <th scope="col">Mobile</th>
              <th scope="col">Foods</th>
              <th scope="col">Status</th>
              <th scope="col">Guest Id</th>
            </tr>
          </thead>
          {useOrder.ordersList.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={8} className="text-center text-secondary py-4">
                  "No order"
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="table-group-divider">
              {useOrder.ordersList.map((order) => (
                <tr key={order._id} className="text-center">
                  <td>{order.name}</td>
                  <td>{order.roomNumber}</td>
                  <td>{order.date}</td>
                  <td>{order.mobile}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => useOrder.showOrderById(order._id)}
                    >
                      Show
                    </button>
                  </td>
                  <td>
                    {order.status === "Delivered" ||
                    order.status === "Rejected" ? (
                      order.status === "Delivered" ? (
                        <div className="p-1 bg-success border text-light text-center rounded-2">
                          {order.status}
                        </div>
                      ) : (
                        <div className="p-1 bg-danger border text-light text-center rounded-2">
                          {order.status}
                        </div>
                      )
                    ) : (
                      <>
                        <p className="text-danger text-center">{`"${order.status}"`}</p>
                        <div className="d-flex justify-content-evenly align-items-center">
                          <button
                            onClick={() => useOrder.updateOrderStatus(order._id, "Delivered")}
                            className="btn btn-sm btn-success"
                          >
                            <IoCheckmarkSharp />
                          </button>
                          <button
                            onClick={() => useOrder.updateOrderStatus(order._id, "Rejected")}
                            className="btn btn-sm btn-danger"
                          >
                            <FaXmark />
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                  <td>{"..." + order.guestId.slice(-5)}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <p className="text-center text-secondary my-1">
        "<IoCheckmarkSharp className="text-success" />" - Delivered || "<FaXmark className="text-danger" />" - Rejected
      </p>
    </div>
  );
};
export default OrderPage;
