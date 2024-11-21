import React, { useState } from "react";
import { Offcanvas, Button, Table } from "react-bootstrap"; // Ensure you have react-bootstrap installed
import axios from "axios";

const UploadOffcanvas = ({ show, handleClose,onSendData}) => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);



  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Ensure file is correctly set
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!"); // Alert if no file is selected
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Attach the file to the form data

    try {
      const response = await axios.post("http://127.0.0.1:8000/upload-file/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }); 

      // Handle successful upload response
      setData(response.data.data); // Set the uploaded file data
      setErrors(response.data.errors); // Set any errors
      onSendData(response.data.data);


      if (response.data.errors.length === 0) {
        alert("File uploaded successfully!");
      } else {
        alert("File uploaded, but errors were found.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed. Please try again and Check Your File."); // Failure alert
    }
  };

  

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <h5 style={{ marginTop: "10px" }}>Download Template</h5>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Upload File</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* File Input */}
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange} // Bind the onChange event
          />
          {/* Upload Button */}
          <Button variant="primary" className="mt-3" onClick={handleUpload}>
            Upload
          </Button>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Display errors if any */}
      {errors.length > 0 && (
        <div style={{ marginTop: "10px", padding: "2px", backgroundColor: "#f70a1d",zIndex:"-1" }}>
          <h4>Errors found: Your File</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Row</th>
                <th>Column</th>
                <th>Value</th>
                <th>Error</th>
              </tr>
            </thead>
            <tbody>
              {errors.map((error, index) => (
                <tr key={index}>
                  <td>{error.row}</td>
                  <td>{error.column}</td>
                  <td>{error.value}</td>
                  <td>{error.error}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      
    </>
  );
};

export default UploadOffcanvas;