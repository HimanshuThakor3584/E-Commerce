import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

const ProductPage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [categories, setCategories] = useState([]);
  const params = useParams();

  const productDetailFetch = useCallback(async () => {
    const result = await fetch(`http://localhost:5000/product/${params._id}`);
    const reResult = await result.json();
    setData(reResult);
  }, [params]);

  const categoryList = () => {
    fetch("http://localhost:5000/api/categories/fetchallcategories")
      .then((response) => response.json())
      .then((json) => {
        setCategories(json.categoriesData);
      });
  };

  var discounttype = categories.find((x) => x?._id === data?.categoryId)
    ?.plansId?.discounttype;
  var data1;
  if (discounttype === "1. Fixed Amount") {
    data1 = Math.round(
      data.price -
        categories.find((x) => x?._id === data?.categoryId)?.plansId?.discount
    );
  } else if (discounttype === "2. Percentage") {
    data1 = Math.round(
      (data.price *
        (100 -
          categories.find((x) => x?._id === data?.categoryId)?.plansId
            ?.discount)) /
        100
    );
  } else {
    data1 = data.price;
  }

  useEffect(() => {
    productDetailFetch();
    categoryList();
  }, [productDetailFetch]);
  console.log(data);

  return (
    <>
      <section
        className="bg-img1 txt-center p-lr-15 p-tb-92"
        style={{ backgroundImage: 'url("images/productdetails.jpg")' }}
      >
        {/* <h2 className="ltext-105 cl0 txt-center">About</h2> */}
      </section>
      <section className="p-t-50 p-b-40">
        <div className="container shadow-sm p-3 mb-5 bg-white rounded ">
          <div className="row justify-content-evenly">
            <div className="row m-0">
              <div className="col-lg-4 left-side-product-box pb-3">
                <img
                  src={`img/${data.image}`}
                  style={{ height: "400px" }}
                  alt="img"
                  className="img-fluid"
                />
              </div>
              <div className="col-lg-6">
                <div className="right-side-pro-detail p-3 m-0">
                  <div className="row">
                    <div className="col-lg-12 p-3">
                      <span>
                        <h3>
                          <b>{data.name}</b>
                        </h3>
                      </span>
                      <span>{data.details}</span>
                      <hr className="p-0 m-0" />
                    </div>
                    <div className="col-lg-12 pt-2 ">
                      <span className="m-0 p-0 price-pro">
                        ₹{data1}
                        {data1 === data.price ? (
                          <>
                            <br />
                            <span className="text-danger">
                              Not Deal of the day
                            </span>
                          </>
                        ) : (
                          <>
                            <span
                              className="price-pro text-decoration-line-through"
                              style={{ marginLeft: "5px" }}
                            >
                              <b> ₹{data.price}</b>
                            </span>
                          </>
                        )}
                        <p className="m-0 p-0 price-pro text-success">
                          {categories.find((x) => x?._id === data?.categoryId)
                            ?.plansId?.discounttype === "1. Fixed Amount" && (
                            <>
                              ₹
                              {
                                categories.find(
                                  (x) => x?._id === data?.categoryId
                                )?.plansId?.discount
                              }{" "}
                              off{" "}
                              <span className="text-danger">
                                Deal of the day
                              </span>
                            </>
                          )}
                          {categories.find((x) => x?._id === data?.categoryId)
                            ?.plansId?.discounttype === "2. Percentage" && (
                            <>
                              {" "}
                              {
                                categories.find(
                                  (x) => x?._id === data?.categoryId
                                )?.plansId?.discount
                              }
                              % off{" "}
                              <span className="text-danger">
                                Deal of the day
                              </span>
                            </>
                          )}
                        </p>
                      </span>
                      <hr className="m-0 pt-2 mt-2" />
                      <h4>Available offers</h4>
                      <p>
                        ### Partner Offer Sign up for Ecommerce Pay Later and
                        get Ecommerce Gift ...
                      </p>
                      <p>
                        ### Partner OfferBuy this product and get upto ₹... off
                        on Ecommerce Furniture...
                      </p>
                      <p>
                        ### Bank Offer10% instant discount on PNB Credit Card,
                        up to ₹500, on orders of ₹5000 and above...
                      </p>
                    </div>
                    <div className="col-lg-12 mt-3">
                      <div className="row">
                        <div className="col-lg-6 pb-2">
                          <Link
                            to="/cart"
                            className="btn btn-primary w-100"
                            onClick={() => dispatch(addToCart(data))}
                          >
                            Add To Cart
                          </Link>
                        </div>
                        <div className="col-lg-6">
                          <Link to="/" className="btn btn-primary w-100">
                            Shop Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
