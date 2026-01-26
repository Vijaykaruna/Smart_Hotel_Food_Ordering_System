import { useParams } from "react-router-dom";

import Dosa from "../../assets/dosa.png";
import logo from "../../assets/logo.png";

import Form from "react-bootstrap/Form";

import { FaShoppingCart } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";

import { useGuest } from "../../hooks/useGuest.js";

import GuestToastModal from "../../components/Guest.Toast.jsx";

import ModalGuestVerify from "../../components/Guest.VerifyModal.jsx";
import GuestOrderConformation from "./GuestOrderConformation.jsx";
import GuestOrderDetails from "./GuestOrderDetails.jsx";

const Guest = () => {
  const { userId } = useParams();

  const guest = useGuest(userId);

  if (guest.navigateCartPage) {
    return <GuestOrderConformation guest={guest} />;
  }
  if (guest.navigateOrderListPage) {
    return <GuestOrderDetails guest={guest} />;
  }
  const foods = guest.getActiveFoods(guest.activeCategory);

  return (
    <div className={`container`}>
      <div className="d-flex justify-content-between align-items-center border-secondary border-1 border-bottom px-2">
        <a href="#">
          <img src={logo} alt="logo" className="img-fluid" />
        </a>
        <div className="d-flex justify-content-between align-items-center gap-4">
          <button
            className="btn position-relative"
            onClick={guest.handlefetchOrderList}
            disabled={!guest.guestVerification}
          >
            <FaShoppingCart className="fs-3" />
            {guest.cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {guest.cartCount}
              </span>
            )}
          </button>
          <button
            className="btn btn-danger"
            onClick={() => guest.setShowReportModal(true)}
          >
            <MdReportProblem className="fs-4" />
          </button>
        </div>
      </div>
      <div className="container-fluid bg-secondary bg-opacity-10 text-center shadow-lg h-100">
        <div className="d-flex justify-content-between align-items-center gap-2">
          <div className="d-flex align-items-center col-6 col-lg-3 flex-column">
            <p className="pt-3 fw-bold">Category</p>
            <Form.Select
              aria-label="Select food category"
              className="ps-4 border border-1 border-dark"
              value={guest.activeCategory}
              onChange={(e) => guest.setActiveCategory(e.target.value)}
            >
              {guest.category.map((c, index) => (
                <option key={index} value={c.label}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="d-flex align-items-center col-6 col-lg-3 flex-column">
            <p className="pt-3 fw-bold">Room No</p>
            <Form.Select
              aria-label="Default select example"
              className="ps-4 border border-1 border-dark"
              value={guest.selectRoom}
              onChange={(e) => guest.setSelectRoom(Number(e.target.value))}
            >
              <option className="text-secondary" value={0}>
                Select Room
              </option>
              {Array.from(
                { length: guest.hotelDetails?.rooms || 0 },
                (_, i) => {
                  const roomNumber = 100 + i;
                  return (
                    <option key={roomNumber} value={roomNumber}>
                      {roomNumber}
                    </option>
                  );
                },
              )}
            </Form.Select>
          </div>
        </div>
        <div className="tab-content text-dark mt-3">
          {guest.activeCategory && (
            <div>
              <p className="h3 my-3">{`${guest.activeCategory} Items`}</p>
              <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered align-middle">
                  <thead className="border">
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {foods.map((item) => {
                      const qty = guest.getQty(item._id);
                      return (
                        <tr key={item._id}>
                          <td>
                            <img src={Dosa} alt="food" className="img-fluid" />
                          </td>
                          <td>{item.title}</td>
                          <td>Rs.{item.price}</td>

                          <td className="d-flex gap-2 align-items-center justify-content-center py-4">
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => guest.decreaseQty(item)}
                              disabled={qty === 0}
                            >
                              -
                            </button>

                            <span>{qty}</span>

                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => guest.increaseQty(item)}
                              disabled={qty === 0}
                            >
                              +
                            </button>
                          </td>

                          <td>
                            {qty > 0 ? (
                              <button
                                className="btn btn-success btn-sm"
                                disabled
                              >
                                Added
                              </button>
                            ) : (
                              <button
                                className="btn btn-danger btn-sm px-3"
                                onClick={() => guest.handleAddBTN(item)}
                              >
                                Add
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <div className="p-3 fixed-bottom bottom-0 start-50 translate-middle-x">
          <button
            className="btn btn-danger px-5 shadow-lg"
            onClick={guest.handleGotoCartPage}
            disabled={guest.cartCount === 0}
          >
            Goto Cart
          </button>
        </div>
      </div>
      <div className="text-center d-flex justify-content-center align-items-center">
        {guest.showAddBTN && (
          <GuestToastModal
            type="danger"
            message="Room Number must be selected"
          />
        )}
        {guest.showGuestVerify && <ModalGuestVerify useGuest={guest} />}
      </div>
    </div>
  );
};

export default Guest;
