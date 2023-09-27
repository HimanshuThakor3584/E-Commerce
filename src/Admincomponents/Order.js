import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Order = () => {
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

  const OrdersFetch = useCallback(async () => {
    const result = await fetch(
      `http://localhost:5000/api/orders/fetchallorders`
    );
    const json = await result.json();
    json?.ordersData.sort((a, b) => {
      if (a.orderDate > b.orderDate) {
        return -1;
      }
    });
    setData(json);
  });

  useEffect(() => {
    OrdersFetch();
  }, [OrdersFetch]);

  return (
    <div className="container mt-5 pb-5">
      <div className="container px-4">
        <div className="card">
          <div className="card-header">
            <h4>Order List</h4>
          </div>
          <div className="card-body">
            <table className="table table-striped-rows">
              <thead>
                <tr>
                  <th scope="col">Order Date</th>
                  <th scope="col">Order Id</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.ordersData?.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>{formatDate(item.orderDate)}</td>
                      <td>{item._id}</td>
                      <td>{item.totalQuentity}</td>
                      <td>₹{item.totalPrice - item.totalDiscount}</td>
                      <td>
                        {" "}
                        <Link
                          to={`/orderView/${item._id}`}
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
      </div>
    </div>
  );
};

export default Order;
