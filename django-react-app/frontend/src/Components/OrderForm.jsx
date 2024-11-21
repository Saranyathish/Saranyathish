import React, { useState, useEffect } from "react"; // Import useState
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UploadOffcanvas from "./UploadOffcanvas ";

const OrderGrid = () => {
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState(false); // State to manage offcanvas visibility
  const [data, setData] = useState([]);
  const [rowData, setRowData] = useState([]);

  const columnDefs = [
    { headerName: "Action (Source)", field: "actionSource", editable: true },
    {
      headerName: "Pick Up Location (Source)",
      field: "pickUpLocation",
      editable: true,
    },
    {
      headerName: "Drop Location (Destination)",
      field: "dropLocation",
      editable: true,
    },
    { headerName: "Order Number", field: "orderNumber", editable: true },
    {
      headerName: "Invoicing Date (M/D/YYYY)",
      field: "invoicingDate",
      editable: true,
    },
    { headerName: "Quantity", field: "quantity", editable: true },
    {
      headerName: "Dealer Available Time (From 00:00)",
      field: "dealerAvailableTimeFrom",
      editable: true,
    },
    {
      headerName: "Dealer Available Time (To 23:59)",
      field: "dealerAvailableTimeTo",
      editable: true,
    },
    { headerName: "Volume (M3)", field: "volume", editable: true },
    { headerName: "Weight (Kgs)", field: "weight", editable: true },
    {
      headerName: "Delivery Date (M/D/YYYY)",
      field: "deliveryDate",
      editable: true,
    },
  ];

  const dataLoading = (data) => {
    // console.log("Data loaded into grid:");
    const updatedRowData = data.map((d, index) => {
      // console.log("data",d)
      const row = {
        actionSource: d.Action || `Action ${index + 1}`,
        pickUpLocation: d.pickuplocation || `Location ${index + 1}`,
        dropLocation: d.DropLocation || `Drop ${index + 1}`,
        orderNumber: d.OrgerNumber || `Order ${index + 1}`,

        invoicingDate: d.InvoiceDate || null,
        quantity: d.Quantity || 0,
        dealerAvailableTimeFrom: d.DealerAvailable || "00:00",
        dealerAvailableTimeTo: d.DealerAvailable2 || "23:59",
        volume: d.VolumeM3 || 0,
        weight: d.Weight_kgs || 0,
        deliveryDate: d.DeliveryDate || null,
      };
      // console.log(Row ${index + 1}:, row);
      return row;
    });

    setRowData(updatedRowData);
  };

  useEffect(() => {
    if (data.length > 0) {
      dataLoading(data);
    }
  }, [data]);

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
  };

  const handleDataFromChild = (uploadedData) => {
    setData(uploadedData); // Update the parent state with data from the child
    // console.log("Data received from UploadOffcanvas:", uploadedData); // Log the data
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <h3>Run New Plan</h3>
      <ButtonGroup>
        <ActionButton onClick={() => navigate("/create")}>Create</ActionButton>
        <ActionButton onClick={() => setShowOffcanvas(true)}>
          Upload
        </ActionButton>{" "}
        {/* Show offcanvas on click */}
      </ButtonGroup>

      <UploadOffcanvas
        show={showOffcanvas}
        handleClose={() => setShowOffcanvas(false)}
        onSendData={handleDataFromChild}
      />

      {data.length <= 0 && (
        <div
          className="ag-theme-alpine"
          style={{ height: "400px", width: "1600px", marginTop: "20px" }}
        >
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={columnDefs}
            rowData={"ho"}
            defaultColDef={{ resizable: true }}
          />
        </div>
      )}
      {data.length > 0 && (
        <div
          className="ag-theme-alpine"
          style={{ height: "400px", width: "1600px", marginTop: "20px" }}
          onLoad={() => {
            dataLoading(data);
          }}
        >
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={columnDefs}
            rowData={rowData}
            defaultColDef={{ resizable: true }}
          />
        </div>
      )}
      <SubmitButton onClick={() => console.log("Submit clicked!")}>
        Submit & Run Plan
      </SubmitButton>
    </Container>
  );
};

// Styled components for layout and buttons
const Container = styled.div`
  position: relative;
  padding: 20px;
`;

const ButtonGroup = styled.div`
  position: absolute;
  top: 4px;
  right: 20px;
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const SubmitButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 12px 40px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default OrderGrid;
