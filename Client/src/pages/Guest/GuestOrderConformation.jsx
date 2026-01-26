import Dosa from "../../assets/dosa.png";
import logo from "../../assets/logo.png";
import GuestAlertmentModal from "../../components/GuestAlertmentModal.jsx";

const GuestOrderConformation = ({ guest }) => {
  const handleGoBack = () => {
    guest.setCart({});
    guest.setNavigateCartage(false);
    guest.setNavigateOrderListPage(false);
  };

  return (
    <div className="container">
      <div className="border-secondary border-1 border-bottom px-4">
        <a href="#profile">
          <img src={logo} alt="logo" className="img-fluid" />
        </a>
      </div>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center border-bottom">
          <p className="p-2 mt-3 text-decoration-underline fw-bold">
            <span>Total Amount:</span>
            {` Rs ${guest.totalAmount}`}
          </p>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleGoBack}
          >
            Back
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="border text-center">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody className="table-group-divider text-center">
              {Object.values(guest.cart).map((food) => (
                <tr key={food.foodId}>
                  <td>
                    <img src={Dosa} alt="food" className="img-fluid" />
                  </td>
                  <td>{food.title}</td>
                  <td>{`Rs. ${food.price}`}</td>
                  <td>{food.quantity}</td>
                  <td>{`Rs. ${(food.quantity * food.price).toFixed(2)}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 fixed-bottom bottom-0 start-50 translate-middle-x">
          <button
            className="btn btn-danger px-5"
            onClick={() => guest.setShowAlertmentModal(true)}
          >
            Order
          </button>
        </div>
      </div>
      {guest.showAlertmentModal && <GuestAlertmentModal useGuest={guest} />}
    </div>
  );
};

export default GuestOrderConformation;
