import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo2 from "../components/logo/logo2.png";

const Navbar = () => {
  const { totalQuentity } = useSelector((state) => state.allCart);
  const path = useLocation();
  let history = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("token");
    history("/");
  };
  const userId = localStorage.getItem("userId");

  return (
    <>
      <div className="container-menu-desktop">
        <div className="top-bar">
          <div className="content-topbar flex-sb-m h-full container">
            <div className="left-top-bar">
              Free shipping for standard order over ₹100
            </div>

            <div className="right-top-bar flex-w h-full">
              {localStorage.getItem("token") === "0" ? (
                <Link
                  className={`flex-c-m trans-04 p-lr-25 ${
                    path.pathname === `/history/${userId}` ? "active" : ""
                  }`} //${id.slice(1,-1)}
                  to={`/history/${userId}`}
                  role="button"
                >
                  My Orders
                </Link>
              ) : (
                <></>
              )}
              {!localStorage.getItem("token") ? (
                <Link
                  className={`flex-c-m trans-04 p-lr-25 ${
                    path.pathname === "/login" ? "active" : ""
                  }`}
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
              ) : (
                <Link
                  onClick={handleLogout}
                  className={`flex-c-m trans-04 p-lr-25 ${
                    path.pathname === "/logout" ? "active" : ""
                  }`}
                  to="/"
                  role="button"
                >
                  LogOut
                </Link>
              )}
              <Link to="/helps" className="flex-c-m trans-04 p-lr-25">
                Help & FAQs
              </Link>
            </div>
          </div>
        </div>

        <div className="wrap-menu-desktop">
          <nav className="limiter-menu-desktop container">
            <Link to="/" className="logo">
              <img src={logo2} alt="logo2" />
            </Link>
            <div className="menu-desktop">
              <ul className="main-menu">
                {localStorage.getItem("token") === "1" ? (
                  <>
                    <li
                      className={`${
                        path.pathname === "/category" ? "active-menu" : ""
                      }`}
                    >
                      <Link to="/category">Category</Link>
                    </li>
                    <li
                      className={`${
                        path.pathname === "/product" ? "active-menu" : ""
                      }`}
                    >
                      <Link to="/product">Product</Link>
                    </li>
                    <li
                      className={`${
                        path.pathname === "/plans" ? "active-menu" : ""
                      }`}
                    >
                      <Link to="/plans">Discount</Link>
                    </li>
                    <li
                      className={`${
                        path.pathname === "/order" ? "active-menu" : ""
                      }`}
                    >
                      <Link to="/order">Order</Link>
                    </li>
                    <li
                      className={`${
                        path.pathname === "/viewuser" ? "active-menu" : ""
                      }`}
                    >
                      <Link to="/viewuser">Customer</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      className={`${
                        path.pathname === "/" ? "active-menu" : ""
                      }`}
                    >
                      <Link to="/">Home</Link>
                    </li>

                    <li
                      className={`${
                        path.pathname === "/shop" ? "active-menu" : ""
                      }`}
                    >
                      <Link to="/shop">Shop</Link>
                    </li>

                    <li
                      className={`${
                        path.pathname === "/about" ? "active-menu" : ""
                      }`}
                    >
                      <Link to="/about">About US</Link>
                    </li>

                    <li
                      className={`${
                        path.pathname === "/contact" ? "active-menu" : ""
                      }`}
                    >
                      <Link to="/contact">Contact US</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            {localStorage.getItem("token") === "1" ? (
              <></>
            ) : (
              <>
                <div className="wrap-icon-header flex-w flex-r-m">
                  <Link to="/cart">
                    <div
                      className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                      data-notify={totalQuentity}
                    >
                      <i className="bi bi-cart-fill  "></i>
                    </div>
                  </Link>
                </div>{" "}
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="wrap-header-mobile">
        <div className="logo-mobile">
          <Link to="/" className="logo">
            <img src={logo2} alt="logo2" />
          </Link>
        </div>

        <div className="wrap-icon-header flex-w flex-r-m m-r-15">
          <Link to="/cart">
            <div
              className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart"
              data-notify={totalQuentity}
            >
              <i className="bi bi-cart-fill"></i>
            </div>
          </Link>
        </div>

        <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </div>
      </div>
      <div className="menu-mobile">
        <ul className="topbar-mobile">
          <li>
            <div className="left-top-bar">
              Free shipping for standard order over $100
            </div>
          </li>

          <li>
            {!localStorage.getItem("token") ? (
              <Link
                className="flex-c-m trans-04 p-lr-25"
                to="/login"
                role="button"
              >
                Login
              </Link>
            ) : (
              <Link
                onClick={handleLogout}
                className="flex-c-m trans-04 p-lr-25"
              >
                LogOut
              </Link>
            )}
            <div className="right-top-bar flex-w h-full">
              <Link to="/helps" className="flex-c-m p-lr-10 trans-04">
                Help & FAQs
              </Link>
            </div>
          </li>
        </ul>

        <ul className="main-menu-m">
          {localStorage.getItem("token") === "1" ? (
            <>
              <li className="active-menu">
                <Link to="/category">Category</Link>
              </li>
              <li>
                <Link to="/product">Product</Link>
              </li>

              <li>
                <Link to="/order">Order</Link>
              </li>
            </>
          ) : (
            <>
              <li className="label1" data-label1="hot">
                <Link to="/">Home</Link>
                <span className="arrow-main-menu-m">
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </span>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/about">About US</Link>
              </li>

              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
        <div className="container-search-header">
          <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
            <img src="images/icons/icon-close2.png" alt="CLOSE" />
          </button>

          <form className="wrap-search-header flex-w p-l-15">
            <button className="flex-c-m trans-04">
              <i className="zmdi zmdi-search"></i>
            </button>
            <input
              className="plh3"
              type="text"
              name="search"
              placeholder="Search..."
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Navbar;

//  <span>{categories.find((x) => x?._id === item?.categoryId)?.plansId?.discount}</span>
