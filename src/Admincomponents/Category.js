import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [data, setData] = useState([]);
  const apiGet = () => {
    fetch("http://localhost:5000/api/categories/fetchallcategories")
      .then((response) => response.json())
      .then((json) => {
        setData(json.categoriesData);
        // console.log(json.categoriesData);
      });
  };

  useEffect(() => {
    apiGet();
  });
  return (
    <div className="container mt-5 pb-5">
      <div className="container px-4">
        <div className="card">
          <div className="card-header">
            <h4>
              Category List
              <Link
                to="/addcategories"
                className="btn btn-primary btn-sm float-end"
              >
                Add Category
              </Link>
            </h4>
          </div>
          <div className="card-body">
            <table className="table table-striped-rows">
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Description</th>
                  <th scope="col">Discount Type</th>
                  <th scope="col">Image</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>{item.category}</td>
                      <td>{item.description}</td>
                      <td>{item?.plansId?.name}</td>
                      <td>
                        <img
                          src={`img/${item.image}`}
                          alt="img"
                          style={{ height: "50px" }}
                        />
                      </td>
                      <td>{item.date.slice(0, 10)}</td>
                      <td>{item.status}</td>
                      <td>
                        {" "}
                        <Link to={"/editcategory/" + item._id}>
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

export default Category;
