import Footer from "~/component/footer";
import Navbar from "~/component/navbar";
import styles from "../styles/checkout.css";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookies";
import { postAPI } from "~/utils/api";

const Checkout = () => {
  const [alreadyAcc, setAlreadyAcc] = useState(false);
  const [userData, setUserData] = useState({
    loggedIn: false,
    userData: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      await getCookie("UD").then((res) => {
        if (JSON.parse(res)?.email) {
          setUserData((prev) => {
            return {
              ...prev,
              loggedIn: true,
              userData: JSON.parse(res),
            };
          });
        }
      });
    } catch (err) {}
  };

  const [orderId, setOrderId] = useState("");

  const createOrder = async () => {
    try {
      const response = await postAPI("http://localhost:4000/api/order/create");
      setOrderId(response.data.id);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handlePayment = () => {
    // Use Razorpay.js to handle payment on the client side
    const options = {
      key: "rzp_test_MqoMJgNy2RIv4g",
      amount: 50000, // amount in paise (e.g., 50000 paise = INR 500)
      currency: "INR",
      name: "Your Company Name",
      description: "Purchase Description",
      order_id: orderId,
      handler: function (response) {
        console.log("Payment success:", response);
        // You can handle success callback here
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9876543210",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Navbar />
      <div className="gs-checkout">
        <div className="gs-form">
          <h1>Checkout </h1>
          <>
            <div className="input">
              <input
                type="text"
                placeholder="Name"
                value={userData?.userData?.name}
                onChange={(e) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      name: e.target.value,
                    };
                  })
                }
              />
            </div>
            <div className="input">
              <input
                type="email"
                placeholder="Email"
                value={userData?.userData?.email}
                onChange={(e) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      email: e.target.value,
                    };
                  })
                }
              />
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Phone"
                value={userData?.userData?.phone}
                onChange={(e) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      phone: e.target.value,
                    };
                  })
                }
              />
            </div>
          </>
          {/* 
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
          )} */}

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

            <p onClick={() => createOrder()}>
              Pay With GPay / Phone Pay / UPI / Debit Card / Credit Card
            </p>
            <p onClick={() => handlePayment()}>
              Cash On Delivery <span>(Rs.100 Extra Online)</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
      {/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}
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
