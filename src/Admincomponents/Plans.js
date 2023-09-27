import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Plans = () => {
  const [data, setData] = useState([]);

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [day, month, year].join("/");
  };
  const OrdersFetch = useCallback(async () => {
    const result = await fetch("http://localhost:5000/api/plans/fetchallplans");
    const json = await result.json();
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
            <h4>
              Discount List
              <Link to="/addplans" className="btn btn-primary btn-sm float-end">
                Add Discount
              </Link>
            </h4>
          </div>
          <div className="card-body">
            <table className="table table-striped-rows">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Discount Type</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Start Discount</th>
                  <th scope="col">End Discount</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.plansData?.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>{item.name}</td>
                      <td>{item.discounttype}</td>
                      {item.discounttype === "1. Fixed Amount" ? (
                        <>
                          <td>₹{item.discount}</td>
                        </>
                      ) : (
                        <>
                          <td>{item.discount}%</td>
                        </>
                      )}
                      <td>{formatDate(item.startplan)}</td>
                      <td>{formatDate(item.endplan)}</td>
                      <td>{item.status}</td>
                      <td>
                        <Link to={"/editplans/" + item._id}>
                          <button className="btn btn-primary">Edit</button>{" "}
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

export default Plans;
