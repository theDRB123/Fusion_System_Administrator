import React, { useState, useEffect } from 'react';
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
} from '@mantine/core';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { notifications, showNotification } from '@mantine/notifications';
import { DateInput } from '@mantine/dates';
import { useMediaQuery } from "@mantine/hooks";

const StaffCreationPage = () => {
    const xIcon = <FaTimes style={{ width: rem(20), height: rem(20) }} />;
    const checkIcon = <FaCheck style={{ width: rem(20), height: rem(20) }} />;

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        department: '',
        title: '',
        designation: '',
        gender: '',
        dob: null,
        phone: '',
    });

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const totalFields = Object.keys(formValues).length;
        const filledFields = Object.values(formValues).filter((value) => value).length;
        setProgress((filledFields / totalFields) * 100);
    }, [formValues]);

    const handleChange = (field, value) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        console.log('Form Submitted', formValues);
        showNotification({
            icon: checkIcon,
            title: "Success",
            position: "top-center",
            withCloseButton: true,
            autoClose: 5000,
            message: "Staff Member Created Successfully.",
            color: "green",
        });

        showNotification({
            title: 'Error',
            icon: xIcon,
            position: "top-center",
            withCloseButton: true,
            message: 'An error occurred.',
            color: 'red',
        });
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleSubmit();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [formValues]);

    const matches = useMediaQuery('(min-width: 768px)');

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
                            Add Staff
                        </Title>
                    </Button>
                </Flex>

                <Divider my="sm" />

                {/* Progress Bar */}
                <Progress value={progress} color="blue" mb="md" />

                <Grid gutter="md">
                    {/* First Name */}
                    <Grid.Col span={6}>
                        <TextInput
                            label="First Name"
                            placeholder="Enter first name"
                            value={formValues.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            required
                        />
                    </Grid.Col>

                    {/* Last Name */}
                    <Grid.Col span={6}>
                        <TextInput
                            label="Last Name"
                            placeholder="Enter last name"
                            value={formValues.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            required
                        />
                    </Grid.Col>

                    {/* Department */}
                    <Grid.Col span={12}>
                        <Select
                            label="Department"
                            placeholder="Enter department"
                            data={['CSE', 'ECE', 'ME', 'SM']}
                            value={formValues.department}
                            onChange={(value) => handleChange('department', value)}
                            required
                        />
                    </Grid.Col>

                    {/* Title */}
                    <Grid.Col span={6}>
                        <Select
                            label="Title"
                            placeholder="Select title"
                            data={['Dr.', 'Mr.', 'Mrs.', 'Ms.']}
                            value={formValues.title}
                            onChange={(value) => handleChange('title', value)}
                            required
                        />
                    </Grid.Col>

                    {/* Designation */}
                    <Grid.Col span={6}>
                        <Select
                            label="Designation"
                            placeholder="Select designation"
                            data={['Upper Division Clerk', 'Compounder', 'Jr. Assistant', 'Sr. Assistant', 'Jr. Technician', 'Sr. Technician', 'Driver', 'Junior Superintendent', 'Executive Engineer']}
                            value={formValues.designation}
                            onChange={(value) => handleChange('designation', value)}
                            required
                        />
                    </Grid.Col>

                    {/* Gender */}
                    <Grid.Col span={12}>
                        <Radio.Group
                            label="Gender"
                            value={formValues.gender}
                            onChange={(value) => handleChange('gender', value)}
                            required
                            styles={{
                                label: { marginRight: '1rem' },
                            }}
                        >
                            <Group spacing="sm" position="apart" mt="xs">
                                <Radio value="male" label="Male" />
                                <Radio value="female" label="Female" />
                                <Radio value="other" label="Other" />
                            </Group>
                        </Radio.Group>
                    </Grid.Col>

                    {/* Date of Birth */}
                    <Grid.Col span={6}>
                        <DateInput
                            value={formValues.dob}
                            onChange={(value) => handleChange('dob', value)}
                            label="Date of Birth"
                            placeholder="Pick a date"
                            required
                        />
                    </Grid.Col>

                    {/* Phone Number */}
                    <Grid.Col span={6}>
                        <NumberInput
                            label="Phone Number"
                            placeholder="Enter phone number"
                            value={formValues.phone}
                            onChange={(value) => handleChange('phone', value)}
                            hideControls
                            required
                        />
                    </Grid.Col>
                </Grid>

                {/* Create Button */}
                <Flex
                    gap="md"
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="wrap"
                    mt="xl"
                >
                    <Button onClick={handleSubmit} color="blue" size="md">
                        Add Staff
                    </Button>
                </Flex>
            </Paper>
        </Box>
    );
};

export default StaffCreationPage;
