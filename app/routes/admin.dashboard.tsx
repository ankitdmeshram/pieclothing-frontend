import AdminHeader from "~/component/adminHeader";
import styles from "../styles/admin.css";
import AdminSidebar from "~/component/adminSidebar";
import isadmin from "~/component/isadmin";
const AdminDashboard = () => {
  isadmin();

  return (
    <>
      <div className="dash-container">
        <AdminSidebar />
        <div className="dash-main">
          <AdminHeader />
          <div className="dash-body">
            <div className="dash-content">Dashboard</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
