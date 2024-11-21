import React from "react";
import '../Styles/create.css';


const CreatePage = () => {

    
  return (
    <div style={{ marginTop:'100%', paddingTop:'50px', paddingLeft:'40px', paddingRight:'40px' }} 
      className="container-fluid mt-5"
       // Adjusted margin here
    >
    

      <div className="row">
        {/* Left Side: Order Details */}
        <div className="col-12 col-md-4 border-end" style={{marginTop:'400px'}}>
          <h5 className="text-success">Order Details</h5>
          <hr></hr>

          <div className="row g-3" >
            {[
              "Movement Type",
              "Order Type",
              "Service Type",
              "Order Date",
              "MAWB/HAWB/Customer",
              "Delivery Ref Number",
            ].map((label, index) => (
              <div className="col-12 col-md-6" key={index}>
                <label
                  htmlFor={label.replace(/\s/g, "").toLowerCase()}
                  className="form-label"
                >
                  {label} *
                </label>
                {index < 3 ? (
                  <select
                    id={label.replace(/\s/g, "").toLowerCase()}
                    className="form-select"
                  >
                    <option>{label}</option>
                  </select>
                ) : (
                  <input
                    type={index === 3 ? "date" : "text"}
                    id={label.replace(/\s/g, "").toLowerCase()}
                    className="form-control"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Customer / Billing Party */}
          <h5 className="text-success mt-3">Customer / Billing Party</h5>
          <hr></hr>
          <div className="row g-1">
            <div className="col-12 col-md-6">
              <label htmlFor="customer" className="form-label">
                Customer *
              </label>
              <input type="text" id="customer" className="form-control" />
            </div>
            {["Details", "Contact", "Email"].map((label, index) => (
              <div className="col-12 col-md-6" key={index}>
                <p>{label}</p>
              </div>
            ))}
          </div>

          {/* Order Requirements */}
          <h5 className="text-success mt-3">Order Requirements</h5>
          <hr></hr>
          <div className="row g-1">
            {[
              "Vehicle Type",
              "No. of Trucks Required?",
              "No. of Porters Required?",
              "Order Remarks",
            ].map((label, index) => (
              <div className="col-12 col-md-6" key={index}>
                <label
                  htmlFor={label.replace(/\s/g, "").toLowerCase()}
                  className="form-label"
                >
                  {label}
                </label>
                {label === "Vehicle Type" ? (
                  <input
                    type="text"
                    id={label.replace(/\s/g, "").toLowerCase()}
                    className="form-control"
                  />
                ) : label.includes("Required") ? (
                  <input
                    type="number"
                    id={label.replace(/\s/g, "").toLowerCase()}
                    className="form-control"
                  />
                ) : (
                  <textarea
                    id={label.replace(/\s/g, "").toLowerCase()}
                    className="form-control"
                  ></textarea>
                )}
              </div>
            ))}
          </div>

          {/* Order Freight Details */}
          <h5 className="text-success mt-3">Order Freight Details</h5>
          <hr></hr>
          <div className="row g-1">
            {[
              "Vessel",
              "Voyage / Flight",
              "Freight",
              "Clearance Date",
              "Product Category",
            ].map((label, index) => (
              <div className="col-12 col-md-6" key={index}>
                <label
                  htmlFor={label.replace(/\s/g, "").toLowerCase()}
                  className="form-label"
                >
                  {label}
                </label>
                <input
                  type={index === 3 ? "date" : "text"}
                  id={label.replace(/\s/g, "").toLowerCase()}
                  className="form-control"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Transport & Shipment Details */}
        <div className="col-12 col-md-8" style={{marginTop:'400px'}}>
          <h5 className="text-success">Transport & Shipment Details</h5>
          <hr></hr>
          <ul className="nav nav-tabs mb-3">
            {["Direct", "One To Many", "Many To One", "Multi Stop"].map(
              (buttonText, index) => (
                <div className="mt-1" key={index}>
                  <button
                    className={`btn ${index === 0 ? "btn-primary" : ""}`}
                    style={{
                      width: "200px",
                      backgroundColor: index === 0 ? "#ed475b" : "",
                      color: index !== 0 ? "green" : "",
                      border: index !== 0 ? "1px solid black" : "",
                    }}
                  >
                    {buttonText}
                  </button>
                </div>
              )
            )}
          </ul>

          <div className="tab-content">
            <div id="direct" className="tab-pane fade show active">
              <div className="row">
                {/* Shipper Section */}

                <div className="col-12 col-md-6">
                  <h6 style={{ color: "green" }}>Shipper</h6>
                  <hr></hr>
                  <div className="row g-1">
                    {[
                      "Shipper / Pickup",
                      "Pickup / Receive Date",
                      "Address", // Address field will be full-width
                      "City",
                      "District",
                      "State",
                      "Zip Code",
                      "lat,long",
                      "Contact Number",
                      "Contact info",
                      "Remark",
                    ].map((label, index) => (
                      <div
                        className={`col-12 ${
                          label === "Address" ? "col-md-12" : "col-md-6"
                        }`}
                        key={index}
                      >
                        <label
                          htmlFor={label.replace(/\s/g, "").toLowerCase()}
                          className="form-label"
                        >
                          {label}
                        </label>
                        <input
                          type="text"
                          id={label.replace(/\s/g, "").toLowerCase()}
                          className="form-control"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="col-md-1 d-none d-md-flex justify-content-center align-items-start">
                  <div
                    style={{
                      height: "100%",
                      borderLeft: "1px solid #acacad",
                      marginTop: "20px",
                    }}
                  ></div>
                </div>

                {/* Consignee Section */}

                <div className="col-12 col-md-5">
                  <h6 style={{ color: "green" }}>Consignee</h6>
                  <hr></hr>
                  <div className="row g-1">
                    {[
                      "Consignee / Delivery",
                      "Delivery Date",
                      "Address", // Address field will be full-width
                      "City",
                      "District",
                      "State",
                      "Zip Code",
                      "lat,long",
                      "Contact Number",
                      "Contact info",
                      "Remark",
                    ].map((label, index) => (
                      <div
                        className={`col-12 ${
                          label === "Address" ? "col-md-12" : "col-md-6"
                        }`}
                        key={index}
                      >
                        <label
                          htmlFor={label.replace(/\s/g, "").toLowerCase()}
                          className="form-label"
                        >
                          {label}
                        </label>
                        <input
                          type="text"
                          id={label.replace(/\s/g, "").toLowerCase()}
                          className="form-control"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Item / Commodity Section */}
            <div className="container mt-3 p-3">
              <h6 className="mb-3" style={{ color: "green" }}>
                Shipping Item / Commodity
              </h6>
              <hr />
              <div className="row">
                {[
                  { label: "Product / SKU ID", colSize: 2 },
                  { label: "Qty", colSize: 1 },
                  { label: "Pack Type", colSize: 2 },
                  { label: "L x W x H", colSize: 2 },
                  { label: "Weight", colSize: 1 },
                  { label: "Volume", colSize: 2 },
                  { label: "Remark", colSize: 2 },
                ].map((field, index) => (
                  <div className={`col-12 col-md-${field.colSize}`} key={index}>
                    <div className="mb-3">
                      <label
                        htmlFor={field.label.replace(/\s/g, "").toLowerCase()}
                        className="form-label"
                      >
                        {field.label}
                      </label>
                      <input
                        type="text"
                        id={field.label.replace(/\s/g, "").toLowerCase()}
                        className="form-control"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-mm me-5"
                style={{ backgroundColor: "#fadd69" }}
              >
                Save & Add New
              </button>
              <button
                className="btn btn-mm me-5"
                style={{ backgroundColor: "#ce55f2" }}
              >
                Save & Close
              </button>
              <button
                className="btn btn-mm me-5"
                style={{ color: "red", border: "1px solid red" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
