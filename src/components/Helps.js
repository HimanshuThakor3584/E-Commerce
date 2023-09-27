import React from "react";
import "./css/index.css";

const Helps = () => {
  return (
    <section className=" p-b-40">
      <div className="container">
        <div className="row">
          <div className="col-lx-12">
            <div className="card-body">
              <div className="row justify-content-center mt-4">
                <div className="col-xl-5 col-lg-8">
                  <div className="text-center">
                    <h3>Frequently Asked Questions?</h3>
                    <p className="text-muted">
                      If several languages coalesce, the grammar of the
                      resulting language is more simple and regular than that of
                      the individual
                    </p>
                  </div>
                </div>
                {/* <!-- end col --> */}
              </div>
              {/* <!-- end row --> */}
              <div className="row justify-content-center mt-5">
                <div className="col-9">
                  <ul
                    className="nav nav-tabs  nav-tabs-custom nav-justified justify-content-center faq-tab-box"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active text-primary"
                        id="pills-genarel-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-genarel"
                        type="button"
                        role="tab"
                        aria-controls="pills-genarel"
                        aria-selected="true"
                      >
                        <span className="font-size-16">General Questions</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link  text-primary"
                        id="pills-privacy_policy-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-privacy_policy"
                        type="button"
                        role="tab"
                        aria-controls="pills-privacy_policy"
                        aria-selected="false"
                      >
                        <span className="font-size-16">Privacy Policy</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link  text-primary"
                        id="pills-teachers-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-pricing_plan"
                        type="button"
                        role="tab"
                        aria-controls="pills-pricing_plan"
                        aria-selected="false"
                      >
                        <span className="font-size-16">
                          Pricing &amp; Plans
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-9">
                  <div className="tab-content pt-3" id="pills-tabContent">
                    <div
                      className="tab-pane fade active show"
                      id="pills-genarel"
                      role="tabpanel"
                      aria-labelledby="pills-genarel-tab"
                    >
                      <div className="row g-4 mt-2">
                        <div className="col-lg-6">
                          <h5>What is Lorem Ipsum ?</h5>
                          <p className="text-muted">
                            If several languages coalesce, the grammar of the
                            resulting language is more simple and regular than
                            that of the individual languages. The new common
                            language will be more simple and regular than the
                            existing
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <h5>Why do we use it ?</h5>
                          <p className="text-muted">
                            Their separate existence is a myth. For science,
                            music, sport, etc, Europe uses the same vocabulary.
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <h5>Where does it come from ?</h5>
                          <p className="text-muted">
                            If several languages coalesce, the grammar of the
                            resulting language is more simple and regular than
                            that of the individual languages. The new common
                            language will be more simple and regular than the
                            existing
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <h5>Where can I get some?</h5>
                          <p className="lg-base">
                            If several languages coalesce, the grammar of the
                            resulting language is more simple and regular than
                            that of the individual languages.{" "}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-privacy_policy"
                      role="tabpanel"
                      aria-labelledby="pills-privacy_policy-tab"
                    >
                      <div className="row g-4 mt-2">
                        <div className="col-lg-6">
                          <h5>Where can I get some ?</h5>
                          <p className="lg-base">
                            If several languages coalesce, the grammar of the
                            resulting language is more simple and regular than
                            that of the individual languages. The new common
                            language will be more simple and regular than the
                            existing
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <h5>Where does it come from ?</h5>
                          <p className="lg-base">
                            If several languages coalesce, the grammar of the
                            resulting language is more simple and regular than
                            that of the individual languages. The new common
                            language will be more simple and regular than the
                            existing
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <h5>Why do we use it ?</h5>
                          <p className="lg-base">
                            If several languages coalesce, the grammar of the
                            resulting language is more simple and regular than
                            that of the individual languages. The new common
                            language will be more simple and regular than the
                            existing
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <h5>What is Genius privacy policy</h5>
                          <p className="lg-base">
                            If several languages coalesce, the grammar of the
                            resulting language is more simple and regular than
                            that of the individual languages. The new common
                            language will be more simple and regular than the
                            existing
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-pricing_plan"
                      role="tabpanel"
                    >
                      <div className="row g-4 mt-4">
                        <div className="col-lg-6">
                          <h5>Where does it come from ?</h5>
                          <p className="lg-base">
                            If several languages coalesce, the grammar of the
                            resulting language is more simple and regular than
                            that of the individual languages. The new common
                            language will be more simple and regular than the
                            existing
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <h5>Why do we use it ?</h5>
                          <p className="lg-base">
                            If several languages coalesce, the grammar of the
                            resulting language is more simple and regular than
                            that of the individual languages. The new common
                            language will be more simple and regular than the
                            existing
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <h5>What is Lorem Ipsum ?</h5>
                          <p className="lg-base">
                            If several languages coalesce, the grammar of the
                            resulting language is more simple and regular than
                            that of the individual languages. The new common
                            language will be more simple and regular than the
                            existing
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <h5>What is Lorem Ipsum?</h5>
                          <p className="lg-base">
                            If several languages coalesce, the grammar of the
                            resulting language is more simple and regular than
                            that of the individual languages. The new common
                            language will be more simple and regular than the
                            existing
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end row --> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Helps;
