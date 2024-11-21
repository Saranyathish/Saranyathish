import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';  // Import Home component
import GlobalStyles from './Components/GlobalStyle';
import styled from 'styled-components';
import OrderForm from './Components/OrderForm';
import Navbar from './Components/NavBar';
import CreatePage from './Components/CreatePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import DispatchPlan from './Components/DispatchPlan';


function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
       <Navbar />
        <Content>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />  {/* Home route */}
            <Route path="/" element={<Login />} /> {/* Default to Login */}
            <Route path="/order" element={<OrderForm />} /> {/* Order Form */}
            <Route path="/dispatch" element={<DispatchPlan />} /> {/* Order Form */}
            <Route path="/create" element={<CreatePage />} /> {/* Create Page */}
          </Routes>
        </Content>
      </Router>
    </>
  );
}

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export default App;
