import { Outlet } from "react-router-dom";
import MenuAdmin from "./pages/MenuAdmin";

import "./Admin.css";
function admin() {
  return (
    <div className="admin-app-main">
      {/* menu */}
      <MenuAdmin />
      <div className="admin-main-content">
        <Outlet />
      </div>
    </div>
  );
}
export default admin;
