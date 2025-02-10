import React from "react";
import { TextInput, Button, Paper, Container, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../../services/authServices.jsx";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "@mantine/form";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 6 ? null : "Password must be at least 6 characters long"),
    },
  });

  const onLogin = async (values) => {
    try {
      const user = await handleLogin(values.email, values.password);
      console.log("Logged in user:", user);
      login();
      navigate("/");
    } catch (error) {
      console.error("Login error: ", error.message);
      alert("Invalid credentials or login failed. Please try again.");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome back!</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(onLogin)}>
          <TextInput
            label="Email"
            placeholder="Your Email"
            {...form.getInputProps("email")}
            required
          />
          <TextInput
            label="Password"
            placeholder="Your password"
            type="password"
            {...form.getInputProps("password")}
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
