// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
import logo from "../../assets/logo.png";

const GuestOrderDetails = ({ guest }) => {
  const handleGoBack = () => {
    guest.setNavigateOrderListPage(false);
  };
  const handleGoBackHome = () => {
    guest.setNavigateCartage(false);
    guest.setNavigateOrderListPage(false);
  };

  return (
    <div className="container">
      <div className="border-secondary border-1 border-bottom px-4 d-flex justify-content-between align-items-center">
        <a href="#profile">
          <img src={logo} alt="logo" className="img-fluid" />
        </a>
        <button className="btn btn-danger btn-sm" onClick={handleGoBack}>
          Back
        </button>
      </div>
      <div className="container-fluid bg-secondary bg-opacity-10">
        <p className="fw-bold">Order Details:</p>
          <p className="text-decoration-underline fw-bold">
              <span>Total Amount: Rs. </span>
              {guest?.guestOrderList
                ?.reduce((sum, order) => sum + order.totalAmount, 0)
                .toFixed(2)}
            </p>
        <div className="table-responsive my-4 border">
          <table className="table table-striped table-hover table-bordered align-middle">
            <thead className="border text-center">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {guest?.guestOrderList?.map((order) =>
                order?.foods?.map((food, index) => (
                  <tr key={order._id + index}>
                    <td>{food.title}</td>
                    <td>{order.date}</td>
                    <td>Rs. {food.price}</td>
                    <td>{food.quantity}</td>
                    <td>Rs. {(food.price * food.quantity).toFixed(2)}</td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-center font-monospace text-secondary">
        "If you have any doubt, Please contact management"
      </p>
      <p className="text-center font-monospace text-secondary">
        "Contact Number : 98765 43210"
      </p>
      <div className="my-2 d-flex justify-content-center fixed-bottom bottom-0 start-50 translate-middle-x">
        <button
          className="btn btn-danger px-5"
            onClick={handleGoBackHome}
        >
          Back to Food
        </button>
      </div>
      <div>
        {/* <form
          onSubmit={(e) => {
            e.preventDefault();
            // AddComments();
          }}
        >
          <FloatingLabel controlId="floatingTextarea2" label="Comments">
            <Form.Control
              as="textarea"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              className="bg-secondary border border-dark bg-opacity-25"
            />
          </FloatingLabel>
          <button
            className="btn btn-sm btn-primary float-end m-1"
            type="submit"
          >
            Submit
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default GuestOrderDetails;
