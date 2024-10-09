import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
    VStack,
    useToast,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Flex
} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import Select from 'react-select'; // Import react-select
import { roles } from '../../data/roles'; 
import { privileges } from '../../data/privileges'; 

const ManageRoleAccessPage = () => {
    const [roleName, setRoleName] = useState(''); 
    const [selectedPrivileges, setSelectedPrivileges] = useState([]); 
    const [privilegesToRemove, setPrivilegesToRemove] = useState([]); 
    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef();
    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'roleName':
                setRoleName(value);
                break;
            default:
                break;
        }
    };

    const handleAddPrivilegesChange = (selectedOptions) => {
        // Map selected options to an array of privilege values
        setSelectedPrivileges(selectedOptions.map(option => option.value));
    };

    const handleRemovePrivilegesChange = (selectedOptions) => {
        // Map selected options to an array of privilege values
        setPrivilegesToRemove(selectedOptions.map(option => option.value));
    };

    const handleSubmit = () => {
        setIsOpen(false);

        console.log('Role Access Submitted:', {
            roleName,
            selectedPrivileges,
            privilegesToRemove,
        });

        toast({
            title: 'Role Access Updated',
            description: 'The role access has been successfully updated.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
        });

        setRoleName('');
        setSelectedPrivileges([]);
        setPrivilegesToRemove([]);
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

    // New colors array with blue shades
    const blueShades = ['#4A90E2', '#005B96', '#0069B9', '#1E90FF', '#87CEFA', '#4682B4', '#4169E1'];

    // Map the privileges to be used in the Select component
    const privilegeOptions = privileges.map(privilege => ({
        value: privilege.name,
        label: privilege.name
    }));

    return (
        <Box bg="gray.100" minHeight="100vh" p={5}>
            <Flex justify="space-between" align="center" mb={5} flexDirection={['column', 'row']}>
                <Box
                    p={[2, 4]}
                    bg="#228Be6"
                    borderRadius="lg"
                    shadow="md"
                    mb={[4, 0]}
                >
                    <Text
                        fontSize={['xl', '2xl', '3xl']} 
                        fontWeight="bold"
                        color="white"
                        textAlign={['center', 'left']}
                    >
                        Manage Role Access
                    </Text>
                </Box>
            </Flex>

            <Flex direction={{ base: 'column', lg: 'row' }} gap={10}>
                {/* Form Section */}
                <Box
                    p={5}
                    // bg="white"
                    rounded="md"
                    // shadow="md"
                    width={{ base: '60%', lg: '50%' }}
                    mb={{ base: 5, lg: 0 }}
                >
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Role Name</FormLabel>
                            <Input
                                name="roleName"
                                placeholder="Enter role name"
                                value={roleName}
                                onChange={handleChange}
                                bg="white"
                            />
                        </FormControl>

                        {/* Add Privileges Section with Multi-Select */}
                        <FormControl isRequired>
                            <FormLabel>Add Privileges</FormLabel>
                            <Select
                                isMulti
                                options={privilegeOptions} // Options for select
                                onChange={handleAddPrivilegesChange}
                                placeholder="Select privileges"
                                value={privilegeOptions.filter(option => selectedPrivileges.includes(option.value))}
                            />
                        </FormControl>

                        {/* Remove Privileges Section with Multi-Select */}
                        <FormControl isRequired>
                            <FormLabel>Remove Privileges</FormLabel>
                            <Select
                                isMulti
                                options={privilegeOptions} // Options for select
                                onChange={handleRemovePrivilegesChange}
                                placeholder="Select privileges to remove"
                                value={privilegeOptions.filter(option => privilegesToRemove.includes(option.value))}
                            />
                        </FormControl>

                        {/* Updated Button with blue color and hover effect */}
                        <Button
                            bg="#228Be6"
                            color="white"
                            _hover={{ bg: "#005B96" }}  // Darker blue on hover
                            onClick={openConfirmationDialog}
                            width="full"
                        >
                            Update Role Access
                        </Button>
                    </VStack>
                </Box>

                {/* Graphs Section */}
                <Box
                    width={{ base: '100%', lg: '50%' }}
                    display="flex"
                    flexDirection="column"
                    gap={5}
                >
                    {/* Responsive Bar Chart Section */}
                    <Box>
                        <Text fontSize={['lg', 'xl']} fontWeight="bold" mb={4}>
                            Number of Privileges by Role
                        </Text>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={privilegeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="privilegeCount" fill="#4A90E2" /> {/* Blue bar */}
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>

                    {/* Responsive Pie Chart Section */}
                    <Box>
                        <Text fontSize={['lg', 'xl']} fontWeight="bold" mb={4}>
                            Number of Roles
                        </Text>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={privilegeData}
                                    dataKey="privilegeCount"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#1E90FF"  // Lighter blue for pie chart
                                    label
                                >
                                    {privilegeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={blueShades[index % blueShades.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>
            </Flex>

            {/* Confirmation Modal */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Confirm Submission
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to update the role access?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue" onClick={handleSubmit} ml={3}>
                                Confirm
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};

export default ManageRoleAccessPage;
