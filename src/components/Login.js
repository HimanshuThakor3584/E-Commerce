import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!credentials.email || !credentials.password) {
      setError(true);
      return false;
    }
    // alert(json.authtoken);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem("authtoken", json.authtoken);
      localStorage.setItem("token", json.role);
      localStorage.setItem("userId", json.userId);
      props.showAlert("Logged in Successfully", "success");
      if (json.role === "1") {
        history("/category");
      } else {
        history("/");
      }
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
    if (localStorage.getItem("token") === "1") {
      history("/category");
    } else if (localStorage.getItem("totalPrice") === "0") {
      history("/");
    } else {
      history("/cart");
    }
    localStorage.getItem("userId", json.userId);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-2">
      <div className="row justify-content-evenly">
        <div className="col-md-5  shadow p-3 mb-5 bg-white rounded">
          <div className="mt-3">
            <h2 className="my-3">Login to Continue to E-Commerce</h2>
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={credentials.email}
                  onChange={onChange}
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                />
                {error && !credentials.email && (
                  <span style={{ color: "red" }}>Enter valid Email</span>
                )}{" "}
                <br />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={credentials.password}
                  onChange={onChange}
                  id="password"
                  name="password"
                />
                {error && !credentials.password && (
                  <span style={{ color: "red" }}>Enter valid password</span>
                )}{" "}
                <br />
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

            <div className="container pt-3" style={{ width: "100%" }}>
              <span className="text-center">
                ------You have new user in E-commerse site? if Yes please sign
                up-----
              </span>
              <Link
                className="btn btn-primary"
                to="/signup"
                style={{ width: "100%" }}
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
