import AdminHeader from "~/component/adminHeader";
import AdminSidebar from "~/component/adminSidebar";
import isadmin from "~/component/isadmin";

import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { orderdatabyid, updateOrderById } from "../controllers/orderController";
import styles from "../styles/admin.css";
import orderStyle from "../styles/orderid.css";

const OrderId = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  useEffect(() => {
    console.log(id);
    orderData();
  }, []);

  useEffect(() => {
    console.log(order);
  }, [order]);

  isadmin();

  const orderData = async () => {
    try {
      const response = await orderdatabyid(id);
      if (response?.success) {
        setOrder(response?.order[0]);
      } else {
        alert("Something went wrong");
      }
      console.log(response);
    } catch (err) {
      alert("Something went wrong");
    }
  };

  const updateOrder = async () => {
    try {
      const response = await updateOrderById(id);
      if (response?.success) {
        alert("Updated Successfully");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="dash-container">
        <AdminSidebar />
        <div className="dash-main">
          <AdminHeader />
          <div className="dash-body">
            <div className="dash-content">
              <div className="order-table">
                <table border={1} className="cust-details">
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>
                        <input
                          type="text"
                          value={order?.name}
                          onChange={(e) => {
                            setOrder((prev) => {
                              return {
                                ...prev,
                                name: e.target.value,
                              };
                            });
                          }}
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <th>
                        <input
                          type="text"
                          value={order?.email}
                          onChange={(e) => {
                            setOrder((prev) => {
                              return {
                                ...prev,
                                email: e.target.value,
                              };
                            });
                          }}
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <th>
                        <input
                          type="text"
                          value={order?.phone}
                          onChange={(e) => {
                            setOrder((prev) => {
                              return {
                                ...prev,
                                phone: e.target.value,
                              };
                            });
                          }}
                        />
                      </th>
                    </tr>

                    <tr>
                      <th>Address</th>
                      <th>
                        <input
                          type="text"
                          value={order?.deliveryAdd?.address}
                          onChange={(e) => {
                            setOrder((prev) => {
                              return {
                                ...prev,
                                deliveryAdd: {
                                  ...prev.deliveryAdd,
                                  address: e.target.value,
                                },
                              };
                            });
                          }}
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>City</th>
                      <th>
                        <input
                          type="text"
                          value={order?.deliveryAdd?.city}
                          onChange={(e) => {
                            setOrder((prev) => {
                              return {
                                ...prev,
                                deliveryAdd: {
                                  ...prev.deliveryAdd,
                                  city: e.target.value,
                                },
                              };
                            });
                          }}
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>Pincode</th>
                      <th>
                        <input
                          type="text"
                          value={order?.deliveryAdd?.pincode}
                          onChange={(e) => {
                            setOrder((prev) => {
                              return {
                                ...prev,
                                deliveryAdd: {
                                  ...prev.deliveryAdd,
                                  pincode: e.target.value,
                                },
                              };
                            });
                          }}
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>State</th>
                      <th>
                        <input
                          type="text"
                          value={order?.deliveryAdd?.state}
                          onChange={(e) => {
                            setOrder((prev) => {
                              return {
                                ...prev,
                                deliveryAdd: {
                                  ...prev.deliveryAdd,
                                  state: e.target.value,
                                },
                              };
                            });
                          }}
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>Country</th>
                      <th>
                        <input
                          type="text"
                          value={order?.deliveryAdd?.country}
                          onChange={(e) => {
                            setOrder((prev) => {
                              return {
                                ...prev,
                                deliveryAdd: {
                                  ...prev.deliveryAdd,
                                  country: e.target.value,
                                },
                              };
                            });
                          }}
                        />
                      </th>
                    </tr>
                  </tbody>
                </table>

                <table border={1}>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Order Id</th>
                      <th>{order?._id}</th>
                    </tr>
                    <tr>
                      <th>Order Status</th>
                      <th>
                        <select name="" id="">
                          <option value=""></option>
                        </select>

                        <button> {order?.status}</button>
                      </th>
                    </tr>
                    <tr>
                      <th>Amount Paid</th>
                      <th>Rs.{order?.amountPaid}</th>
                    </tr>

                    <tr>
                      <th>Amount Pending</th>
                      <th>Rs.{order?.amountRemaining}</th>
                    </tr>
                    <tr>
                      <th>Total Amount</th>
                      <th>
                        Rs.
                        {Number(order?.amountPaid) +
                          Number(order?.amountRemaining)}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderId;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "stylesheet",
    href: orderStyle,
  },
];
