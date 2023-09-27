import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import {
  getCartTotal,
  removeItem,
  clearCart,
  decreaseItemQuentity,
  increaseItemQuentity,
} from "../features/cartSlice";

const Cart = () => {
  var data,
    data1,
    totalDiscount = [];
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, totalQuentity, totalPrice } = useSelector(
    (state) => state.allCart
  );
  console.log(cart);
  // console.log(localStorage.getItem("cart"))
  const proceedTopay = async () => {
    localStorage.getItem("token") === "0"
      ? navigate("/payment")
      : navigate("/login");
  };

  const categoryList = () => {
    fetch("http://localhost:5000/api/categories/fetchallcategories")
      .then((response) => response.json())
      .then((json) => {
        setCategories(json.categoriesData);
      });
  };

  useEffect(() => {
    dispatch(getCartTotal());
    categoryList();
    // eslint-disable-next-line
  }, [cart]);

  return (
    <section className="h-100">
      {!totalQuentity > 0 ? (
        <EmptyCart />
      ) : (
        <div className="container-fluid h-100 py-5">
          <section
            className="bg-img1 txt-center p-lr-15 p-tb-92"
            style={{ backgroundImage: 'url("images/cart.jpg")' }}
          >
            {/* <h2 className="ltext-105 cl0 txt-center">About</h2> */}
          </section>
          <section className="p-t-50 p-b-40">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-10">
                <div className="d-flex justify-content-between align-items-center mb-4 text-center">
                  <h3 className="fw-normal mb-0 text-black ">Shopping Cart</h3>

                  <div className="col-md-2 col-lg-2 col-xl-2 float-end">
                    <button
                      type="button"
                      className="btn btn-primary btn-block btn-lg"
                      onClick={() => dispatch(clearCart())}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
                {cart?.map((item, key) => {
                  var discounttype = categories.find(
                    (x) => x?._id === item?.categoryId
                  )?.plansId?.discounttype;
                  if (discounttype === "1. Fixed Amount") {
                    data =
                      Math.round(
                        categories.find((x) => x?._id === item?.categoryId)
                          ?.plansId?.discount
                      ) * item.quentity;
                    totalDiscount.push(data);
                  } else if (discounttype === "2. Percentage") {
                    data = Math.round(
                      ((item.price *
                        categories.find((x) => x?._id === item?.categoryId)
                          ?.plansId?.discount) /
                        100) *
                        item.quentity
                    );
                    totalDiscount.push(data);
                  } else {
                    data1 = item.price;
                  }
                  return (
                    <div className="card rounded-3 mb-4" key={key}>
                      <div className="card-body p-4">
                        <div className="row d-flex justify-content-between align-items-center">
                          <div className="col-md-2 col-lg-2 col-xl-2 text-center">
                            <img
                              src={`img/${item.image}`}
                              className="img-fluid rounded-3"
                              alt="product-img"
                              style={{ height: "100px" }}
                            />
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <p className="lead fw-normal mb-2">{item.name}</p>
                            <p className=" mb-2">{item.code}</p>
                            <h5 className="mb-0">Price: ₹{item.price}</h5>
                            <span className="text-success">
                              {categories.find(
                                (x) => x?._id === item?.categoryId
                              )?.plansId?.discounttype ===
                                "1. Fixed Amount" && (
                                <>
                                  ₹
                                  {
                                    categories.find(
                                      (x) => x?._id === item?.categoryId
                                    )?.plansId?.discount
                                  }{" "}
                                  off
                                </>
                              )}
                              {categories.find(
                                (x) => x?._id === item?.categoryId
                              )?.plansId?.discounttype === "2. Percentage" && (
                                <>
                                  {
                                    categories.find(
                                      (x) => x?._id === item?.categoryId
                                    )?.plansId?.discount
                                  }
                                  % off
                                </>
                              )}
                            </span>
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <button
                              className="btn btn-link px-2"
                              onClick={() =>
                                dispatch(decreaseItemQuentity(item._id))
                              }
                            >
                              <i className="fas fa-minus"></i>
                            </button>

                            <input
                              id="form1"
                              name="quantity"
                              value={item.quentity}
                              type="text"
                              className="form-control form-control-sm text-center"
                              onChange={() => null}
                            />

                            <button
                              className="btn btn-link px-2"
                              onClick={() =>
                                dispatch(increaseItemQuentity(item._id))
                              }
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                          <div className="col-md-3 text-end">
                            {data1 === item.price ? (
                              <>
                                <h5 className="mb-10">
                                  Amount: ₹{item.quentity * item.price}
                                </h5>
                              </>
                            ) : (
                              <>
                                <h5 className="mb-10">
                                  Amount: ₹{item.quentity * item.price}
                                </h5>
                                <h5 className="mb-10">Discount: ₹{data}</h5>
                              </>
                            )}
                          </div>
                        </div>
                        <span className="text-danger float-end">
                          <i
                            className="fas fa-trash fa-lg"
                            onClick={() => dispatch(removeItem(item._id))}
                          ></i>
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div className="card rounded-3 mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Summary</h5>
                  </div>
                  <div className="card-body p-4">
                    <div className="list-group-item d-flex justify-content-between align-items-center mb-3">
                      <div className="col-md-4  text-center">
                        <button
                          type="button"
                          className="btn btn-primary btn-block btn-lg"
                          onClick={() => navigate("/")}
                        >
                          Continue Shopping
                        </button>
                      </div>
                      <div className="col-md-2 col-lg-2 col-xl-2 text-center">
                        <button
                          type="button"
                          className="btn btn-primary btn-block btn-lg"
                          onClick={proceedTopay}
                        >
                          Process to Pay
                        </button>
                      </div>
                      {data1 === totalPrice ? (
                        <>
                          <h5 className="mb-10">Amount: ₹{totalPrice}</h5>
                        </>
                      ) : (
                        <>
                          <div className="col-md-3 col-lg-2 col-xl-0">
                            <h5 className="mb-10">Amount: ₹{totalPrice}</h5>
                            <h5 className="mb-0">
                              Discount: ₹
                              {`${totalDiscount.reduce(
                                (partialSum, a) => partialSum + a,
                                0
                              )}`}
                            </h5>
                            ----------------------
                            <h5 className="mb-0">
                              Amount: ₹{" "}
                              {totalPrice -
                                `${totalDiscount.reduce(
                                  (partialSum, a) => partialSum + a,
                                  0
                                )}`}
                            </h5>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </section>
  );
};

export default Cart;
