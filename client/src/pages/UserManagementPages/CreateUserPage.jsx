import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    Select,
    Text,
    Stack,
    useMantineTheme,
    SimpleGrid,
    Modal,
    Group,
    Container,
    Title,
    Flex,
    TextInput,
    Tabs,
    Space,
    Divider,
    Checkbox,
    Center
} from '@mantine/core';


import { useDisclosure } from '@mantine/hooks';
import { FaCube } from 'react-icons/fa';
import { StatsGrid } from '../../components/StatsGrid/StatsGrid';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { users } from '../../data/users';
import { announcements } from '../../data/announcements';

import { createUser } from '../../api/Users';
import { showNotification } from '@mantine/notifications';

const CreateUserPage = () => {
    const stats = [
        { title: 'Total users', icon: 'speakerPhone', value: '5,173', diff: 34, time: "In last year" },
        { title: 'Created user', icon: 'speakerPhone', value: '573', diff: -30, time: "In last year" },
        { title: 'Total Students', icon: 'speakerPhone', value: '2,543', diff: 18, time: "In last year" },
    ];
    const [archiveAnnouncementStats, setArchiveAnnouncementStats] = useState(stats)
    const theme = useMantineTheme();
    const [formData, setFormData] = useState({
        name: '',
        rollNo: '',
        batch: '',
        branch: '',
        password: '',
        role: 'Student',
    });

    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrorMessage('');
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await createUser(formData);
            console.log('User added successfully!');
            close();
            showNotification({
                title: 'User Created',
                message: 'User has been created successfully.',
                color: 'teal',
            });
            setFormData({
                name: '',
                rollNo: '',
                password: '',
                role: 'Student',
            });
        } catch (error) {
            showNotification({
                title: 'Error',
                message: 'An error occurred while creating user.',
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    const openConfirmationDialog = () => {
        if (formData.name.trim() === '') {
            setErrorMessage('Name cannot be empty.');
        }
        else if (formData.rollNo.trim() === '') {
            setErrorMessage('Roll number cannot be empty.');
        }
        else open();
    };

    const getUsersByYear = () => {
        const yearCount = {};
        users.forEach((user) => {
            const year = new Date(user.createdAt).getFullYear();
            yearCount[year] = (yearCount[year] || 0) + 1;
        });
        return Object.keys(yearCount).map((year) => ({
            year,
            count: yearCount[year],
        }));
    };

    const yearData = getUsersByYear();

    const getUsersByRole = () => {
        const roleCount = { Student: 0, Faculty: 0 };
        users.forEach((user) => {
            roleCount[user.role] = (roleCount[user.role] || 0) + 1;
        });
        return [
            { name: 'Student', value: roleCount.Student },
            { name: 'Faculty', value: roleCount.Faculty },
        ];
    };

    const roleData = getUsersByRole();
    const COLORS = ['#4A90E2', '#005B96'];
    const chartHeight = 300;

    const totalUsers = users.length;
    const currentYear = new Date().getFullYear();
    const usersCreatedThisYear = users.filter(user => {
        const createdYear = new Date(user.createdAt).getFullYear();
        return createdYear === currentYear;
    }).length;

    return (
        <Box sx={{ background: theme.colors.gray[0], minHeight: '100vh', padding: '2rem' }} mt={'20px'}>
            {/* Top Section */}
            {/* <Flex position="apart" mb="xl" justify='space-between'>
                <Box sx={{ background: theme.colors.blue[6], padding: '1rem', borderRadius: theme.radius.md }}>
                    <Title order={2} align="left" sx={{ color: 'white' }}>Create User</Title>
                </Box>


                
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <SimpleGrid cols={2} spacing="md">
                        <Box>
                            <Text weight={500}>Total Users</Text>
                            <Text>{totalUsers}</Text>
                        </Box>
                        <Box>
                            <Text weight={500}>Users Created This Year</Text>
                            <Text>{usersCreatedThisYear}</Text>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Flex> */}
            <Flex
                direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
                justify={{ sm: 'center' }}
            >
                <Button
                    variant="gradient"
                    size="xl"
                    radius="xs"
                    gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                    sx={{
                        display: 'block',
                        width: { base: '100%', sm: 'auto' },
                        whiteSpace: 'normal',
                        padding: '1rem',
                        textAlign: 'center',
                    }}
                >
                    <Title
                        order={1}
                        sx={{
                            fontSize: { base: 'lg', sm: 'xl' },
                            lineHeight: 1.2,
                            wordBreak: 'break-word',
                        }}
                    >
                        Create User
                    </Title>
                </Button>
            </Flex>


            <Divider
                my="xs"
                // variant="dashed"
                labelPosition="center"
                label={
                    <>
                        <FaCube size={12} />
                    </>
                }
            />


            <Container size="lg" px="lg">
                <Flex justify={'center'} direction={{ base: 'column', md: 'row' }}>
                    {/* Form Section */}
                    <Box w="50%" mt={'20px'}>
                        <form>
                            <Stack>
                                <Input
                                    placeholder="Enter full name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    label="Name"
                                    required
                                />
                                <Input
                                    placeholder="Enter roll number"
                                    name="rollNo"
                                    value={formData.rollNo}
                                    onChange={handleChange}
                                    label="Roll Number"
                                    required
                                />
                                {errorMessage && (
                                    <Text color="red" style={{ fontSize: '14px' }}>
                                        {errorMessage}
                                    </Text>
                                )}
                                <Select
                                    label="Role"
                                    name="role"
                                    value={formData.role}
                                    onChange={(value) => setFormData({ ...formData, role: value })}
                                    data={[
                                        { value: 'Student', label: 'Student' },
                                        { value: 'Faculty', label: 'Faculty' },
                                    ]}
                                />
                                <Button onClick={openConfirmationDialog}>Create User</Button>
                            </Stack>
                        </form>
                    </Box>
                </Flex>
            </Container>

            {/* Confirmation Modal */}
            <Modal
                opened={opened}
                onClose={close}
                title="Confirm User Creation"
            >
                <Text>Are you sure you want to create this user? This action cannot be undone.</Text>
                <Group position="right" mt="md">
                    <Button variant="outline" onClick={close}>Cancel</Button>
                    <Button color="red" onClick={handleSubmit}>Confirm</Button>
                </Group>
            </Modal>
        </Box>
    );
};

export default CreateUserPage;
