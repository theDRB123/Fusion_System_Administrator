import React , {useState} from "react";
import { TextInput, Button, Paper, Container, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../../services/authServices.jsx";
import { useAuth } from "../../context/AuthContext"; 

const LoginPage = ()=>{
    const [email, setEmail] = useState("");
    const[password, setPassword]=useState("");
    const navigate = useNavigate();
    const { login } = useAuth(); 


    const onLogin = async(e)=>{
        e.preventDefault();
        try {
          const user = await handleLogin(email, password);
          console.log("Logged in user:", user);
          login();
          navigate("/"); 
        } 
        catch(error){
          console.error("Login error: ", error.message);
          alert("Invalid credentials or login failed. Please try again");
        }
    };

    return(
        <Container size={420} my={40}>
        <Title align="center">Welcome back!</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={onLogin}>
            <TextInput
              label="Email"
              placeholder="Your Email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
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