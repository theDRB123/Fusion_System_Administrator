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
import { Icon3dCubeSphere } from '@tabler/icons-react';
import { StatsGrid } from '../../components/StatsGrid/StatsGrid';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { users } from '../../data/users';
import { announcements } from '../../data/announcements';

import { createUser } from '../../api/Users';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await createUser(formData);
            console.log('User added successfully!');
            close();
            setFormData({
                name: '',
                rollNo: '',
                batch: '',
                branch: '',
                password: '',
                role: 'Student',
            });
        } catch (error) {
            alert('Failed to create user. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    const openConfirmationDialog = () => {
        open();
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
        <Box sx={{ background: theme.colors.gray[0], minHeight: '100vh', padding: '2rem' }}>
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


            <StatsGrid data={archiveAnnouncementStats} /> 

            <Divider
                my="xs"
                // variant="dashed"
                labelPosition="center"
                label={
                    <>
                        <Icon3dCubeSphere size={12} />
                    </>
                }
            />


            <Container size="lg" px="lg">
                <Flex direction={{ base: 'column', md: 'row' }}>
                    {/* Form Section */}
                    <Box w="50%">
                        <form>
                            <Stack>
                                <Input
                                    placeholder="Enter user name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    label="Name"
                                />
                                <Input
                                    placeholder="Enter roll number"
                                    name="rollNo"
                                    value={formData.rollNo}
                                    onChange={handleChange}
                                    label="Roll Number"
                                />
                                <Input
                                    placeholder="Enter batch year (e.g., 2020)"
                                    name="batch"
                                    value={formData.batch}
                                    onChange={handleChange}
                                    label="Batch"
                                />
                                <Input
                                    placeholder="Enter branch (e.g., CSE)"
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleChange}
                                    label="Branch"
                                />
                                <Input
                                    placeholder="Enter password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    label="Password"
                                />
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

                    {/* Charts Section */}
                    <Box w="50%">
                        {/* Bar Chart */}
                        <Box mb="lg">
                            <Text align="center" weight={500} mb="md">Number of Users by Year of Creation</Text>
                            <ResponsiveContainer width="100%" height={chartHeight}>
                                <BarChart data={yearData}>
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill={theme.colors.blue[6]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>

                        {/* Pie Chart */}
                        <Box>
                            <Text align="center" weight={500} mb="md">User Distribution by Role</Text>
                            <ResponsiveContainer width="100%" height={chartHeight}>
                                <PieChart>
                                    <Pie
                                        data={roleData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {roleData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
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
