import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CategoryEdit = () => {
  const [category, setCategory] = useState("");
  const [plansId, setPlansId] = useState("");
  const [plans, setPlans] = useState([]);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("Inactive");
  const [isActive, setIsActive] = useState(false);
  const params = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const getCategoryDetails = useCallback(async () => {
    console.log(params);
    let result = await fetch(`http://localhost:5000/category/${params._id}`);
    result = await result.json();
    setCategory(result.category);
    setCode(result.code);
    setPlansId(result.plansId);
    setDescription(result.description);
    setImage(result.image);
    setStatus(result.status);
  }, [params]);
  const updateCategory = async () => {
    if (!plansId || !category || !code || !description || !image || !status) {
      setError(true);
      return false;
    }
    console.log(plansId, category, code, description, image, status);
    const formData = new FormData();
    formData.append("plansId", plansId);
    formData.append("category", category);
    formData.append("code", code);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("status", status);
    axios.put(`http://localhost:5000/category/${params._id}`, formData, {
      headers: {
        "Content-Type": "formData",
      },
    });
    navigate("/category");
  };

  const planList = () => {
    fetch("http://localhost:5000/api/plans/fetchallplans")
      .then((response) => response.json())
      .then((json) => {
        setPlans(json.plansData);
      });
  };
  useEffect(() => {
    planList();
  }, []);

  const handleCheckboxChange = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setStatus("Active");
    } else {
      setStatus("Inactive");
    }
  };

  useEffect(() => {
    //eslint-disable-next-line
    getCategoryDetails();
  }, [getCategoryDetails]);
  return (
    <div className="container mt-5 pb-5">
      <div className="row justify-content-evenly ">
        <div className="col-md-6 bg-white text-dark rounded p-3 shadow">
          <form onSubmit={(e) => e.preventDefault}>
            <div className="mb-3">
              <h1>Update Category</h1>
              <br />
              <div className="font-weight-bold">
                <label htmlFor="InputName" className="form-label">
                  Enter Category Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="InputName"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                {error && !category && (
                  <span style={{ color: "red" }}>Enter valid Category</span>
                )}{" "}
                <br />
                <label htmlFor="InputPrice" className="form-label">
                  Enter Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="InputPrice"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                {error && !code && (
                  <span style={{ color: "red" }}>Enter valid code</span>
                )}{" "}
                <br />
                <div className="row mb-4 ">
                  <label htmlFor="InputName" className="form-label">
                    Discount Type
                  </label>
                  <select
                    className="custom-select my-1 mr-sm-2"
                    id="inlineFormCustomSelectPref"
                    value={plansId}
                    onChange={(e) => setPlansId(e.target.value)}
                  >
                    <option value="">Select Discount Choose...</option>
                    {plans
                      .filter((x) => {
                        if (x.status === "Active") {
                          return x;
                        }
                      })
                      .map((item, key) => {
                        return (
                          <option key={key} value={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <label htmlFor="InputCategory" className="form-label">
                  Enter Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="InputCategory"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {error && !description && (
                  <span style={{ color: "red" }}>Enter valid description</span>
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
                onClick={updateCategory}
                className="btn btn-primary"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate("/category");
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

export default CategoryEdit;
