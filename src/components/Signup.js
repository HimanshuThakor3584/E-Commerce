import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    role: "0",
  });
  let history = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    const { name, email, password, role } = credentials;
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    });
    if (!credentials.name || !credentials.email || !credentials.password) {
      setError(true);
      return false;
    }
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem("token", json.role);
      history("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
    localStorage.getItem("totalPrice") === "0"
      ? history("/")
      : history("/cart");
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-2">
      <div className="row justify-content-evenly">
        <div className="col-md-5  shadow p-3 mb-5 bg-white rounded">
          <div className="mt-3">
            <h2 className="my-3">Create an Account to E-Commerce</h2>
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="name"
                  className="form-control"
                  id="name"
                  name="name"
                  value={credentials.name}
                  onChange={onChange}
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
                {error && !credentials.name && (
                  <span style={{ color: "red" }}>Enter Valid Name</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
                {error && !credentials.email && (
                  <span style={{ color: "red" }}>Enter Valid Email</span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  minLength={5}
                />
                {error && !credentials.password && (
                  <span style={{ color: "red" }}>Enter Valid PassWord</span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="cpassword"
                  name="cpassword"
                  value={credentials.cpassword}
                  onChange={onChange}
                  minLength={5}
                />
                {error && !credentials.cpassword && (
                  <span style={{ color: "red" }}>
                    Enter Valid Confirm PassWord
                  </span>
                )}
              </div>
              <div className="container pt-3" style={{ width: "100%" }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
