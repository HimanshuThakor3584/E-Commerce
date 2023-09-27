import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./css/orderinvoice.css";

const OrderHistory = () => {
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [day, month, year].join("/");
  };

  const [data, setData] = useState([]);
  const params = useParams();

  const OrdersFetch = useCallback(async () => {
    // console.log(params);
    const result = await fetch(
      `http://localhost:5000/api/orders/fetchallorders/${params.userId}`
    );
    const json = await result.json();
    json?.ordersData.sort((a, b) => {
      if (a.orderDate > b.orderDate) {
        return -1;
      }
    });
    // console.log(json);
    setData(json);
  }, [params]);

  useEffect(() => {
    OrdersFetch();
  }, [OrdersFetch]);

  return (
    <section className="p-t-20 p-b-40">
      <div className="row">
        <div className="col-md-12">
          <h1 style={{ marginLeft: "690px", color: "#ffc107" }}>
            <strong>My Orders</strong>
          </h1>
          <br />
          <table className="table table-striped">
            <thead>
              <tr className="line">
                <td className="text-center">
                  <strong>
                    <h4>Order Date</h4>
                  </strong>
                </td>
                <td className="text-center">
                  <strong>
                    <h4>Order Id</h4>
                  </strong>
                </td>
                <td className="text-center">
                  <strong>
                    <h4>Items Quantity</h4>
                  </strong>
                </td>
                <td className="text-center">
                  <strong>
                    <h4>Amount</h4>
                  </strong>
                </td>
                <td className="text-center">
                  <strong>{/* <h4>// eslint-disable-next-line</h4> */}</strong>
                </td>
              </tr>
            </thead>
            <tbody>
              {data.ordersData?.map((item, key) => {
                return (
                  <tr className="line" key={key}>
                    <td className="text-center">
                      {formatDate(item.orderDate)}
                    </td>
                    <td className="text-center">{item._id}</td>
                    <td className="text-center">{item.totalQuentity}</td>
                    <td className="text-center">
                      ₹{item.totalPrice - item.totalDiscount}
                    </td>
                    <td className="text-center col-lg-3">
                      <Link
                        to={`/historyView/${item._id}`}
                        className="btn btn-primary w-50"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default OrderHistory;
