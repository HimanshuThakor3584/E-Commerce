import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/App.css";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  // Best sales product slider
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }; //

  const apiGet = () => {
    fetch("http://localhost:5000/api/products/fetchallproducts")
      .then((response) => response.json())
      .then((json) => {
        setData(json.productsData);
        console.log(json);
      });
  };

  const categoryList = () => {
    fetch("http://localhost:5000/api/categories/fetchallcategories")
      .then((response) => response.json())
      .then((json) => {
        setCategories(json.categoriesData);
        console.log(json);
      });
  };

  //Button hover Effect
  const removeclass = () => {
    const list = document.getElementById("button").classList;
    const list2 = document.getElementById("button2").classList;
    list.remove("how-active1");
    list2.remove("how-active1");
  };

  const submit = (e) => {
    setCategoryId(e.target.value);
    const list = document.getElementById("button").classList;
    removeclass();
    list.add("how-active1");
  };

  const submit2 = (e) => {
    setCategoryId(e.target.value);
    const list2 = document.getElementById("button2").classList;
    removeclass();
    list2.add("how-active1");
  };

  useEffect(() => {
    apiGet();
    categoryList();
  }, []);

  return (
    <>
      {/* slider */}
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="false"
      >
        <ul className="carousel-indicators">
          <li
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></li>
          <li
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></li>
          <li
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></li>
        </ul>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="images/slide-01.jpg"
              className="d-block w-100"
              alt="First slide"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="ltext-101 cl2 respon2">Cloth Collection 2023</h5>
              <p className="ltext-201 cl2 p-t-19 p-b-43 respon1">NEW SEASON</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="images/slide-02.jpg"
              className="d-block w-100"
              alt="Second slide"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="ltext-101 cl2 respon2">Mobile Collection</h5>
              <p className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                {" "}
                New Mobile Launch
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="images/slide-03.jpg"
              className="d-block w-100"
              alt="Third slide"
            />
            <div
              className="carousel-caption d-none d-md-block"
              style={{ left: "40%" }}
            >
              {/* <h5 className="ltext-101 cl2 respon2">Grocery</h5> */}
              <p className="ltext-201 cl2 p-t-19 p-b-43 respon1">Grocery</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* most sales product */}
      <section className="bg0 p-t-23 p-b-50">
        <div className="container">
          <div className="p-b-30">
            <h3 className="ltext-103 cl5">Best Sales Products</h3>
          </div>
          <Slider {...settings}>
            {/* eslint-disable-next-line  */}
            {data.filter((x) => {
                if (x.bestsales === "Active") {
                  return x;
                }
              })
              .map((item, key) => {
                var discounttype = categories.find(
                  (x) => x?._id === item?.categoryId
                )?.plansId?.discounttype;
                var data;
                if (discounttype === "1. Fixed Amount") {
                  data = Math.round(
                    item.price -
                      categories.find((x) => x?._id === item?.categoryId)
                        ?.plansId?.discount
                  );
                } else if (discounttype === "2. Percentage") {
                  data = Math.round(
                    (item.price *
                      (100 -
                        categories.find((x) => x?._id === item?.categoryId)
                          ?.plansId?.discount)) /
                      100
                  );
                } else {
                  data = item.price;
                }
                return (
                  <div className="col-xs-6 col-sm-8" key={key}>
                    <div className="tcb-product-item">
                      <div className="fall-item fall-effect">
                        <img
                          src={`img/${item.image}`}
                          style={{ height: "200px" }}
                          className="img-fluid"
                          alt="IMG-PRODUCT"
                        />
                        <Link to={"/" + item._id} className="mask">
                          <p>View Product</p>
                        </Link>
                      </div>
                      <div className="tcb-product-info">
                        <div className="tcb-product-name">
                          <h4>{item.name}</h4>
                        </div>
                        <div className="tcb-hline">
                          <div className="tcb-product-price">
                            <h5>
                              ₹{data}
                              {data === item.price ? (
                                <>
                                  <br />{" "}
                                  <span
                                    className="text-danger"
                                    style={{ fontSize: "15px" }}
                                  >
                                    Not Deal of the day
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span
                                    className="price-pro text-decoration-line-through"
                                    style={{ marginLeft: "2px" }}
                                  >
                                    <b> ₹{item.price}</b>
                                  </span>
                                </>
                              )}
                              <p
                                className="m-0 p-0 price-pro text-success"
                                style={{ fontSize: "15px" }}
                              >
                                <br />
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
                                    off{" "}
                                    <span className="text-danger">
                                      Deal of the day
                                    </span>
                                  </>
                                )}
                                {categories.find(
                                  (x) => x?._id === item?.categoryId
                                )?.plansId?.discounttype ===
                                  "2. Percentage" && (
                                  <>
                                    {" "}
                                    {
                                      categories.find(
                                        (x) => x?._id === item?.categoryId
                                      )?.plansId?.discount
                                    }
                                    % off{" "}
                                    <span className="text-danger">
                                      Deal of the day
                                    </span>
                                  </>
                                )}
                              </p>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </section>

      {/* product  */}
      <section className="bg0 p-t-23">
        <div className="container">
          <div className="p-b-10">
            <h3 className="ltext-103 cl5">Products</h3>
          </div>

          <div className="flex-w flex-sb-m p-b-52">
            <div className="flex-w flex-l-m filter-tope-group m-tb-10">
              <button
                id="button"
                className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5`}
                value={categories._id}
                onClick={submit}
                data-filter="*"
              >
                All Products
              </button>
              {/* eslint-disable-next-line  */}
              {categories.filter((x) => {
                  if (x.status === "Active") {
                    return x;
                  }
                })
                .map((item, key) => {
                  return (
                    <button
                      id="button2"
                      className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5`}
                      key={key}
                      value={item._id}
                      onClick={submit2}
                    >
                      {item.category}
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="row isotope-grid">
            {data.filter((x) => {
                if (categoryId === "") {
                  return x;
                } else return x.categoryId === categoryId;
              })
              .map((item, key) => {
                var discounttype = categories.find(
                  (x) => x?._id === item?.categoryId
                )?.plansId?.discounttype;
                var data;
                if (discounttype === "1. Fixed Amount") {
                  data = Math.round(
                    item.price -
                      categories.find((x) => x?._id === item?.categoryId)
                        ?.plansId?.discount
                  );
                } else if (discounttype === "2. Percentage") {
                  data = Math.round(
                    (item.price *
                      (100 -
                        categories.find((x) => x?._id === item?.categoryId)
                          ?.plansId?.discount)) /
                      100
                  );
                } else {
                  data = item.price;
                }
                return (
                  <div
                    className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women"
                    key={key}
                  >
                    {/* <!-- Block2 --> */}
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img
                          src={`img/${item.image}`}
                          style={{ height: "300px" }}
                          className="img-fluid"
                          alt="IMG-PRODUCT"
                        />

                        <Link
                          to={"/" + item._id}
                          className="block2-btn flex-c-m stext-103 cl2 size-102 bg3 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                        >
                          Quick View
                        </Link>
                      </div>

                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <Link
                            to={"/" + item._id}
                            className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                          >
                            <b> {item.name}</b>
                          </Link>
                          <span className="stext-105 cl3">
                            ₹{data}
                            {data === item.price ? (
                              <>
                                <br />{" "}
                                <span className="text-danger">
                                  Not Deal of the day
                                </span>
                              </>
                            ) : (
                              <>
                                <span
                                  className="price-pro text-decoration-line-through"
                                  style={{ marginLeft: "2px" }}
                                >
                                  <b> ₹{item.price}</b>
                                </span>
                              </>
                            )}
                            <span
                              className="text-success"
                              style={{ marginLeft: "9px" }}
                            >
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
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductList;
