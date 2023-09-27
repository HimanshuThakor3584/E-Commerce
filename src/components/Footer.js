import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo2 from "../components/logo/logo2.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const userId = localStorage.getItem("userId");
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line
  const [categoryId, setCategoryId] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    if (!email) {
      setError(true);
      return false;
    }
    const response = await fetch(
      "http://localhost:5000/api/subscribe/fetchallsubscribe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    const json = await response.json();
    console.log(json);
    toast.success("Message Sent!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const categoryList = () => {
    fetch("http://localhost:5000/api/categories/fetchallcategories")
      .then((response) => response.json())
      .then((json) => {
        setCategories(json.categoriesData);
      });
  };

  useEffect(() => {
    categoryList();
  }, []);

  return (
    //   <!-- Footer -->
    <footer className="bg3 p-t-75 p-b-32">
      <div className="container">
        <div className="row">
          <div className="col-lg-2 p-b-50">
            <div className="stext-301 cl0 p-b-30">
              <Link to="/" className="logo">
                <img src={logo2} alt="logo2" />
              </Link>
            </div>
          </div>

          <div className="col-sm-6 col-lg-2 p-b-50">
            <h4 className="stext-301 cl0 p-b-30">Categories</h4>
            {categories.map((item, key) => {
              return (
                <li className="p-b-10" key={key}>
                  <Link
                    to="/shop"
                    className="stext-107 cl7 hov-cl1 trans-04"
                    key={key}
                    value={item._id}
                    onClick={(e) => setCategoryId(e.target.value)}
                  >
                    {item.category}
                  </Link>
                </li>
              );
            })}
          </div>

          <div className="col-sm-6 col-lg-2 p-b-50">
            <h4 className="stext-301 cl0 p-b-30">Help</h4>
            {localStorage.getItem("token") === "0" ? (
              <div className="p-b-10">
                <Link
                  to={`/history/${userId}`}
                  className="stext-107 cl7 hov-cl1 trans-04"
                >
                  My Orders
                </Link>
              </div>
            ) : (
              <></>
            )}

            <div className="p-b-10">
              <Link to="/helps" className="stext-107 cl7 hov-cl1 trans-04">
                FAQs
              </Link>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 p-b-50">
            <h4 className="stext-301 cl0 p-b-30">GET IN TOUCH</h4>

            <p className="stext-107 cl7 size-201">
              C - 205, Ganesh Glory 11, Jagatpur Road, Gota, Ahmedabad, Gujarat
              - 382481. Email:{" "}
              <Link to="https://info@netpairinfotech.com" target="_blank">
                info@netpairinfotech.com
              </Link>
            </p>

            <div className="p-t-10">
              <Link to="/" className="fs-25 cl7 hov-cl1 trans-04 m-r-16">
                <i className="fa fa-facebook"></i>
              </Link>

              <Link to="/" className="fs-25 cl7 hov-cl1 trans-04 m-r-16">
                <i className="fa fa-instagram"></i>
              </Link>

              <Link to="/" className="fs-25 cl7 hov-cl1 trans-04 m-r-16">
                <i className="fa fa-pinterest-p"></i>
              </Link>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 p-b-50">
            <h4 className="stext-301 cl0 p-b-30">Newsletter</h4>

            <form onClick={handleSubmit}>
              <div className="wrap-input1 w-full p-b-4">
                <input
                  className="input1 bg-none plh1 stext-107 cl7 "
                  type="text"
                  name="email"
                  placeholder="Your  Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="focus-input1 trans-04"></div>
              </div>
              {error && !email && (
                <span style={{ color: "red" }}>Enter valid Email</span>
              )}{" "}
              <div className="p-t-18">
                <button className="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                  Subscribe
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>

        <div className="p-t-40">
          <div className="flex-c-m flex-w p-b-18">
            <Link to="/" className="m-all-1">
              <img src="images/icons/icon-pay-01.png" alt="ICON-PAY" />
            </Link>

            <Link to="/" className="m-all-1">
              <img src="images/icons/icon-pay-02.png" alt="ICON-PAY" />
            </Link>

            <Link to="/" className="m-all-1">
              <img src="images/icons/icon-pay-03.png" alt="ICON-PAY" />
            </Link>

            <Link to="/" className="m-all-1">
              <img src="images/icons/icon-pay-04.png" alt="ICON-PAY" />
            </Link>

            <Link to="/" className="m-all-1">
              <img src="images/icons/icon-pay-05.png" alt="ICON-PAY" />
            </Link>
          </div>

          <p className="stext-107 cl6 txt-center">
            Copyright @ 2021-22 Netpair Infotech LLP. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// #179bbd
