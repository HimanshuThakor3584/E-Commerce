import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Contact = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:5000/api/contacts/fetchallcontact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (!email || !message) {
      setError(true);
      return false;
    }
    swal({
      title: "Your query has been sent!",
      text: "You clicked the button!",
      icon: "success",
      button: "Aww yes!",
    });
    navigate("/");
  };
  return (
    <div>
      <section
        className="bg-img1 txt-center p-lr-15 p-tb-92"
        style={{ backgroundImage: 'url("images/bg-03.jpg")' }}
      >
        {/* <h2 className="ltext-105 cl0 txt-center">Contact</h2> */}
      </section>

      <section className="bg0 p-t-104 p-b-116">
        <div className="container">
          <div className="flex-w flex-tr">
            <div className="size-210 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
              <form onSubmit={handleSubmit}>
                <h4 className="mtext-105 cl2 txt-center p-b-30">
                  Send Us A Message
                </h4>
                <div className="bor8 m-b-20 how-pos4-parent">
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="text"
                    name="email"
                    placeholder="Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <img
                    style={{ height: "25px" }}
                    className="how-pos4 pointer-none"
                    src="images/icons/icon-email.png"
                    alt="ICON"
                  />
                </div>
                {error && !email && (
                  <span style={{ color: "red" }}>Enter valid Email</span>
                )}{" "}
                <div className="bor8 m-b-30">
                  <textarea
                    className="stext-111 cl2 plh3 size-120 p-lr-28 p-tb-25"
                    name="msg"
                    placeholder="How Can We Help?"
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                {error && !message && (
                  <span style={{ color: "red" }}>Enter valid Message</span>
                )}{" "}
                <button
                  className="btn btn-primary w-100"
                  onClick={handleSubmit}
                >
                  SUBMIT
                </button>
              </form>
            </div>

            <div className="size-210 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md">
              <div className="flex-w w-full p-b-42">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-map-marker"></span>
                </span>

                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">Address</span>

                  <p className="stext-115 cl6 size-213 p-t-18">
                    C - 205, Ganesh Glory 11, Jagatpur Road, Gota, Ahmedabad,
                    Gujarat - 382481.
                  </p>
                </div>
              </div>

              <div className="flex-w w-full p-b-42">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-phone-handset"></span>
                </span>

                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">Lets Talk</span>

                  <p className="stext-115 cl1 size-213 p-t-18">
                    +91 XXXXX XXXXX
                  </p>
                </div>
              </div>

              <div className="flex-w w-full">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-envelope"></span>
                </span>

                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">Support</span>

                  <p className="stext-115 cl1 size-213 p-t-18">
                    support@dmcart.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
