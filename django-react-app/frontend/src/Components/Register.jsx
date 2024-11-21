import React from 'react';
import styled from 'styled-components';

const Register = () => {
  return (
    <Container>
      <h2>Register</h2>
      <Form>
        <Label>Name:</Label>
        <Input type="text" placeholder="Enter your name" />
        
        <Label>Email:</Label>
        <Input type="email" placeholder="Enter your email" />
        
        <Label>Password:</Label>
        <Input type="password" placeholder="Enter your password" />
        
        <Button>Register</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Label = styled.label`
  margin: 10px 0 5px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export default Register;
