// Layout.js
import React from 'react';
import styled from 'styled-components';
import Home from './Home'; // Import your sidebar (Home component)

const Layout = ({ children }) => {
  return (
    <Container>
      <Sidebar>
        <Home /> {/* Render the sidebar */}
      </Sidebar>
      <MainContent>{children}</MainContent>
    </Container>
  );
};

// Styled components for Layout
const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f0f2f5;
  margin-top: 180px;
  margin-right: 1000px;
`;

const Sidebar = styled.aside`
  width: 220px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-right: 2px solid #1a252f;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default Layout;
