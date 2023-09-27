import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const apiGet = () => {
    fetch("http://localhost:5000/api/products/fetchallproducts")
      .then((response) => response.json())
      .then((json) => {
        setData(json.productsData);
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
    apiGet();
    categoryList();
  }, []);

  return (
    <div className="container mt-5 pb-5">
      <div className="container">
        <div className="nav-item dropdown">
          <div className="row mb-4 ml-1 mr-1">
            <select
              className="custom-select my-1 mr-sm-2 font-weight-bold"
              id="inlineFormCustomSelectPref"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((item, key) => {
                return (
                  <option role={"button"} key={key} value={item._id}>
                    {item.category}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h4>
              Product List
              <Link
                to="/addproduct"
                className="btn btn-primary btn-sm float-end"
              >
                Add Product
              </Link>
            </h4>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Code</th>
                  <th scope="col">Best Sales</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quentity</th>
                  <th scope="col">Image</th>
                  <th scope="col">Details</th>
                  <th scope="col">CreatedDate</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((x) => {
                    if (categoryId === "") {
                      return x;
                    } else return x.categoryId === categoryId;
                  })
                  .map((item, key) => {
                    return (
                      <tr key={key}>
                        <td>{item.name}</td>
                        <td>{item.code}</td>
                        <td>{item.bestsales}</td>
                        <td>₹{item.price}</td>
                        <td>{item.quentity}</td>
                        <td>
                          <img
                            src={`img/${item.image}`}
                            alt="img"
                            style={{ height: "50px" }}
                          />
                        </td>
                        <td>{item.details.slice(0, 200)}...</td>
                        <td>{item.createdDate.slice(0, 10)}</td>
                        <td>{item.status}</td>
                        <td>
                          <Link
                            className="btn btn-primary"
                            to={"/editproduct/" + item._id}
                          >
                            Edit
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

export default Product;
