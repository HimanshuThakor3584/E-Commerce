import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartTotal, clearCart } from "../features/cartSlice";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";

const Payment = () => {
  const {
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();

  var data,
    data1,
    totalDiscount = [];
  const discount = [];
  const [categories, setCategories] = useState([]);
  const ordersInitial = [];
  const [orders, setOrders] = useState(ordersInitial);
  const ordersitemsInitial = [];
  const [orderitem, setOrderitem] = useState(ordersitemsInitial);
  const ordersinvoicesInitial = [];
  const [orderinvoice, setOrderInvoice] = useState(ordersinvoicesInitial);
  const billingaddressInitial = [];
  const [billingaddress, setBillingAddress] = useState(billingaddressInitial);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [zip, setZip] = useState("");
  const [pay, setPay] = useState("");
  const [error, setError] = useState(false);
  const [cartDummy, setCartDummy] = useState("");
  const [totalPriceDummy, setTotalPriceDummy] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, totalQuentity, totalPrice, itemPrice } = useSelector(
    (state) => state.allCart
  );

  const handleSubmit = async () => {
    //--------------Orders Post----------------
    const response = await fetch(
      "http://localhost:5000/api/orders/fetchallorders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authtoken"),
        },
        body: JSON.stringify({
          totalQuentity,
          totalPrice,
          itemPrice,
          totalDiscount: totalDiscount.reduce(
            (partialSum, a) => partialSum + a,
            0
          ),
        }),
      }
    );

    const json = await response.json();
    console.log(json);
    const orderId = ("orderId", json?.newOrders?._id);
    console.log("orderId", json?.newOrders?._id);
    localStorage.setItem("orderId", JSON.stringify(json?.newOrders?._id));
    localStorage.getItem("orderId");
    setOrders(orders.concat());

    // --------------OrderItems Post----------------
    var toStr;
    for (let index of cart) {
      // eslint-disable-next-line
      toStr = JSON.stringify(
        index._id,
        index.categoryId,
        index.price,
        index.quentity
      );
      const productId = index._id;
      const categoryId = index.categoryId;
      const price = index.price;
      const quentity = index.quentity;
      const discountData = discount.find((x) => x.productId === productId);

      const response2 = await fetch(
        "http://localhost:5000/api/orderitems/fetchallorderitems",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authtoken"),
          },
          body: JSON.stringify({
            orderId,
            productId,
            categoryId,
            price,
            quentity,
            discount: discountData ? discountData?.discount : 0,
          }),
        }
      );
      const payment1 = await response2.json();
      console.log(payment1);
      setOrderitem(orderitem.concat());
    }

    // --------------OrderInvoice Post----------------
    console.log(orderId, totalPrice);
    fetch("http://localhost:5000/api/orderinvoice/fetchallorderinvoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        totalPrice,
      }),
    });
    setOrderInvoice(orderinvoice.concat());

    //--------------Billing Address Post----------------
    if (
      !firstname ||
      !lastname ||
      !email ||
      !address ||
      number.length !== 10 ||
      zip.length !== 6 ||
      !pay
    ) {
      setError(true);
      return false;
    }
    console.log(orderId, firstname, lastname, email, address, number, zip, pay);
    const response1 = await fetch(
      "http://localhost:5000/api/billingaddress/fetchallbillingaddress",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authtoken"),
        },
        body: JSON.stringify({
          orderId,
          firstname,
          lastname,
          email,
          address,
          number,
          zip,
          pay,
        }),
      }
    );
    const payment = await response1.json();
    console.log(payment);
    setBillingAddress(billingaddress.concat(payment));
    dispatch(clearCart());

    swal({
      title: "Your order has been placed!",
      text: "You clicked the button!",
      icon: "success",
      button: "Aww yes!",
    });
    navigate(`/orderinvoice/${payment?.newBillingAddress?._id}`, {
      state: { cart: cartDummy, totalPrice: totalPriceDummy },
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
    dispatch(getCartTotal());
    console.log(cart);
    setCartDummy(cart);
    console.log(totalPrice);
    setTotalPriceDummy(totalPrice);
    console.log(cartDummy);
    console.log(totalPriceDummy);
    // eslint-disable-next-line
  }, [cart]);

  return (
    <div className="checkout">
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <span className="badge badge-secondary badge-pill">
                  {totalQuentity}
                </span>
              </h4>
              {cart?.map((item, key) => {
                var discounttype = categories.find(
                  (x) => x?._id === item?.categoryId
                )?.plansId?.discounttype;
                if (discounttype === "1. Fixed Amount") {
                  data =
                    Math.round(
                      categories.find((x) => x?._id === item?.categoryId)
                        ?.plansId?.discount
                    ) * item.quentity;
                  totalDiscount.push(data);
                  discount.push({ discount: data, productId: item?._id });
                } else if (discounttype === "2. Percentage") {
                  data = Math.round(
                    ((item.price *
                      categories.find((x) => x?._id === item?.categoryId)
                        ?.plansId?.discount) /
                      100) *
                      item.quentity
                  );
                  discount.push({ discount: data, productId: item?._id });
                  totalDiscount.push(data);
                } else {
                  data1 = item.price;
                }
                return (
                  <div className="card rounded-3 mb-4" key={key}>
                    <div className="card-body p-4">
                      <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                          <h6 className="my-0">Name</h6>
                          <small className="text-muted">{item.name}</small>
                        </div>
                        <div>
                          <h6 className="my-0">Price</h6>
                          <span className="text-muted">{item.price}</span>
                        </div>
                        <div>
                          <h6 className="my-0">Quantity</h6>
                          <span className="text-muted">{item.quentity}</span>
                        </div>
                        <div>
                          <h6 className="my-0">Total Price</h6>
                          <span className="text-muted">
                            ₹{item.quentity * item.price}
                          </span>
                        </div>
                      </li>
                    </div>
                  </div>
                );
              })}
              <div className="card p-2">
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/cart")}
                  >
                    Return to Cart
                  </button>
                  <br />
                  {data1 === totalPrice ? (
                    <>
                      <h5 className="mb-0 float-end">Amount: ₹{totalPrice}</h5>
                    </>
                  ) : (
                    <>
                      <h5 className="mb-10" style={{ marginLeft: "240px" }}>
                        Amount: ₹{totalPrice}
                      </h5>
                      <h5 className="mb-0" style={{ marginLeft: "240px" }}>
                        Discount: ₹
                        {`${totalDiscount.reduce(
                          (partialSum, a) => partialSum + a,
                          0
                        )}`}
                      </h5>
                      <div
                        className="input-group-append"
                        style={{ marginLeft: "240px" }}
                      >
                        ---------------------
                      </div>
                      <h5 className="mb-0" style={{ marginLeft: "240px" }}>
                        Amount: ₹
                        {totalPrice -
                          `${totalDiscount.reduce(
                            (partialSum, a) => partialSum + a,
                            0
                          )}`}
                      </h5>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Billing Address</h4>
              <form onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstname"
                      value={firstname}
                      placeholder=""
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {error && !firstname && (
                      <span style={{ color: "red" }}>
                        Enter valid First Name
                      </span>
                    )}{" "}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastname"
                      value={lastname}
                      placeholder=""
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    {error && !lastname && (
                      <span style={{ color: "red" }}>
                        Enter valid Last Name
                      </span>
                    )}{" "}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="you@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error && !email && (
                    <span style={{ color: "red" }}>Enter Valid Email</span>
                  )}{" "}
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={address}
                    placeholder="1234 Main St"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {error && !address && (
                    <span style={{ color: "red" }}>Enter valid Address</span>
                  )}{" "}
                </div>
                <div className="mb-3">
                  <label htmlFor="address2" className="form-label">
                    Address 2 <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder="Apartment or suite"
                  />
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="zip" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="number"
                      name="number"
                      value={number}
                      placeholder=""
                      onChange={(e) => setNumber(e.target.value)}
                    />
                    {error && number.length !== 10 && (
                      <span style={{ color: "red" }}>
                        Contact number must be 10 digit
                      </span>
                    )}{" "}
                  </div>
                  {/* </div>
                <div className="row"> */}
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zip" className="form-label">
                      Pincode
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      name="zip"
                      value={zip}
                      placeholder=""
                      onChange={(e) => setZip(e.target.value)}
                    />
                    {error && zip.length !== 6 && (
                      <span style={{ color: "red" }}>
                        Pincode must be 6 digit
                      </span>
                    )}{" "}
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="InputName" className="form-label">
                      Payment Type
                    </label>
                    <select
                      className="custom-select my-1 mr-sm-2"
                      id="inlineFormCustomSelectPref"
                      value={pay}
                      onChange={(e) => setPay(e.target.value)}
                    >
                      <option>Choose..</option>
                      <option>1.Cash on delivery</option>
                      <option>2.Pay with card</option>
                    </select>
                    {error && !pay && (
                      <span style={{ color: "red" }}>Payment Choose...</span>
                    )}{" "}
                  </div>
                  {pay === "2.Pay with card" ? (
                    <>
                      {" "}
                      <div className="tab-content">
                        <h3>Payment</h3>
                        <div
                          id="nav-tab-card"
                          className="tab-pane fade show active"
                        >
                          {/* <form role="form"> */}
                          <div className="form-group">
                            <label htmlFor="username">
                              Full name (on the card)
                            </label>
                            <input
                              type="text"
                              name="username"
                              placeholder="Enter Card Holder Name"
                              required
                              className="form-control"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="cardNumber">Card number</label>
                            <svg
                              style={{ marginLeft: "690px" }}
                              {...getCardImageProps({ images })}
                            />
                            <div className="input-group">
                              <input
                                placeholder="Enter Card Number"
                                className="form-control"
                                {...getCardNumberProps()}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-8">
                              <div className="form-group">
                                <label>
                                  <span className="hidden-xs">Expiration</span>
                                </label>
                                <div className="input-group">
                                  <input
                                    placeholder="Enter MM/YY"
                                    className="form-control"
                                    {...getExpiryDateProps()}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4 mb-3">
                              <div className="form-group mb-4">
                                <label
                                  data-toggle="tooltip"
                                  title="Three-digits code on the back of your card"
                                >
                                  CVV
                                </label>
                                <input
                                  placeholder="Enter CVV"
                                  className="form-control"
                                  {...getCVCProps()}
                                />
                              </div>
                            </div>
                          </div>
                          {/* </form> */}
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <hr className="mb-4" />
                {clearCart && (
                  <button
                    className="btn btn-dark px-4 rounded-pill"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Place Order
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payment;
