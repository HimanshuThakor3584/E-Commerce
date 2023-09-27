import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Shop = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const currentDate = new Date().toLocaleString();
  console.log(currentDate)
 
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
    <>
      <section
        className="bg-img1 txt-center p-lr-15 p-tb-92"
        style={{ backgroundImage: 'url("images/bg-01.jpg")' }}
      >
        {/* <h2 className="ltext-105 cl0 txt-center">About</h2> */}
      </section>
      <section className="bg0 p-t-23">
        <div className="container">
          <div className="p-b-10">
            <h3 className="ltext-103 cl5">Products</h3>
          </div>

          <div className="flex-w flex-sb-m p-b-52">
            <div className="flex-w flex-l-m filter-tope-group m-tb-10">
              <button
                className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active`}
                value={categories._id}
                onClick={(e) => setCategoryId(e.target.value)}
                data-filter="*"
              >
                All Products
              </button>
              {categories.map((item, key) => {
                return (
                  <button
                    className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 "
                    key={key}
                    value={item._id}
                    onClick={(e) => setCategoryId(e.target.value)}
                  >
                    {item.category}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="row isotope-grid">
            {data
              .filter((x) => {
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
                            <b>
                              {console.log(categories.find((x) => x?._id === item?.categoryId)
                          ?.plansId?.endplan)}
                              
                              {categories.find((x) => x?._id === item?.categoryId)
                          ?.plansId?.endplan === currentDate ? (<>₹{item.price}</>) : (<>₹{data} {data === item.price ? (
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
                          )}</>)}
                              
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
                                )?.plansId?.discounttype ===
                                  "2. Percentage" && (
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
                            </b>
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

export default Shop;
