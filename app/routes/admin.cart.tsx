import AdminHeader from "~/component/adminHeader";
import AdminSidebar from "~/component/adminSidebar";
import isadmin from "~/component/isadmin";
import styles from "../styles/admin.css";
import { useEffect, useState } from "react";
import { viewAllCart } from "~/controllers/cartController";

const adminCart = () => {
  isadmin();
  const [cartDetails, setCartDetails] = useState([]);
  useEffect(() => {
    allCart();
  }, []);

  const allCart = async () => {
    const response: any = await viewAllCart("");
    if (response.success) {
      console.log("response", response);
      setCartDetails(response.cartDetails);
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
              <table className="pro-table" border={1}>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Delete</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {cartDetails?.length > 0
                    ? cartDetails.map((cart: any, i) => {
                        return (
                          <tr key={cart?._id}>
                            <td>{i + 1}</td>
                            <td>
                              {cart?.userDetails
                                ? cart.userDetails.firstName +
                                  " " +
                                  cart.userDetails.lastName
                                : "Unknown"}
                            </td>
                            <td> </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default adminCart;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
