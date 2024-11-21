import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBox, FaTruck, FaTools, FaBars, FaSignOutAlt } from "react-icons/fa"; // Importing icons for navbar and sidebar

const Home = () => {
  const [isPlanningOpen, setIsPlanningOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar

  const togglePlanningTools = () => {
    setIsPlanningOpen(!isPlanningOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility on small screens
  };

  return (
    <Container>
      {/* Navbar */}
     

      <Sidebar isOpen={isSidebarOpen}>
        <SidebarHeader>Optirun Dispatch Planning</SidebarHeader>
        <SidebarItem onClick={togglePlanningTools}>
          <FaTools style={{ marginRight: "10px" }} />
          Planning Tools
        </SidebarItem>
        {isPlanningOpen && (
          <SubMenu>
            <SidebarLink to="/order">
              <FaBox style={{ marginRight: "10px" }} />
              Order
            </SidebarLink>
            <SidebarLink to="/dispatch-plan">
              <FaTruck style={{ marginRight: "10px" }} />
              Dispatch Plan
            </SidebarLink>
          </SubMenu>
        )}
      </Sidebar>

      <HamburgerIcon onClick={toggleSidebar}>
        <FaBars />
      </HamburgerIcon>
    </Container>
  );
};

// Styled components for Home layout
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f0f2f5;
  margin-top: 0; /* Adjusted margin-top */
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  z-index: 9999;
`;

const Logo = styled.h1`
  font-size: 24px;
  color: white;
  margin: 0;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
`;

const NavItem = styled.div`
  color: white;
  font-size: 16px;
  margin-left: 20px;
  cursor: pointer;

  &:hover {
    color: #ecf0f1;
  }
`;

const Sidebar = styled.aside`
  width: 220px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-right: 2px solid #1a252f;
  position: fixed;
  left: 0;
  top: 68px; /* Adjusted top to account for navbar */
  bottom: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(-100%)")};
  
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(-100%)")};
  }
`;

const SidebarHeader = styled.h2`
  color: #ecf0f1;
  font-size: 20px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 500;
`;

const SidebarItem = styled.div`
  padding: 15px 20px;
  cursor: pointer;
  color: #ecf0f1;
  font-size: 16px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #34495e;
  }
`;

const SubMenu = styled.div`
  padding-left: 20px;
  margin-top: 10px;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px 0;
  text-decoration: none;
  color: #bdc3c7;
  font-size: 14px;

  &:hover {
    color: #ecf0f1;
    text-decoration: none;
  }
`;

// Hamburger Icon for mobile view
const HamburgerIcon = styled.div`
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  font-size: 24px;
  color: #2c3e50;
  cursor: pointer;
  z-index: 999;

  @media (max-width: 768px) {
    display: block;
  }
`;

export default Home;
