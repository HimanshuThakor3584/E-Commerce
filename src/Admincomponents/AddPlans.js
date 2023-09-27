import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPlans = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [discounttype, setDiscounttype] = useState("");
  const [discount, setDiscount] = useState("");
  const [startplan, setStartPlan] = useState("");
  const [endplan, setEndPlan] = useState("");
  const [status, setStatus] = useState("Inactive");
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:5000/api/plans/fetchallplans",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          discounttype,
          discount,
          startplan,
          endplan,
          status,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (!name || !discounttype || !discount || !startplan || !endplan) {
      setError(true);
      return false;
    }
    navigate("/plans");
  };
  const handleCheckboxChange = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setStatus("Active");
    } else {
      setStatus("Inactive");
    }
  };

  return (
    <div className="container mt-5 pb-5">
      <div className="row justify-content-evenly ">
        <div className="col-md-6 bg-white text-dark srounded p-3 shadow">
          <form onSubmit={(e) => e.preventDefault}>
            <div className="mb-3">
              <h1>Discount</h1>
              <br />
              <div className="font-weight-bold">
                <div className="row mb-4 ">
                  <label htmlFor="InputName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="InputName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {error && !name && (
                    <span style={{ color: "red" }}>Enter valid Name</span>
                  )}{" "}
                </div>
                <div className="row mb-4 ">
                  <label htmlFor="InputName" className="form-label">
                    Discount Type
                  </label>
                  <select
                    className="custom-select my-1 mr-sm-2"
                    id="inlineFormCustomSelectPref"
                    value={discounttype}
                    onChange={(e) => setDiscounttype(e.target.value)}
                  >
                    <option>Choose...</option>
                    <option>1. Fixed Amount</option>
                    <option>2. Percentage</option>
                  </select>
                  {error && !discounttype && (
                    <span style={{ color: "red" }}>
                      Discount Choose...
                    </span>
                  )}{" "}
                </div>
                <div className="row mb-4 ">
                  <label htmlFor="InputName" className="form-label">
                    Discount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="InputName"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                  {error && !discount && (
                    <span style={{ color: "red" }}>Enter valid Discount</span>
                  )}{" "}
                </div>
                <div className="row mb-4 ">
                  <label htmlFor="InputName" className="form-label">
                    Start Discount
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="todate"
                    placeholder="dd-mm-yyyy"
                    onChange={(e) => setStartPlan(e.target.value)}
                  />
                  {error && !startplan && (
                    <span style={{ color: "red" }}>Enter valid StartDate</span>
                  )}{" "}
                </div>
                <div className="row mb-4 ">
                  <label htmlFor="InputName" className="form-label">
                    End Discount
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="todate"
                    placeholder="dd-mm-yyyy"
                    onChange={(e) => setEndPlan(e.target.value)}
                  />
                  {error && !endplan && (
                    <span style={{ color: "red" }}>Enter valid EndDate</span>
                  )}{" "}
                </div>
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
                    {isActive}
                    <label className="form-check-label" htmlFor="gridCheck">
                      Check me out
                    </label>
                  </div>
                </div>
                <div className="container pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/plans");
                    }}
                    className="btn btn-primary btn float-end"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlans;
