import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';
import { FaEye } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";
import { GrPlan } from "react-icons/gr";



const DispatchPlan = () => {
  const [offCanvasVisible, setOffCanvasVisible] = useState(false);
  const [showPlanHistoryDetails, setShowPlanHistoryDetails] = useState(false); // State to toggle Plan History grid visibility

  // Function to render Plan History view icon and toggle grid visibility
  const renderPlanHistoryViewIcon = (params) => {
    
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaEye
          style={{ marginRight: '10px', cursor: 'pointer', color: '#007bff', fontSize: '30px' }}
          onClick={() => handlePlanHistoryView(params)} // Toggle Plan History visibility
        />
        <span>{params.value}</span>
      </div>
    );
  };

  // Function to render Drop Details view icon and show its off-canvas
  const renderDropDetailsViewIcon = (params) => {
    
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaEye
          style={{ marginRight: '10px', cursor: 'pointer', color: '#007bff', fontSize: '30px' }}
          onClick={() => handleDropDetailsView()} // Show Drop Details off-canvas
        />
        <span>{params.value}</span>
      </div>
    );
  };

  const renderGeneratePlanIcon = (params) => {
    const handleClick = () => {
      const userConfirmed = window.confirm("Are you sure you want to proceed?");
      if (userConfirmed) {
        // Proceed with any action if user clicks 'OK'
        console.log("User confirmed. Proceeding with Generate Plan.");
      } else {
        // Handle the case if user cancels
        console.log("User canceled the action.");
      }
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <GrPlan 
        style={{ cursor: 'pointer', fontSize: '20px', color: '#007bff' }} 
        onClick={handleClick}  // Trigger handleClick on click
      />
      <span>{params.value}</span>
    </div>
    );
  };

  // Column definitions for the main AG Grid
  const columnDefs = [
    { headerName: "Plan History", field: "planHistory", cellRenderer: renderPlanHistoryViewIcon },
    { headerName: "Drop Details", field: "dropDetails", cellRenderer: renderDropDetailsViewIcon },
    { headerName: "Generate Plan", field: "generatePlan", cellRenderer: renderGeneratePlanIcon },  
    { headerName: "Order ID", field: "orderId", editable: true },
    { headerName: "No of Runs", field: "noOfRuns", editable: true },
    { headerName: "Created On", field: "createdOn", editable: true },
    { headerName: "Plan Run By", field: "planRunBy", editable: true },
  ];

  // Row data for the main grid
  const rowData = [
    {
      planHistory: "View",
      dropDetails: "view",
      generatePlan: "Run New",
      orderId: "ORD123456",
      noOfRuns: 3,
      createdOn: "2024-10-01",
      planRunBy: "User A",
    },
    {
      planHistory: "View",
      dropDetails: "view",
      generatePlan: "Run New",
      orderId: "ORD123457",
      noOfRuns: 2,
      createdOn: "2024-10-02",
      planRunBy: "User B",
    },
    // More row data as needed
  ];

 

  // Column definitions for the Drop Details off-canvas grid
  const offCanvasColumnDefs = [
    { headerName: "Pickup Location (source)", field: "pickupLocation" },
    { headerName: "Drop Location code(Destination)", field: "dropLocation" },
    { headerName: "Drop Location Name(Destination)", field: "dropLocationName" },
    { headerName: "Drop Location City", field: "dropLocationCity" },
    { headerName: "Order Name", field: "orderName" },
    { headerName: "Invoicing Date", field: "invoicingDate" },
    { headerName: "Quantity ", field: "quantity" },
    { headerName: "Demand Volume(M3) ", field: "demandVolume" },
    { headerName: "Weights(kgs) ", field: "weights" },
    { headerName: "Delivery Date ", field: "deliveryDate" },
  ];

  // Row data for the Drop Details off-canvas grid
  const offCanvasRowData = [
    {
      pickupLocation: "Location A",
      dropLocation: "Location B",
      dropLocationName: "Drop B",
      dropLocationCity: "City B",
      orderName: "Order 1",
      invoicingDate: "04-11-2024",
      quantity:"13",
      weights: "4993.8",
      demandVolume: "5.2348",
      deliveryDate: "04-11-2024 ",
    },
    {
      pickupLocation: "Location C",
      dropLocation: "Location D",
      dropLocationName: "Drop D",
      dropLocationCity: "City D",
      orderName: "Order 2",
    },
    // More row data as needed
  ];

  // Column definitions for the Plan History details grid
  const planHistoryColumnDefs = [
    { headerName: "View Details", field: "viewDetails", cellRenderer: (params) => <FaEye style={{ cursor: 'pointer' }} /> },
    { headerName: "Plan ID", field: "planId" },
    { headerName: "Generated On", field: "generatedOn", cellRenderer: (params) => <GrPlan style={{ cursor: 'pointer'}} /> },
    { headerName: "Status", field: "status" },
    { headerName: "Optimization Type", field: "optimizationType" },
    { headerName: "Plan Run By", field: "planRunBy" },
  ];

  // Row data for the Plan History details grid
  const planHistoryRowData = [
    {
      viewDetails: "View",
      planId: "PH123",
      generatedOn: "2024-10-01",
      status: "Completed",
      optimizationType: "Auto",
      planRunBy: "User A",
    },
    {
      viewDetails: "View",
      planId: "PH124",
      generatedOn: "2024-10-02",
      status: "In Progress",
      optimizationType: "Manual",
      planRunBy: "User B",
    },
    // More row data as needed
  ];

  // Handle clicking the Plan History view icon (toggle grid visibility)
  const handlePlanHistoryView = (params) => {
    // Toggle the visibility of the Plan History details grid
    setShowPlanHistoryDetails((prevState) => !prevState);
  };

  // Handle opening the off-canvas for Drop Details
  const handleDropDetailsView = () => {
    setOffCanvasVisible(true); // Show the off-canvas when Drop Details view icon is clicked
  };

  // Close the off-canvas when the close button is clicked
  const handleCloseOffCanvas = () => {
    setOffCanvasVisible(false); // Hide the off-canvas
  };
  

  return (
    <Container>
      <h2>Dispatch Plan</h2>
      <h4>Summary Dashboard</h4>
      <p>Generated On</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input type="date" />
        <button>Get Data</button>
      </div>
      <div className="ag-theme-alpine" style={{ height: '400px', width: '1500px', marginTop: '20px' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={{ resizable: true }}
        />
      </div>

      {/* Off-canvas for displaying the Drop Details grid */}
      {offCanvasVisible && (
        <OffCanvas>
          <button onClick={handleCloseOffCanvas}><IoMdClose /></button>
          <h4>Drop Details</h4>
          <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
            <AgGridReact
              columnDefs={offCanvasColumnDefs}
              rowData={offCanvasRowData}
              defaultColDef={{ resizable: true }}
            />
          </div>
        </OffCanvas>
      )}

      {/* Display Plan History details in another section if needed */}
      {showPlanHistoryDetails && (
        <div style={{ marginTop: '20px' }}>
          <h3>Plan History Details</h3>
          <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
            <AgGridReact
              columnDefs={planHistoryColumnDefs}
              rowData={planHistoryRowData}
              defaultColDef={{ resizable: true }}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

// Styled component for Dispatch Plan
const Container = styled.div`
  padding: 40px;
  max-width: 2000px;
  margin: 0 auto;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const OffCanvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 800px;
  height: 100%;
  background: #fff;
  border-right: 2px solid #ccc;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 1000;
  transition: transform 0.3s ease;
  transform: translateX(0);
  & > button {
    margin-bottom: 20px;
  }
`;

export default DispatchPlan;
