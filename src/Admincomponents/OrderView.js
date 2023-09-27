import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderView = () => {
  var icount = 0;
  const random = Math.floor(Math.random() * 100000) + 1;
  console.log(random);

  const [data, setData] = useState([]);
  const params = useParams();

  const OrdersItemsFetch = useCallback(async () => {
    console.log(params);
    const result = await fetch(
      `http://localhost:5000/api/orderitems/fetchallorderitems/${params.orderId}`
    );
    const json = await result.json();
    console.log(json);
    setData(json);
  }, [params]);

  useEffect(() => {
    OrdersItemsFetch();
  }, [OrdersItemsFetch]);

  return (
    <section className="p-t-20 p-b-40">
      <div className="row">
        <div className="col-md-12">
          <h1 style={{ marginLeft: "670px", color: "#ffc107" }}>
            <strong>Order Items</strong>
          </h1>
          <br />
          <table className="table table-striped">
            <thead>
              <tr className="line">
                <td className="text-center">
                  <strong>{/* <h4>// eslint-disable-next-line</h4> */}</strong>
                </td>
                <td className="text-center">
                  <strong>
                    <h4>Name</h4>
                  </strong>
                </td>
                <td className="text-center">
                  <strong>
                    <h4>Price</h4>
                  </strong>
                </td>
                <td className="text-center">
                  <strong>
                    <h4>Quantity</h4>
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
              {data.orderitemsData?.map((item, key) => {
                return (
                  <tr className="line" key={key}>
                    <td className="text-center">
                      <img
                        src={`http://localhost:3000/img/${item?.productId.image}`}
                        style={{ height: "60px" }}
                        alt="img"
                        className="img-fluid"
                      />
                    </td>
                    <td className="text-center">{item?.productId.name}</td>
                    <td className="text-center">₹{item.price}</td>
                    <td className="text-center">{item.quentity}</td>
                    <td className="text-center">
                      {item.discount === 0 ? (
                        <>₹{item.quentity * item.price}</>
                      ) : (
                        <>
                          ₹{item.quentity * item.price - item.discount}
                          <span
                            className="price-pro text-decoration-line-through"
                            style={{ marginLeft: "8px" }}
                          >
                            <b> ₹{item.quentity * item.price}</b>
                          </span>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {data.orderitemsData?.map((item, key) => {
            if (icount === 0) {
              icount++;
              return (
                <div className="row" key={key}>
                  <div
                    className="col-md-15 text-right"
                    style={{ color: "black", marginLeft: "-70px" }}
                  >
                    <h5>
                      {" "}
                      <strong>Amount: </strong>
                      <strong>₹{item?.orderId?.totalPrice}</strong>
                    </h5>
                    <h5>
                      {" "}
                      <strong>Discount: </strong>
                      <strong>₹{item?.orderId?.totalDiscount}</strong>
                    </h5>
                    -----------------------
                    <h5>
                      {" "}
                      <strong>Amount: </strong>
                      <strong>
                        ₹
                        {item?.orderId?.totalPrice -
                          item?.orderId?.totalDiscount}
                      </strong>
                    </h5>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default OrderView;
