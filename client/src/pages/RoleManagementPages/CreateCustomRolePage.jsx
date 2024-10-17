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
import { privileges } from '../../data/privileges';

const CreateCustomRolePage = () => {
    const stats = [
        { title: 'Total users', icon: 'speakerPhone', value: '5,173', diff: 34, time: "In last year" },
        { title: 'Total Roles', icon: 'speakerPhone', value: '573', diff: -30, time: "In last year" },
        { title: 'Created Roles', icon: 'speakerPhone', value: '2,543', diff: 18, time: "In last year" },
    ];
    const [archiveAnnouncementStats, setArchiveAnnouncementStats] = useState(stats)
    const [roleName, setRoleName] = useState('');
    const [selectedPrivileges, setSelectedPrivileges] = useState([]);
    const [description, setDescription] = useState('');
    const [timeOfCreation] = useState(new Date().toISOString().slice(0, 19).replace('T', ' '));
    const [createdBy] = useState('superadmin');
    const [lastUpdated] = useState(new Date().toISOString().slice(0, 19).replace('T', ' '));

    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'roleName':
                setRoleName(value);
                break;
            case 'description':
                setDescription(value);
                break;
            default:
                break;
        }
    };

    const handleAddPrivilegesChange = (selectedOptions) => {
        setSelectedPrivileges(selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    const handleSubmit = () => {
        setIsOpen(false);
        console.log('Custom Role Created:', {
            roleName,
            selectedPrivileges,
            description,
            timeOfCreation,
            createdBy,
            lastUpdated,
        });

        notifications.show({
            title: 'Custom Role Created',
            message: 'The custom role has been successfully created.',
            color: 'green',
        });

        setRoleName('');
        setSelectedPrivileges([]);
        setDescription('');
    };

    const openConfirmationDialog = () => {
        setIsOpen(true);
    };

    const getPrivilegesCount = () => {
        return roles.map((role) => ({
            name: role.name,
            privilegeCount: role.privileges.length,
        }));
    };

    const privilegeData = getPrivilegesCount();

    const getUserCountsByRole = () => {
        const counts = {};
        users.forEach(user => {
            counts[user.role] = (counts[user.role] || 0) + 1;
        });

        return Object.entries(counts).map(([role, count]) => ({
            role,
            count,
        }));
    };

    const userRoleData = getUserCountsByRole();

    const totalRoles = roles.length;
    const currentYear = new Date().getFullYear();
    const rolesCreatedThisYear = roles.filter(role => new Date(role.createdAt).getFullYear() === currentYear).length;

    const colors = ['#4A90E2', '#005B96', '#0069B9', '#1E90FF', '#87CEFA', '#4682B4', '#4169E1'];

    const privilegeOptions = privileges.map(privilege => ({
        value: privilege.name,
        label: privilege.name
    }));

    return (
        <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '1rem' }}>
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
                        Create Custom Role
                    </Title>
                </Button>
            </Flex>

            <StatsGrid data={archiveAnnouncementStats} /> 

            <Divider
                my="xs"
                labelPosition="center"
                label={<Icon3dCubeSphere size={12} />}
            />

            <Flex direction={{ base: 'column', md: 'row' }}>
                {/* Form Section with Left Padding */}
                <Box w="100%" md:w="50%" pl="lg">
                    <Stack spacing="1rem">
                        <TextInput
                            label="Role Name"
                            name="roleName"
                            placeholder="Enter role name"
                            value={roleName}
                            onChange={handleChange}
                            required
                        />

                        <Select
                            label="Select Privileges"
                            name="privileges"
                            placeholder="Select privileges"
                            data={privilegeOptions}
                            value={privilegeOptions.filter(option => selectedPrivileges.includes(option.value))}
                            onChange={handleAddPrivilegesChange}
                            searchable
                            clearable
                            multiple
                        />

                        <TextInput
                            label="Description"
                            name="description"
                            placeholder="Enter role description"
                            value={description}
                            onChange={handleChange}
                            required
                        />

                        <Button color="blue" onClick={openConfirmationDialog} fullWidth>
                            Create Role
                        </Button>
                    </Stack>
                </Box>

                {/* Graphs Section */}
                <Box w="100%" md:w="50%">
                    {/* Bar Chart Section with Centered Title */}
                    <Box>
                        <Text fontSize="xl" fontWeight="bold" mb="1rem" align="center">
                            Number of Privileges by Role
                        </Text>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={privilegeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="privilegeCount" fill="#4A90E2" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>

                    {/* Pie Chart Section with Centered Title */}
                    <Box mt="2rem">
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
                title="Confirm Role Creation"
            >
                <Text>Are you sure you want to create this custom role?</Text>
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

export default CreateCustomRolePage;