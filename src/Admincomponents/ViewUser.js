import React, { useCallback, useEffect, useState } from "react";

const ViewUser = () => {
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

  const UsersFetch = useCallback(async () => {
    const result = await fetch(`http://localhost:5000/api/auth/login`);
    const json = await result.json();
    json?.data.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
    });
    setData(json);
  });

  useEffect(() => {
    UsersFetch();
  }, [UsersFetch]);

  return (
    <div className="container mt-5 pb-5">
      <div className="container px-4">
        <div className="card">
          <div className="card-header">
            <h4>Customer List</h4>
          </div>
          <div className="card-body">
            <table className="table table-striped-rows">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  {/* <th scope="col">Role</th> */}
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.data?.map((item, key) => {
                  return (
                    <tr key={key}>
                      {item.role === "1" ? (
                        <></>
                      ) : (
                        <>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.password?.slice(6, 20)}</td>
                          {/* <td>{item.role}</td> */}
                          <td>{formatDate(item.date)}</td>
                        </>
                      )}
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

export default ViewUser;
