import React , {useState} from "react";
import { TextInput, Button, Paper, Container, Title } from "@mantine/core";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginPage = ()=>{
    const[username, setUsername]=useState("");
    const[password, setPassword]=useState("");
    const {login}= useAuth();
    const navigate = useNavigate();

    const handleLogin = async(e)=>{
        e.preventDefault();
        try{
          const response = await axios.post("http://127.0.0.1:8000/api/login/", {
            username, 
            password,
          });

          const token = response.data.token;
          login(token);
          navigate("/");
        }
        catch(error){
          console.error("Login error: ", error.response?.data || error.message);
          alert("Invalid credentials or login failed. Please try again");
        }
    };

    return(
        <Container size={420} my={40}>
        <Title align="center">Welcome back!</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleLogin}>
            <TextInput
              label="Username"
              placeholder="Your username"
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
              required
            />
            <TextInput
              label="Password"
              placeholder="Your password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              required
              mt="md"
            />
            <Button type="submit" fullWidth mt="xl">
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    );
};

export default LoginPage;