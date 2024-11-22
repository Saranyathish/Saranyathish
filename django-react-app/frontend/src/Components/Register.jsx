import React,{useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const a = ()=>{
    navigate('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/user/register/", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setMessage("User registered successfully! You can now log in.");
        navigate('/login');
      } else {
        setMessage("An unexpected response was received.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setMessage("Registration failed. Please try again.");
    }
  };
  return (
    <Container>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <Label>Name:</Label>
        <Input type="text" placeholder="Enter your name" 
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        
        <Label>Email:</Label>
        <Input type="email" placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <Label>Password:</Label>
        <Input type="password" placeholder="Enter your password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Button>Register</Button><br></br>
        <Button onClick={a}>Login</Button>
      </Form>
      {message && <p>{message}</p>}
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

export default Register;