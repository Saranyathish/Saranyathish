import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CiLogout } from "react-icons/ci";


// Import the logo image from the assets folder
import logo from '../Assets/logo.png'; // Adjust the path as necessary based on your folder structure

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session or token if needed
    navigate('/login'); // Navigate to login page
  };

  return (
    <Nav>
      <LogoContainer>
        <LogoImage src={logo} alt="Company Logo" /> {/* Display the logo image */}
        <LogoText>Dispatch Planning</LogoText> {/* Optionally, you can include a company name */}
      </LogoContainer>
      <LogoutIcon onClick={handleLogout}><CiLogout />Logout</LogoutIcon> {/* Replace with an icon if desired */}
    </Nav>
  );
};

// Styled components for Navbar
const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ccc;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;


`;

const LogoImage = styled.img`
  height: 40px; /* Adjust the height as needed */
  margin-right: 10px; /* Space between logo and text */

`;

const LogoText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff; // Customize as needed
`;

const LogoutIcon = styled.div`
  cursor: pointer;
  color: #007bff;
  margin-left: 20px;
  font-size: 2rem;

`;

export default Navbar;
