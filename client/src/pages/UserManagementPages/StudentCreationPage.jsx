import React, { useState, useEffect } from "react";
import {
  TextInput,
  Select,
  Button,
  Grid,
  Group,
  Box,
  NumberInput,
  Radio,
  rem,
  Title,
  Divider,
  Progress,
  Flex,
  Paper,
} from "@mantine/core";
import { FaCheck, FaTimes } from "react-icons/fa";
import { notifications, showNotification } from "@mantine/notifications";
import { DateInput, YearPickerInput } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { createStudent } from "../../api/Users";

const StudentCreationPage = () => {
  const xIcon = <FaTimes style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <FaCheck style={{ width: rem(20), height: rem(20) }} />;

  const [formValues, setFormValues] = useState({
    roll_no: "",
    first_name: "",
    last_name: "",
    sex: "",
    category: "",
    father_name: "",
    mother_name: "",
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalFields = Object.keys(formValues).length;
    const filledFields = Object.values(formValues).filter(
      (value) => value
    ).length;
    setProgress((filledFields / totalFields) * 100);
  }, [formValues]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: field === "hall_no" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", formValues);

    try {
      await createStudent(formValues);
      showNotification({
        icon: checkIcon,
        title: "Success",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        message: "Student Created Successfully.",
        color: "green",
      });
      setFormValues({
        roll_no: "",
        first_name: "",
        last_name: "",
        sex: "",
        category: "",
        father_name: "",
        mother_name: "",
      });
    } catch (err) {
      const errorMessage = err.response
        ? `${JSON.stringify(err.response.data.error) || JSON.stringify(err.response.data.data) || JSON.stringify(err.response.data.message)}`
        : err.request
        ? "No response received from the server"
        : `${err.message}`;

      showNotification({
        title: "Error",
        icon: xIcon,
        position: "top-center",
        withCloseButton: true,
        message: errorMessage,
        color: "red",
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [formValues]);

  const matches = useMediaQuery("(min-width: 768px)");

  return (
    <Box maw={700} mx="auto" p="lg" shadow="sm" withBorder>
      <Paper shadow="xl" radius="lg" p="xl">
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Button
            variant="gradient"
            size="xl"
            radius="xs"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
            w={matches && "500px"}
            style={{
              fontSize: "1.8rem",
              lineHeight: 1.2,
              marginBottom: "1rem",
            }}
          >
            <Title
              order={1}
              align="center"
              style={{
                fontSize: "1.25rem",
                wordBreak: "break-word",
              }}
            >
              Add Student
            </Title>
          </Button>
        </Flex>

        <Divider my="sm" />

        {/* Progress Bar */}
        <Progress value={progress} color="blue" mb="md" />

        <Grid gutter="md">
          {/* Roll No */}
          <Grid.Col span={6}>
            <TextInput
              label="Roll No"
              placeholder="Enter roll number"
              value={formValues.roll_no}
              onChange={(e) => handleChange("roll_no", e.target.value)}
              required
            />
          </Grid.Col>

          {/* First Name */}
          <Grid.Col span={6}>
            <TextInput
              label="First Name"
              placeholder="Enter first name"
              value={formValues.first_name}
              onChange={(e) => handleChange("first_name", e.target.value)}
              required
            />
          </Grid.Col>

          {/* Last Name */}
          <Grid.Col span={6}>
            <TextInput
              label="Last Name"
              placeholder="Enter last name / NA"
              value={formValues.last_name}
              onChange={(e) => handleChange("last_name", e.target.value)}
              required
            />
          </Grid.Col>

          {/* Gender */}
          <Grid.Col span={12}>
            <Radio.Group
              label="Gender"
              value={formValues.sex}
              onChange={(value) => handleChange("sex", value)}
              required
            >
              <Group spacing="sm" position="apart" mt="xs">
                <Radio value="male" label="Male" />
                <Radio value="female" label="Female" />
                <Radio value="other" label="Other" />
              </Group>
            </Radio.Group>
          </Grid.Col>

          {/* Category */}
          <Grid.Col span={12}>
            <Select
              label="Category"
              placeholder="Select category"
              data={["General", "OBC", "SC", "ST"]}
              value={formValues.category}
              onChange={(value) => handleChange("category", value)}
              required
            />
          </Grid.Col>

          {/* Father's Name */}
          <Grid.Col span={6}>
            <TextInput
              label="Father's Name"
              placeholder="Enter father's name"
              value={formValues.father_name}
              onChange={(e) => handleChange("father_name", e.target.value)}
              required
            />
          </Grid.Col>

          {/* Mother's Name */}
          <Grid.Col span={6}>
            <TextInput
              label="Mother's Name"
              placeholder="Enter mother's name"
              value={formValues.mother_name}
              onChange={(e) => handleChange("mother_name", e.target.value)}
              required
            />
          </Grid.Col>
        </Grid>
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
          mt="xl"
        >
          <Button onClick={handleSubmit} color="blue" size="md">
            Add Student
          </Button>
        </Flex>
      </Paper>
    </Box>
  );
};

export default StudentCreationPage;
