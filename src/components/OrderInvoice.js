import React, { useRef, useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./css/orderinvoice.css";
import logo2 from "../components/logo/logo2.png";
import { useReactToPrint } from "react-to-print";

const OrderInvoice = () => {
  const componentPDF = useRef();
  var data2,
    data1,
    totalDiscount = [];
  const [categories, setCategories] = useState([]);
  const { state } = useLocation();
  const { cart, totalPrice } = state;
  console.log(state);

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [day, month, year].join("/");
  };

  const random = Math.floor(Math.random() * 100000) + 1;
  console.log(random);

  const [data, setData] = useState("");
  const params = useParams();

  const BillingAddressFetch = useCallback(async () => {
    const result = await fetch(
      `http://localhost:5000/billingaddress/${params.id}`
    );
    const json = await result.json();
    setData(json);
  }, [params]);

  const categoryList = () => {
    fetch("http://localhost:5000/api/categories/fetchallcategories")
      .then((response) => response.json())
      .then((json) => {
        setCategories(json.categoriesData);
      });
  };

  useEffect(() => {
    categoryList();
    BillingAddressFetch();
  }, [BillingAddressFetch]);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "UserData",
    onAfterPrint: () => alert("Data Saved In PDF"),
  });

  return (
    <div className="container">
      <div className="row">
        {/* <!-- BEGIN INVOICE --> */}
        <div className="col-xs-12">
          <div className="grid invoice">
            <div className="grid-body">
              <div
                ref={componentPDF}
                style={{ margin: "50px", marginBottom: "15px" }}
              >
                <div className="invoice-title">
                  <div className="row">
                    <div className="col-md-9 mb-3">
                      <h2>
                        <strong>Invoice</strong>
                      </h2>
                      <br />
                      <strong>Order Id: </strong>
                      {data.orderId?.slice(0, 5)}
                      <br />
                      <strong>Date: </strong>
                      {formatDate(data.date)}
                    </div>
                    <div className="col-md-3" align="right">
                      <img src={logo2} alt="logo2" height="35" />
                      <br />
                      <br />
                      <strong>Invoice No. </strong>
                      {random}
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-9 mb-3">
                    <address>
                      <strong>Billed To:</strong>
                      <br />
                      {data.firstname} {data.lastname}
                      <br />
                      {data.address}
                      <br />
                      {data.email}
                      <br />
                      Contact No.{data.number}
                      <br />
                      Pincode: {data.zip}
                    </address>
                  </div>
                  <div className="col-md-3" align="right">
                    <address>
                      <strong>Shipped To:</strong>
                      <br />
                      DM Shopping Cart,
                      <br />
                      Gujarat
                      <br />
                      support@dmcart.com
                      <br />
                      <label title="Phone">No:</label> +91 XXXXX XXXXX
                    </address>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-10 mb-3">
                    <address>
                      <strong>Payment Method: </strong>
                      {data.pay === "1.Cash on delivery" ? (
                        <> Cash</>
                      ) : (
                        <> Online</>
                      )}
                    </address>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-13 mb-3">
                    <h3>
                      <strong>ITEM SUMMARY</strong>
                    </h3>
                    <br />
                    <table className="table table-striped">
                      <thead>
                        <tr className="line">
                          <td className="text-left">
                            <strong>
                              <h4>{/* // eslint-disable-next-line */}</h4>
                            </strong>
                          </td>
                          <td className="text-left">
                            <strong>
                              <h4>Product Name</h4>
                            </strong>
                          </td>
                          <td className="text-left">
                            <strong>
                              <h4>Quantity</h4>
                            </strong>
                          </td>
                          <td className="text-center">
                            <strong>
                              <h4>Price</h4>
                            </strong>
                          </td>
                          <td className="text-center">
                            <strong>
                              <h4>Amount</h4>
                            </strong>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {cart?.map((item, key) => {
                          var discounttype = categories.find(
                            (x) => x?._id === item?.categoryId
                          )?.plansId?.discounttype;
                          if (discounttype === "1. Fixed Amount") {
                            data2 =
                              Math.round(
                                categories.find(
                                  (x) => x?._id === item?.categoryId
                                )?.plansId?.discount
                              ) * item.quentity;
                            totalDiscount.push(data2);
                          } else if (discounttype === "2. Percentage") {
                            data2 = Math.round(
                              ((item.price *
                                categories.find(
                                  (x) => x?._id === item?.categoryId
                                )?.plansId?.discount) /
                                100) *
                                item.quentity
                            );
                            totalDiscount.push(data2);
                          } else {
                            data1 = item.price;
                          }
                          return (
                            <tr className="line text-left" key={key}>
                              <td>
                                <img
                                  src={`http://localhost:3000/img/${item.image}`}
                                  alt="img-fluid"
                                  style={{ height: "60px" }}
                                />
                              </td>
                              <td className="text-left">
                                <label className="p-3 g-col-6">
                                  {item.name}
                                </label>
                              </td>
                              <td className="text-left">
                                <label className="p-3 g-col-6">
                                  {item.quentity}
                                </label>
                              </td>
                              <td className="text-center">
                                <label className="p-3 g-col-6">
                                  ₹{item.price}
                                </label>
                              </td>
                              <td className="text-center">
                                <label className="p-3 g-col-6">
                                  {data1 === item.price ? (
                                    <>₹{item.quentity * item.price}</>
                                  ) : (
                                    <>
                                      ₹{item.quentity * item.price - data2}
                                      <span className="p-1 price-pro text-decoration-line-through">
                                        <b> ₹{item.quentity * item.price}</b>
                                      </span>
                                    </>
                                  )}
                                </label>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="row">
                      <div className="col-sm-12" align="right">
                        {data1 === totalPrice ? (
                          <>
                            <h5>
                              <strong>Amount: ₹{totalPrice}</strong>
                            </h5>
                          </>
                        ) : (
                          <>
                            <div className="col-sm-12" align="right">
                              <h5>
                                <strong>Amount: ₹{totalPrice}</strong>
                              </h5>
                              <h5>
                                <strong>
                                  Discount: ₹
                                  {`${totalDiscount.reduce(
                                    (partialSum, a) => partialSum + a,
                                    0
                                  )}`}
                                </strong>
                              </h5>
                              -----------------------
                              <br />
                              <h5>
                                <strong>
                                  Amount: ₹
                                  {totalPrice -
                                    `${totalDiscount.reduce(
                                      (partialSum, a) => partialSum + a,
                                      0
                                    )}`}
                                </strong>
                              </h5>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-11" align="right">
                <button
                  className="btn btn-dark px-4 rounded-pill"
                  type="button"
                  onClick={generatePDF}
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- END INVOICE --> */}
      </div>
    </div>
  );
};

export default OrderInvoice;
