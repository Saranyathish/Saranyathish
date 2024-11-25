import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import UploadOffcanvas from './UploadOffcanvas ';
import { FaThumbtack } from 'react-icons/fa';

// PinHeader component to handle the pinning of columns
const PinHeader = (props) => {
  const [isPinned, setIsPinned] = useState(false);

  const handlePinClick = () => {
    const colId = props.column.getColId();
    const newPinnedState = isPinned ? null : 'left'; // Toggle pinned state
    setIsPinned(!isPinned);

    props.columnApi.applyColumnState({
      state: [{ colId, pinned: newPinnedState }],
      defaultState: { pinned: null },
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <span>{props.displayName}</span>
      <FaThumbtack
        style={{ cursor: 'pointer', color: isPinned ? 'green' : 'gray' }}
        onClick={handlePinClick}
      />
    </div>
  );
};

const OrderGrid = () => {
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const columnDefs = [
    {
      headerName: 'Action (Source)',
      field: 'actionSource',
      editable: true,
      sortable: true,
      filter: true,
      headerComponentFramework: PinHeader,
    },
    {
      headerName: 'Pick Up Location (Source)',
      field: 'pickUpLocation',
      editable: true,
      sortable: true,
      filter: true,
      headerComponentFramework: PinHeader,
    },
    {
      headerName: 'Drop Location (Destination)',
      field: 'dropLocation',
      editable: true,
      sortable: true,
      filter: true,
      headerComponentFramework: PinHeader,
    },
    {
      headerName: 'Order Number',
      field: 'orderNumber',
      editable: true,
      sortable: true,
      filter: true,
      headerComponentFramework: PinHeader,
    },
    {
      headerName: 'Invoicing Date (M/D/YYYY)',
      field: 'invoicingDate',
      editable: true,
      sortable: true,
      filter: 'agDateColumnFilter',
      headerComponentFramework: PinHeader,
    },
    {
      headerName: 'Quantity',
      field: 'quantity',
      editable: true,
      sortable: true,
      filter: 'agNumberColumnFilter',
      headerComponentFramework: PinHeader,
    },
    {
      headerName: 'Dealer Available Time (From 00:00)',
      field: 'dealerAvailableTimeFrom',
      editable: true,
      sortable: true,
      filter: true,
      headerComponentFramework: PinHeader,
    },
    {
      headerName: 'Dealer Available Time (To 23:59)',
      field: 'dealerAvailableTimeTo',
      editable: true,
      sortable: true,
      filter: true,
      headerComponentFramework: PinHeader,
    },
    {
      headerName: 'Volume (M3)',
      field: 'volume',
      editable: true,
      sortable: true,
      filter: 'agNumberColumnFilter',
      headerComponentFramework: PinHeader,
    },
    {
      headerName: 'Weight (Kgs)',
      field: 'weight',
      editable: true,
      sortable: true,
      filter: 'agNumberColumnFilter',
      headerComponentFramework: PinHeader,
    },
    {
      headerName: 'Delivery Date (M/D/YYYY)',
      field: 'deliveryDate',
      editable: true,
      sortable: true,
      filter: 'agDateColumnFilter',
      headerComponentFramework: PinHeader,
    },
  ];

  const dataLoading = (data) => {
    const updatedRowData = data.map((d, index) => ({
      actionSource: d.Action || `Action ${index + 1}`,
      pickUpLocation: d.pickuplocation || `Location ${index + 1}`,
      dropLocation: d.DropLocation || `Drop ${index + 1}`,
      orderNumber: d.OrderNumber || `Order ${index + 1}`,
      invoicingDate: d.InvoiceDate || null,
      quantity: d.Quantity || 0,
      dealerAvailableTimeFrom: d.DealerAvailable || '00:00',
      dealerAvailableTimeTo: d.DealerAvailable2 || '23:59',
      volume: d.VolumeM3 || 0,
      weight: d.Weight_kgs || 0,
      deliveryDate: d.DeliveryDate || null,
    }));
    setRowData(updatedRowData);
  };

  useEffect(() => {
    const savedData = localStorage.getItem('orderGridData');
    if (savedData) {
      setRowData(JSON.parse(savedData));
    }
    setIsDisabled(error.length > 0);
  }, [error]);

  useEffect(() => {
    if (rowData.length > 0) {
      localStorage.setItem('orderGridData', JSON.stringify(rowData));
    }
  }, [rowData]);

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
  };

  const handleDataFromChild = (uploadedData, uploadError) => {
    setData(uploadedData);
    setError(uploadError || []);
    if (uploadedData && uploadedData.length > 0) {
      dataLoading(uploadedData);
    }
  };

  return (
    <Container style={{ marginTop: '100px' }}>
      <h3>Run New Plan</h3>
      <ButtonGroup>
        <ActionButton onClick={() => navigate('/create')}>Create</ActionButton>
        <ActionButton onClick={() => setShowOffcanvas(true)}>Upload</ActionButton>
      </ButtonGroup>

      <UploadOffcanvas
        show={showOffcanvas}
        handleClose={() => setShowOffcanvas(false)}
        onSendData={handleDataFromChild}
      />

      <div className="ag-theme-alpine" style={{ height: '410px', width: '1600px', marginTop: '20px' }}>
        <AgGridReact
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
          }}
          pagination={true}
          paginationPageSize={5}
        />
      </div>

      <SubmitButton onClick={() => console.log('Submit clicked!')}>
        Submit & Run Plan
      </SubmitButton>
    </Container>
  );
};

// Styled components
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
