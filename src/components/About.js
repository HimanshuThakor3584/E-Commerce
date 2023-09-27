import React from "react";

const About = () => {
  return (
    <div>
      <section
        className="bg-img1 txt-center p-lr-15 p-tb-92"
        style={{ backgroundImage: 'url("images/bg-02.jpg")' }}
      ></section>

      <section className="bg0 p-t-75 p-b-120">
        <div className="container">
          <div className="row p-b-148">
            <div className="col-md-7 col-lg-8">
              <div className="p-t-7 p-r-85 p-r-15-lg p-r-0-md">
                <h3 className="mtext-111 cl2 p-b-16">Our Story</h3>

                <p className="stext-113 cl6 p-b-26">
                  DM Shoping Cart is a leading Global Tech. Company
                  headquartered in Gujarat, India. We provide a broad range of
                  solutions with digital consultation and development in a
                  strategic, innovative, and creative style. We specialize in
                  transforming our users’ business continuously by providing the
                  right insight, deploying the most sought after technology
                  solutions.
                </p>

                <p className="stext-113 cl6 p-b-26">
                  Our team has over 5 years of experience in DM Shoping Cart
                  platform development, content management system architecture,
                  enterprise inventory management design, and open source
                  contributions. We help businesses solve creative and
                  commercial challenges with a modern, modular approach to DM
                  Shoping Cart.
                </p>

                <p className="stext-113 cl6 p-b-26">
                  Any questions? C - 205, Ganesh Glory 11, Jagatpur Road, Gota,
                  Ahmedabad, Gujarat - 382481. (+91)XXXXX XXXXX
                </p>
              </div>
            </div>

            <div className="col-11 col-md-5 col-lg-4 m-lr-auto">
              <div className="how-bor1 ">
                <div className="hov-img0">
                  <img src="images/about-01.jpg" alt="IMG" />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="order-md-2 col-md-7 col-lg-8 p-b-30">
              <div className="p-t-7 p-l-85 p-l-15-lg p-l-0-md">
                <h3 className="mtext-111 cl2 p-b-16">Our Mission</h3>

                <p className="stext-113 cl6 p-b-26">
                  People prefer to buy from companies they can put their faith
                  in. In the modern era, it might not always be enough to just
                  place a product in front of people and hope they would buy it.
                  For you to be able to gain the customers you need to give them
                  something to believe in. Your customers want to feel like they
                  are buying into a movement that says something about
                  themselves. People want to invest in something that has a
                  cause.
                </p>

                <div className="bor16 p-l-29 p-b-9 m-t-22">
                  <p className="stext-114 cl6 p-r-40 p-b-11">
                    Incorporating your mission statement in your About Us of
                    online shopping website does that for you. It gives your
                    visitor an overview of your goals and aims, and shows them
                    what makes you unique. It shares the reason why your company
                    exists and what it intends to offer.
                  </p>

                  <span className="stext-111 cl8">-DM Shoping Cart</span>
                </div>
              </div>
            </div>

            <div className="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30">
              <div className="how-bor2">
                <div className="hov-img0">
                  <img src="images/about-02.jpg" alt="IMG" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
