import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const navigate = useNavigate();
  return (
    <>
      {localStorage.getItem("token") === "1" ? (
        <Outlet />
      ) : (
        navigate("/category")
      )}
      ;
    </>
  );
};

export default PrivateRoute;
