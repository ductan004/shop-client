import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../redux/authSlice";
import { toast } from "react-toastify";

function Header() {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const closeMenu = () => {
    setIsMenuActive(false);
  };

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogout = () => {
    dispatch(logOut());
    setShowLogoutModal(false); // Close modal after logging out
    toast.success("Đăng xuất thành công");
  };

  return (
    <div>
      {/* Off-Canvas Menu */}
      <div
        className={`offcanvas-menu-overlay ${isMenuActive ? "active" : ""}`}
        onClick={closeMenu}
      ></div>
      <div className={`offcanvas-menu-wrapper ${isMenuActive ? "active" : ""}`}>
        <div className="offcanvas__nav__option">
          <a href="#!" className="search-switch">
            <img src="./assets/img/icon/search.png" alt="" />
          </a>
          <a href="#!">
            <img src="./assets/img/icon/heart.png" alt="" />
          </a>
          <Link to={`/cart`}>
            <img src="./assets/img/icon/cart.png" alt="" />
          </Link>
          <div className="price"></div>
        </div>
        <div id="mobile-menu-wrap">
          <div className="slicknav_menu">
            <a
              href="#!"
              role="button"
              className="slicknav_btn slicknav_collapsed"
              style={{ outline: "none" }}
              onClick={toggleMenu}
            >
              <span className="slicknav_menutxt">MENU</span>
              <span className="slicknav_icon">
                <span className="slicknav_icon-bar"></span>
                <span className="slicknav_icon-bar"></span>
                <span className="slicknav_icon-bar"></span>
              </span>
            </a>
            <nav
              className={`slicknav_nav ${
                isMenuActive ? "slicknav_visible" : "slicknav_hidden"
              }`}
              role="menu"
              style={{ display: isMenuActive ? "block" : "none" }}
            >
              <ul style={{ listStyle: "none" }}>
                <li className="active">
                  <Link to={`/`} role="menuitem">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link to={`/shop`} role="menuitem">
                    Cưa hàng
                  </Link>
                </li>
                <li>
                  <a href="#!" role="menuitem">
                    Tin tức
                  </a>
                </li>
                <li>
                  <a href="#!" role="menuitem">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <header>
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-3">
              <div className="header__logo">
                <a href="/">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/img/logo.png`}
                    alt="Logo"
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li className="active">
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li>
                    <Link to="/shop">Cửa hàng</Link>
                  </li>
                  <li>
                    <a href="#!">Tin tức</a>
                  </li>
                  <li>
                    <a href="#!">Liên hệ</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-5 col-md-3">
              <div className="header__nav__option">
                <span>
                  <div className="dropdown">
                    <a
                      className="dropdown-toggle info text-dark"
                      href="#!"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user ? user.fullName : ""}

                      <img
                        src={`${process.env.PUBLIC_URL}/assets/img/icon/user.svg`}
                        style={{ width: "18px" }}
                        alt="Search"
                      />
                    </a>
                    {user ? (
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            to={"/changePassword"}
                            className="dropdown-item"
                            href="#!"
                          >
                            Đổi Mật khẩu
                          </Link>
                        </li>
                        <li>
                          <a
                            onClick={() => setShowLogoutModal(true)}
                            className="dropdown-item"
                            href="#!"
                          >
                            Đăng Xuất
                          </a>
                        </li>
                        <li>
                          <Link
                            to={"/register"}
                            className="dropdown-item"
                            href="#!"
                          >
                            Đăng Ký
                          </Link>
                        </li>
                        {user.role === 1 ? (
                          <li>
                            <Link
                              to={"/admin"}
                              className="dropdown-item"
                              href="#!"
                            >
                              Admin
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    ) : (
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            to={"/login"}
                            className="dropdown-item"
                            href="#!"
                          >
                            Đăng nhập
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/register"}
                            className="dropdown-item"
                            href="#!"
                          >
                            Đăng Ký
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#!">
                            Quên mật khẩu
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </span>
                <Link to={"#!"} className="search-switch">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/img/icon/search.png`}
                    alt="Search"
                  />
                </Link>
                <a href="#!">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/img/icon/heart.png`}
                    alt="Search"
                  />
                </a>
                <Link to="/cart">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/img/icon/cart.png`}
                    alt="Search"
                  />
                </Link>
                {/* <div className="price">$0.00</div> */}
              </div>
            </div>
          </div>
          <div className="canvas__open" onClick={toggleMenu}>
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>

      <div
        className={`modal fade ${showLogoutModal ? "show" : ""}`}
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="logoutModalLabel"
        aria-hidden="true"
        style={{ display: showLogoutModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="logoutModalLabel">
                Xác Nhận Đăng Xuất
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowLogoutModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              Bạn có chắc chắn muốn đăng xuất không?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowLogoutModal(false)}
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLogout}
              >
                Đăng Xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
