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
    Flex,
    SimpleGrid,
    Select, // Import Select for dropdown
} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';
// import Select from 'react-select'; // Import react-select
import { roles } from '../../data/roles'; // Ensure this data exists and is structured correctly
import { users } from '../../data/users'; // Ensure this data exists and is structured correctly

const EditUserRolePage = () => {
    const [userName, setUserName] = useState(''); // User's name
    const [userRollNumber, setUserRollNumber] = useState(''); // User's roll number
    const [currentRole, setCurrentRole] = useState(''); // User's current role
    const [newRole, setNewRole] = useState(''); // User's new roles

    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef();
    const toast = useToast();

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

        // Logic for saving user details (e.g., send data to the server)
        console.log('User Details Submitted:', {
            userName,
            userRollNumber,
            currentRole,
            newRole,
        });

        toast({
            title: 'User Information Submitted',
            description: 'The user details have been successfully submitted.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
        });

        // Reset form fields
        setUserName('');
        setUserRollNumber('');
        setCurrentRole('');
        setNewRole('');
    };

    const openConfirmationDialog = () => {
        setIsOpen(true); // Open the confirmation dialog
    };

    // Function to get user counts by role
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

    // Function to get privileges count
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
    const rolesCreatedThisYear = roles.filter(role => new Date(role.createdAt).getFullYear() === currentYear).length;

    const colors = ['#4A90E2', '#005B96', '#0069B9', '#1E90FF', '#87CEFA', '#4682B4', '#4169E1']; // Blue shades

    // Map the roles to be used in the Select component
    const roleOptions = roles.map(role => ({
        value: role.name,
        label: role.name
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
                        fontSize={['xl', '2xl', '3xl']} // Responsive font size
                        fontWeight="bold"
                        color="white"
                        textAlign={['center', 'left']}
                    >
                        Edit User Role
                    </Text>
                </Box>

                <SimpleGrid columns={[1, 2]} spacing={4} textAlign="center" mb={5}>
                    <Box>
                        <Text fontSize={['md', 'lg']} fontWeight="bold">Total Roles</Text>
                        <Text fontSize={['lg', 'xl']}>{totalRoles}</Text>
                    </Box>
                    <Box>
                        <Text fontSize={['md', 'lg']} fontWeight="bold">Roles Created This Year</Text>
                        <Text fontSize={['lg', 'xl']}>{rolesCreatedThisYear}</Text>
                    </Box>
                </SimpleGrid>
            </Flex>

            <Flex direction={{ base: 'column', lg: 'row' }} gap={10}>
                {/* Form Section */}
                <Box
                    p={5}
                    rounded="md"
                    width={{ base: '60%', lg: '50%' }}
                    mb={{ base: 5, lg: 0 }}
                >
                    <VStack spacing={4}>
                        {/* User Name Input */}
                        <FormControl isRequired>
                            <FormLabel>User Name</FormLabel>
                            <Input
                                name="userName"
                                placeholder="Enter your name"
                                value={userName}
                                onChange={handleChange}
                                bg="white"
                            />
                        </FormControl>

                        {/* User Roll Number Input */}
                        <FormControl isRequired>
                            <FormLabel>User Roll Number</FormLabel>
                            <Input
                                name="userRollNumber"
                                placeholder="Enter your roll number"
                                value={userRollNumber}
                                onChange={handleChange}
                                bg="white"
                            />
                        </FormControl>

                        {/* Current Role Dropdown */}
                        <FormControl isRequired>
                            <FormLabel>Current Role</FormLabel>
                            <Select
                                options={roleOptions} // Options for select
                                onChange={(selectedOption) => setCurrentRole(selectedOption.value)}
                                placeholder="Select current role"
                                value={roleOptions.find(option => option.value === currentRole)}
                                bg="white"
                            />
                        </FormControl>

                        {/* New Role Dropdown */}
                        <FormControl isRequired>
                            <FormLabel>New Role</FormLabel>
                            <Select
                                options={roleOptions} // Options for select
                                onChange={(selectedOption) => setNewRole(selectedOption.value)}
                                placeholder="Select new role"
                                value={roleOptions.find(option => option.value === newRole)}
                                bg="white"
                            />
                        </FormControl>

                        <Button 
                            bg="#228Be6" 
                            color="white" 
                            _hover={{ bg: "#005B96" }} 
                            onClick={openConfirmationDialog} 
                            width="full"
                        >
                            Edit User Role
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
                    {/* Bar Chart Section */}
                    <Box>
                        <Text fontSize={['lg', 'xl']} fontWeight="bold" mb={4}>
                            Number of Privileges by Role
                        </Text>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={privilegeData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="privilegeCount" fill="#4A90E2" /> {/* Blue bar */}
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>

                    {/* Pie Chart Section for Number of Users by Role */}
                    <Box>
                        <Text fontSize={['lg', 'xl']} fontWeight="bold" mb={4}>
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
                                    fill="#1E90FF"  // Lighter blue for pie chart
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
                            Are you sure you want to update the user role?
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

export default EditUserRolePage;
