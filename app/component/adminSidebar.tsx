import { Link } from "@remix-run/react";

const AdminSidebar = () => {
  return (
    <div className="dash-sidebar">
      <div className="dash-logo">PieClothing</div>
      <div className="sidebar-content">
        <div className="sidebar-menu">
          <Link to={"../admin/dashboard"}>Dashboard</Link>
        </div>
        <div className="sidebar-menu">
          <Link to={"../admin/products"}>All Products</Link>
        </div>
        <div className="sidebar-menu">
          <Link to={"../admin/addproduct"}>Add New Product</Link>
        </div>
        <div className="sidebar-menu">
          <Link to={"./dashboard"}>Orders</Link>
        </div>
        {/* <div className="sidebar-menu">
        <Link to={"./dashboard"}>Users Cart</Link>
      </div> */}
        <div className="sidebar-menu">
          <Link to={"./dashboard"}>Users</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
