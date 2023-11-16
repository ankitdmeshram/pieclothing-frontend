import AdminHeader from "~/component/adminHeader";
import AdminSidebar from "~/component/adminSidebar";
import isadmin from "~/component/isadmin";
import styles from "../styles/admin.css";

const adminOrders = () => {
  isadmin();
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
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default adminOrders;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
