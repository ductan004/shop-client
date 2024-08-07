import { Link } from "react-router-dom";
function MenuAdmin() {
  return (
    <nav className="admin-sidebar bg-primary admin-nav">
      <ul>
        <li>
          <Link to={"/"}>
            <i className="fa-solid fa-house admin-ico-side"></i>
            WebSite
          </Link>
        </li>
        <li>
          <Link to={"/admin"}>
            <i className="fa-solid fa-house admin-ico-side"></i>
            Dashboards
          </Link>
        </li>
        <li>
          <Link to={"/admin"} href="order.html">
            <i className="fa-solid fa-cart-shopping admin-ico-side"></i>Quản kí đơn hàng
          </Link>
        </li>
        <li>
          <Link to={"/admin/catalog"}>
            <i className="fa-solid fa-folder-open admin-ico-side"></i>Quản lí danh muc
          </Link>
        </li>
        <li>
          <Link to={"/admin/product"}>
            <i className="fa-solid fa-mug-hot admin-ico-side"></i>Quản lí sản phẩm
          </Link>
        </li>
        <li>
          <Link to={"/admin/user"}>
            <i className="fa-solid fa-user admin-ico-side"></i>Quản lí thành viên
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MenuAdmin;
