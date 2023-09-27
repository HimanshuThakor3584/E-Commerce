import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductEdit = () => {
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [bestsales, setBestSales] = useState("Inactive");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");
  const [quentity, setQuentity] = useState("");
  const [status, setStatus] = useState("Inactive");
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const params = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const getProductDetails = useCallback(async () => {
    console.log(params);
    let result = await fetch(`http://localhost:5000/product/${params._id}`);
    result = await result.json();
    setCategoryId(result.categoryId);
    setName(result.name);
    setCode(result.code);
    setBestSales(result.bestsales);
    setPrice(result.price);
    setDetails(result.details);
    setImage(result.image);
    setQuentity(result.quentity);
    setStatus(result.status);
  }, [params]);
  const updateProducts = async () => {
    if (
      !categoryId ||
      !name ||
      !code ||
      !bestsales ||
      !price ||
      !details ||
      !image ||
      !quentity ||
      !status
    ) {
      setError(true);
      return false;
    }
    console.log(
      categoryId,
      name,
      code,
      bestsales,
      price,
      details,
      image,
      quentity,
      status
    );
    const formData = new FormData();
    formData.append("categoryId", categoryId);
    formData.append("name", name);
    formData.append("code", code);
    formData.append("bestsales", bestsales);
    formData.append("price", price);
    formData.append("details", details);
    formData.append("image", image);
    formData.append("quentity", quentity);
    formData.append("status", status);
    axios.put(`http://localhost:5000/product/${params._id}`, formData, {
      headers: {
        "Content-Type": "formData",
      },
    });
    navigate("/product");
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

  const handleCheckboxChange = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setStatus("Active");
    } else {
      setStatus("Inactive");
    }
  };
  const handleCheckboxChange1 = () => {
    setIsActive1(!isActive1);
    if (!isActive1) {
      setBestSales("Active");
    } else {
      setBestSales("Inactive");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    getProductDetails();
  }, [getProductDetails]);

  return (
    <div className="container mt-5 pb-5">
      <div className="row justify-content-evenly ">
        <div className="col-md-6 bg-white text-dark rounded p-3 shadow ">
          <form onSubmit={(e) => e.preventDefault}>
            <div className="mb-3">
              <h1>Update Product</h1>
              <br />
              <div className="font-weight-bold">
                <div className="row mb-4 ">
                  <label htmlFor="InputName" className="form-label">
                    Category List
                  </label>
                  <select
                    className="custom-select my-1 mr-sm-2"
                    id="inlineFormCustomSelectPref"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((item, key) => {
                      return (
                        <option key={key} value={item._id}>
                          {item.category}
                        </option>
                      );
                    })}
                  </select>
                  {error && !categoryId && (
                    <span style={{ color: "red" }}>Enter valid category</span>
                  )}{" "}
                </div>
                <label htmlFor="InputPrice" className="form-label">
                  Enter Product Name
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="InputPrice"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {error && !name && (
                  <span style={{ color: "red" }}>Enter Product Name</span>
                )}{" "}
                <br />
                <label htmlFor="InputCategory" className="form-label">
                  Enter code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="InputCategory"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                {error && !code && (
                  <span style={{ color: "red" }}>Enter valid code</span>
                )}{" "}
                <br />
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      checked={isActive1}
                      name="bestsales"
                      value={bestsales}
                      onChange={handleCheckboxChange1}
                      type="checkbox"
                    />
                    {isActive1}
                    <label className="form-check-label" htmlFor="gridCheck">
                      Best Sales Product
                    </label>
                  </div>
                </div>
                <label htmlFor="InputCategory" className="form-label">
                  Enter Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="InputCategory"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {error && !price && (
                  <span style={{ color: "red" }}>Enter valid Price</span>
                )}{" "}
                <br />
                <label htmlFor="InputCategory" className="form-label">
                  Enter Quentity
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="InputCategory"
                  value={quentity}
                  onChange={(e) => setQuentity(e.target.value)}
                />
                {error && !quentity && (
                  <span style={{ color: "red" }}>Enter valid quentity</span>
                )}{" "}
                <br />
                <label htmlFor="formFile" className="form-label">
                  Image File
                </label>
                <input
                  className="form-control"
                  name="image"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {error && !image && (
                  <span style={{ color: "red" }}>Enter valid image</span>
                )}{" "}
                <br />
                <label htmlFor="InputCategory" className="form-label">
                  Enter details
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="InputCategory"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows="3"
                />
                {error && !details && (
                  <span style={{ color: "red" }}>Enter valid details</span>
                )}{" "}
                <br />
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      checked={isActive}
                      name="status"
                      value={status}
                      onChange={handleCheckboxChange}
                      type="checkbox"
                    />
                    <label className="form-check-label" htmlFor="gridCheck">
                      {isActive ? "Active" : "Inactive"}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="container pt-2">
              <button
                type="button"
                onClick={updateProducts}
                className="btn btn-primary"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate("/product");
                }}
                className="btn btn-primary btn float-end"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
