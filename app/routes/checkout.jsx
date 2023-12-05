import Footer from "~/component/footer";
import Navbar from "~/component/navbar";
import styles from "../styles/checkout.css";
import { useState } from "react";
const Checkout = () => {
  const [alreadyAcc, setAlreadyAcc] = useState(false);

  return (
    <>
      <Navbar />
      <div className="gs-checkout">
        <div className="gs-form">
          <h1>Checkout </h1>

          {alreadyAcc ? (
            <h4>
              Log In{" "}
              <span onClick={() => setAlreadyAcc(false)}>
                Create An Account
              </span>
            </h4>
          ) : (
            <h4>
              Create An Account{" "}
              <span onClick={() => setAlreadyAcc(true)}>
                Already Have An Account?
              </span>
            </h4>
          )}
          {alreadyAcc ? (
            <>
              <div className="input">
                <input type="email" placeholder="Email" />
              </div>
              <div className="input">
                <input type="password" placeholder="Password" />
              </div>
              <button className="btn-style">Log In</button>
            </>
          ) : (
            <>
              <div className="input">
                <input type="text" placeholder="Name" />
              </div>
              <div className="input">
                <input type="email" placeholder="Email" />
              </div>
              <div className="input">
                <input type="text" placeholder="Phone" />
              </div>
              <div className="input">
                <input type="password" placeholder="Password" />
              </div>
            </>
          )}

          <h3>Delivery</h3>

          <div className="input">
            <input type="text" placeholder="Country" />
          </div>
          <div className="input">
            <input type="text" placeholder="Address" />
          </div>
          <div className="input-group">
            <div className="input">
              <input type="text" placeholder="City" />
            </div>
            <div className="input">
              <input type="text" placeholder="State" />
            </div>
            <div className="input">
              <input type="text" placeholder="Pin Code" />
            </div>
          </div>
        </div>

        <div className="gs-payy">
          <div className="payment-group">
            <table border={1}>
              <thead>
                <tr>
                  <th>Sub Total</th>
                  <th>Rs. 3,4999</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>GST</td>
                  <td>Rs.500</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>Rs.4000</td>
                </tr>
              </tbody>
            </table>

            <p>Pay With GPay / Phone Pay / UPI / Debit Card / Credit Card</p>
            <p>
              Cash On Delivery <span>(Rs.100 Extra Online)</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
