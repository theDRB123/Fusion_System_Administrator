import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    TextInput,
    Text,
    Stack,
    Flex,
    Grid,
    MultiSelect,
    Modal,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { roles } from '../../data/roles';
import { privileges } from '../../data/privileges'; // Assuming you have a privileges data file

const ManageRoleAccessPage = () => {
    const [roleName, setRoleName] = useState('');
    const [addPrivileges, setAddPrivileges] = useState([]);
    const [removePrivileges, setRemovePrivileges] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'roleName') {
            setRoleName(value);
        }
    };

    const handleSubmit = () => {
        setIsOpen(false);
        console.log('Role Access Updated:', {
            roleName,
            addPrivileges,
            removePrivileges,
        });

        notifications.show({
            title: 'Role Access Updated',
            message: 'The role access has been successfully updated.',
            color: 'green',
        });

        setRoleName('');
        setAddPrivileges([]);
        setRemovePrivileges([]);
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

    const getUserCountsByRole = () => {
        const counts = {};
        roles.forEach((role) => {
            counts[role.name] = (counts[role.name] || 0) + 1;
        });

        return Object.entries(counts).map(([role, count]) => ({
            role,
            count,
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

    const privilegeOptions = privileges.map((privilege) => ({
        value: privilege.name,
        label: privilege.name,
    }));

    return (
        <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '1rem' }}>
            <Flex justify="space-between" align="center" mb="1rem" direction={['column', 'row']}>
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
                        Manage Role Access
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
            </Flex>

            <Flex direction={{ base: 'column', lg: 'row' }}>
                {/* Form Section */}
                <Box w="100%" md:w="50%">
                    <Stack spacing="1rem">
                        {/* Role Name Input */}
                        <TextInput
                            label="Role Name"
                            name="roleName"
                            placeholder="Enter role name"
                            value={roleName}
                            onChange={handleChange}
                            required
                        />

                        {/* Add Privileges MultiSelect */}
                        <MultiSelect
                            label="Add Privileges"
                            placeholder="Select privileges to add"
                            data={privilegeOptions}
                            value={addPrivileges}
                            onChange={setAddPrivileges}
                            searchable
                            clearable
                        />

                        {/* Remove Privileges MultiSelect */}
                        <MultiSelect
                            label="Remove Privileges"
                            placeholder="Select privileges to remove"
                            data={privilegeOptions}
                            value={removePrivileges}
                            onChange={setRemovePrivileges}
                            searchable
                            clearable
                        />

                        <Button color="blue" onClick={openConfirmationDialog} fullWidth>
                            Update Role Access
                        </Button>
                    </Stack>
                </Box>

                {/* Graphs Section */}
                <Box w="100%" md:w="50%">
                    {/* Bar Chart Section */}
                    <Box>
                        <Text fontSize="xl" fontWeight="bold" mb="1rem">
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
                        <Text fontSize="xl" fontWeight="bold" mb="1rem">
                            Number of Roles
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
            <Modal opened={isOpen} onClose={() => setIsOpen(false)} title="Confirm Submission">
                <Text>Are you sure you want to update the role access?</Text>
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

export default ManageRoleAccessPage;
