import Footer from "~/component/footer";
import Navbar from "~/component/navbar";
import styles from "../styles/checkout.css";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookies";
import { postAPI } from "~/utils/api";
import { viewCart } from "~/controllers/cartController";
import { domain } from "~/utils/domain";

const Checkout = () => {
  const [alreadyAcc, setAlreadyAcc] = useState(false);
  const [userData, setUserData] = useState({
    loggedIn: false,
    userData: {
      name: "",
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      country: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
    cartId: "",
  });
  const [cartList, setCartList] = useState([]);

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    {
      console.log(cartList);
      setCartTotal(0);
      cartList.length > 0 &&
        cartList.map((cart) => {
          if (cart?.offerPrice > 0) {
            setCartTotal(
              (total) => total + Number(cart?.offerPrice) * cart?.quantity
            );
          } else {
            setCartTotal(
              (total) => total + Number(cart?.price) * cart?.quantity
            );
          }
        });
    }
  }, [cartList]);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    console.log("line 56", userData);
  }, [userData]);

  const viewCartById = async (uid) => {
    const response = await viewCart(uid);
    if (response) {
      console.log("response 57 ", response);
      setUserData((prev) => {
        return {
          ...prev,
          cartId: response?.cart[0]?._id,
        };
      });
      if (response?.productList.length > 0) {
        await setCartList(response?.productList);
      }
    }
  };

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
          setUserData((prev) => {
            return {
              ...prev,
              userData: {
                ...prev.userData,
                name: prev?.userData?.firstName + prev?.userData?.lastName,
              },
            };
          });

          viewCartById(JSON.parse(res)?._id);
        }
      });
    } catch (err) {}
  };

  const [orderId, setOrderId] = useState("");

  const createOrder = async (i = 1) => {
    try {
      const body = {
        amount:
          i == 1
            ? ((cartTotal + (cartTotal * 18) / 100) * 100).toFixed(2)
            : 100 * 100, // amount in paise (e.g., 50000 paise = INR 500)
        currency: "INR",
      };
      const response = await postAPI(
        `${domain}/api/order/create`,
        JSON.stringify(body)
      );
      setOrderId(response.id);
      handlePayment(i, response.id);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handlePayment = async (i, oid) => {
    // Use Razorpay.js to handle payment on the client side
    const options = {
      key: "rzp_test_MqoMJgNy2RIv4g",
      amount:
        i == 1
          ? ((cartTotal + (cartTotal * 18) / 100) * 100).toFixed(2)
          : 100 * 100, // amount in paise (e.g., 50000 paise = INR 500)
      currency: "INR",
      name: userData?.userData?.name,
      cartId: userData?.cartId,
      description: "PieClothing Store",
      order_id: orderId || oid,
      handler: async function (response) {
        console.log("Payment success:", response);
        // You can handle success callback here
        const body = {
          order_id: orderId,
          payment_id: response?.razorpay_payment_id,
          amountPaid:
            i == 1 ? (cartTotal + (cartTotal * 18) / 100).toFixed(2) : 100,
          amountRemaining:
            i == 1 ? 0 : (cartTotal + (cartTotal * 18) / 100).toFixed(2) - 100,
          name: userData?.userData?.name,
          email: userData?.userData?.email,
          phone: userData?.userData?.phone,
          deliveryAdd: {
            country: userData?.userData?.country,
            address: userData?.userData?.address,
            city: userData?.userData?.city,
            state: userData?.userData?.state,
            pincode: userData?.userData?.pincode,
          },
          cartList: cartList,
          cartId: userData?.cartId,
          uid: userData?.userData?._id,
        };
        const responseOrder = await postAPI(
          `${domain}/api/order/orderdata`,
          JSON.stringify(body)
        );
        console.log("Bodyyyy", body);
        if (responseOrder) {
          console.log("responseorder", responseOrder);
        }
      },
      prefill: {
        name: userData?.userData?.name,
        email: userData?.userData?.email,
        contact: userData?.userData?.phone,
      },
      notes: {
        address: "PIE Clothing",
      },
      theme: {
        color: "#000000",
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
                onChange={(e) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      userData: {
                        ...prev.userData,
                        name: e.target.value,
                      },
                    };
                  })
                }
                value={
                  userData?.userData?.name ||
                  userData?.userData?.firstName +
                    " " +
                    userData?.userData?.lastName
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
                      userData: {
                        ...prev.userData,
                        email: e.target.value,
                      },
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
                      userData: {
                        ...prev.userData,
                        phone: e.target.value,
                      },
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
            <input
              type="text"
              placeholder="Country"
              onChange={(e) =>
                setUserData((prev) => {
                  return {
                    ...prev,
                    userData: {
                      ...prev.userData,
                      country: e.target.value,
                    },
                  };
                })
              }
            />
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Address"
              onChange={(e) =>
                setUserData((prev) => {
                  return {
                    ...prev,
                    userData: {
                      ...prev.userData,
                      address: e.target.value,
                    },
                  };
                })
              }
            />
          </div>
          <div className="input-group">
            <div className="input">
              <input
                type="text"
                placeholder="City"
                onChange={(e) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      userData: {
                        ...prev.userData,
                        city: e.target.value,
                      },
                    };
                  })
                }
              />
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="State"
                onChange={(e) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      userData: {
                        ...prev.userData,
                        state: e.target.value,
                      },
                    };
                  })
                }
              />
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Pin Code"
                onChange={(e) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      userData: {
                        ...prev.userData,
                        pincode: e.target.value,
                      },
                    };
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="gs-payy">
          <div className="payment-group">
            <table border={1}>
              <thead>
                <tr>
                  <th>Sub Total</th>
                  <th>Rs.{cartTotal.toFixed(2)}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>GST</td>
                  <td>Rs.{((cartTotal * 18) / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>Rs.{(cartTotal + (cartTotal * 18) / 100).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <p onClick={() => createOrder(1)}>
              Pay With GPay / Phone Pay / UPI / Debit Card / Credit Card
            </p>
            <p onClick={() => createOrder(0)}>
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
