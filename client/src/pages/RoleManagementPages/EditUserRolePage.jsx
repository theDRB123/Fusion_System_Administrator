import React, { useState, useRef } from 'react';
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
import { StatsGrid } from '../../components/StatsGrid/StatsGrid';
import { Icon3dCubeSphere } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { roles } from '../../data/roles';
import { users } from '../../data/users';

const EditUserRolePage = () => {
    const stats = [
        { title: 'Total Roles', icon: 'speakerPhone', value: '5,173', diff: 34, time: "In last year" },
        { title: 'Edit User Role', icon: 'speakerPhone', value: '573', diff: -30, time: "In last year" },
        { title: 'Total User', icon: 'speakerPhone', value: '2,543', diff: 18, time: "In last year" },
    ];
    const [archiveAnnouncementStats, setArchiveAnnouncementStats] = useState(stats)
    const [userName, setUserName] = useState('');
    const [userRollNumber, setUserRollNumber] = useState('');
    const [currentRole, setCurrentRole] = useState('');
    const [newRole, setNewRole] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'userName':
                setUserName(value);
                break;
            case 'userRollNumber':
                setUserRollNumber(value);
                break;
            case 'currentRole':
                setCurrentRole(value);
                break;
            case 'newRole':
                setNewRole(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = () => {
        setIsOpen(false);
        console.log('User Details Submitted:', {
            userName,
            userRollNumber,
            currentRole,
            newRole,
        });

        notifications.show({
            title: 'User Information Submitted',
            message: 'The user details have been successfully submitted.',
            color: 'green',
        });

        setUserName('');
        setUserRollNumber('');
        setCurrentRole('');
        setNewRole('');
    };

    const openConfirmationDialog = () => {
        setIsOpen(true);
    };

    const getUserCountsByRole = () => {
        const counts = {};
        users.forEach((user) => {
            counts[user.role] = (counts[user.role] || 0) + 1;
        });

        return Object.entries(counts).map(([role, count]) => ({
            role,
            count,
        }));
    };

    const getPrivilegesCount = () => {
        return roles.map((role) => ({
            name: role.name,
            privilegeCount: role.privileges.length,
        }));
    };

    const privilegeData = getPrivilegesCount();
    const userRoleData = getUserCountsByRole();
    const totalRoles = roles.length;
    const currentYear = new Date().getFullYear();
    const rolesCreatedThisYear = roles.filter(
        (role) => new Date(role.createdAt).getFullYear() === currentYear
    ).length;

    const colors = ['#4A90E2', '#005B96', '#0069B9', '#1E90FF', '#87CEFA', '#4682B4', '#4169E1'];

    const roleOptions = roles.map((role) => ({
        value: role.name,
        label: role.name,
    }));

    return (
        <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '1rem' }}>
            {/* <Flex justify="space-between" align="center" mb="1rem" direction={['column', 'row']}>
                <Box
                    sx={{
                        padding: '1rem',
                        backgroundColor: '#228Be6',
                        borderRadius: '8px',
                        boxShadow: 'md',
                        marginBottom: ['1rem', '0'],
                    }}
                >
                    <Text
                        sx={{
                            fontSize: ['1.5rem', '2rem', '3rem'],
                            fontWeight: 'bold',
                            color: 'white',
                            textAlign: ['center', 'left'],
                        }}
                    >
                        Edit User Role
                    </Text>
                </Box>

                <Grid columns={2} gutter="1rem" textAlign="center">
                    <Box>
                        <Text fontSize="lg" fontWeight="bold">
                            Total Roles
                        </Text>
                        <Text fontSize="xl">{totalRoles}</Text>
                    </Box>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold">
                            Roles Created This Year
                        </Text>
                        <Text fontSize="xl">{rolesCreatedThisYear}</Text>
                    </Box>
                </Grid>
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
                        Edit User Role
                    </Title>
                </Button>
            </Flex>

            <StatsGrid data={archiveAnnouncementStats} /> 

            <Divider
                my="xs"
                labelPosition="center"
                label={<Icon3dCubeSphere size={12} />}
            />


            <Flex direction={{ base: 'column', lg: 'row' }} >
                {/* Form Section */}
                <Box
                    w="100%" md:w="50%" pl="lg"
                >
                    <Stack spacing="1rem">
                        {/* User Name Input */}
                        <TextInput
                            label="User Name"
                            name="userName"
                            placeholder="Enter user name"
                            value={userName}
                            onChange={handleChange}
                            required
                        />

                        {/* User Roll Number Input */}
                        <TextInput
                            label="User Roll Number"
                            name="userRollNumber"
                            placeholder="Enter user roll number"
                            value={userRollNumber}
                            onChange={handleChange}
                            required
                        />

                        {/* Current Role Dropdown */}
                        <Select
                            label="Current Role"
                            name="currentRole"
                            placeholder="Select current role"
                            data={roleOptions}
                            value={roleOptions.find((option) => option.value === currentRole)}
                            onChange={(value) => setCurrentRole(value)}
                            required
                        />

                        {/* New Role Dropdown */}
                        <Select
                            label="New Role"
                            name="newRole"
                            placeholder="Select new role"
                            data={roleOptions}
                            value={roleOptions.find((option) => option.value === newRole)}
                            onChange={(value) => setNewRole(value)}
                            required
                        />

                        <Button
                            color="blue"
                            onClick={openConfirmationDialog}
                            fullWidth
                        >
                            Edit User Role
                        </Button>
                    </Stack>
                </Box>

                {/* Graphs Section */}
                <Box
                    w="100%" md:w="50%"
                >
                    {/* Bar Chart Section */}
                    <Box>
                        <Text fontSize="xl" fontWeight="bold" mb="1rem" align="center">
                            Number of Privileges by Role
                        </Text>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={privilegeData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="privilegeCount" fill="#4A90E2" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>

                    {/* Pie Chart Section */}
                    <Box>
                        <Text fontSize="xl" fontWeight="bold" mb="1rem" align="center">
                            Number of Users by Role
                        </Text>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={userRoleData}
                                    dataKey="count"
                                    nameKey="role"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#1E90FF"
                                    label
                                >
                                    {userRoleData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>
            </Flex>

            {/* Confirmation Modal */}
            <Modal
                opened={isOpen}
                onClose={() => setIsOpen(false)}
                title="Confirm Submission"
            >
                <Text>Are you sure you want to update the user role?</Text>
                <Flex justify="flex-end" gap="1rem" mt="1rem">
                    <Button variant="default" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button color="blue" onClick={handleSubmit}>
                        Confirm
                    </Button>
                </Flex>
            </Modal>
        </Box>
    );
};

export default EditUserRolePage;
