import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    Flex,
    Input,
    Select,
    Text,
    VStack,
    useToast,
    FormControl,
    FormLabel,
    useBreakpointValue,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    SimpleGrid,
} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { users } from '../../data/users';

const CreateUserPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        rollNo: '',
        batch: '',
        branch: '',
        password: '',
        role: 'Student',
    });

    const toast = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        // Close the modal
        setIsOpen(false);

        // Logic for saving user (e.g., send data to the server)
        console.log('User Data:', formData);

        toast({
            title: 'User Created',
            description: 'The user has been successfully created.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
        });

        setFormData({
            name: '',
            rollNo: '',
            batch: '',
            branch: '',
            password: '',
            role: 'Student',
        });
    };

    const openConfirmationDialog = () => {
        setIsOpen(true); // Open the confirmation dialog
    };

    // Group users by year of creation
    const getUsersByYear = () => {
        const yearCount = {};
        users.forEach((user) => {
            const year = new Date(user.createdAt).getFullYear(); // Assuming `createdAt` is a property in the user object
            if (yearCount[year]) {
                yearCount[year]++;
            } else {
                yearCount[year] = 1;
            }
        });
        return Object.keys(yearCount).map((year) => ({
            year,
            count: yearCount[year],
        }));
    };

    const yearData = getUsersByYear();

    // Group users by role (Student vs Faculty)
    const getUsersByRole = () => {
        const roleCount = { Student: 0, Faculty: 0 };
        users.forEach((user) => {
            if (user.role === 'Student') {
                roleCount.Student++;
            } else if (user.role === 'Faculty') {
                roleCount.Faculty++;
            }
        });
        return [
            { name: 'Student', value: roleCount.Student },
            { name: 'Faculty', value: roleCount.Faculty },
        ];
    };

    const roleData = getUsersByRole();

    // Define colors for pie chart segments
    const COLORS = ['#4A90E2', '#005B96']; // Update to a consistent color palette

    // Responsive chart sizes based on screen size
    const chartHeight = useBreakpointValue({ base: 200, md: 300 });

    // Calculate total number of users and users created this year
    const totalUsers = users.length;
    const currentYear = new Date().getFullYear();
    const usersCreatedThisYear = users.filter(user => {
        const createdYear = new Date(user.createdAt).getFullYear(); // Assuming `createdAt` is a property in the user object
        return createdYear === currentYear;
    }).length;

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
                        fontSize={['xl', '2xl', '4xl']}
                        fontWeight="bold"
                        color="white"
                        textAlign={['center', 'left']}
                    >
                        Create User
                    </Text>
                </Box>
                <SimpleGrid columns={2} spacing={4} textAlign="center" mt={[4, 0]}>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold">Total Users</Text>
                        <Text fontSize="xl">{totalUsers}</Text>
                    </Box>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold">Users Created This Year</Text>
                        <Text fontSize="xl">{usersCreatedThisYear}</Text>
                    </Box>
                </SimpleGrid>
            </Flex>

            {/* Responsive Layout: Form on the left, charts on the right */}
            <Flex
                direction={{ base: 'column', lg: 'row' }} // Column layout on small screens, row on larger
                justify="space-between"
                align="flex-start"
                gap={10}
            >
                {/* User Creation Form on the left */}
                <Box
                    //bg="white"
                    p={useBreakpointValue({ base: 5, lg: 8 })} // Padding adjusts for screen size
                    rounded="md"
                    //shadow="md"
                    width={{ base: '100%', lg: '45%' }} // Full width on smaller screens, half on larger
                    mx="auto" // Center the form horizontally on smaller screens
                >
                    <form>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    name="name"
                                    placeholder="Enter user name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    bg="white"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Roll Number</FormLabel>
                                <Input
                                    name="rollNo"
                                    placeholder="Enter roll number"
                                    value={formData.rollNo}
                                    onChange={handleChange}
                                    bg="white"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Batch</FormLabel>
                                <Input
                                    name="batch"
                                    placeholder="Enter batch year (e.g., 2020)"
                                    value={formData.batch}
                                    onChange={handleChange}
                                    bg="white"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Branch</FormLabel>
                                <Input
                                    name="branch"
                                    placeholder="Enter branch (e.g., CSE)"
                                    value={formData.branch}
                                    onChange={handleChange}
                                    bg="white"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    bg="white"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Role</FormLabel>
                                <Select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    bg="white"
                                >
                                    <option value="Student">Student</option>
                                    <option value="Faculty">Faculty</option>
                                </Select>
                            </FormControl>

                            <Button 
                                bg="#228Be6" 
                                color="white" 
                                _hover={{ bg: "#005B96" }} 
                                onClick={openConfirmationDialog} 
                                width="full"
                            >
                                Create User
                            </Button>
                        </VStack>
                    </form>
                </Box>

                {/* Charts on the right */}
                <Flex
                    direction="column" // Stack charts vertically on larger screens
                    w={{ base: '100%', lg: '45%' }} // Full width on small screens, half on larger
                    gap={6}
                >
                    {/* Bar Chart Section for Users by Year of Creation */}
                    <Box
                        p={5}
                        //bg="white"
                        borderRadius="md"
                        //boxShadow="md"
                        textAlign="center"
                    >
                        <Text fontSize={useBreakpointValue({ base: 'lg', md: 'xl' })} mb={4} fontWeight="bold">
                            Number of Users by Year of Creation
                        </Text>
                        <ResponsiveContainer width="100%" height={chartHeight}>
                            <BarChart data={yearData}>
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#4A90E2" /> {/* Update bar color */}
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>

                    {/* Pie Chart Section for Users by Role */}
                    <Box
                        p={5}
                        //bg="white"
                        borderRadius="md"
                        //boxShadow="md"
                        textAlign="center"
                    >
                        <Text fontSize={useBreakpointValue({ base: 'lg', md: 'xl' })} mb={4} fontWeight="bold">
                            User Distribution by Role
                        </Text>
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
                </Flex>
            </Flex>

            {/* Alert Dialog for Confirmation */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Confirm User Creation
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to create this user? This action cannot be undone.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleSubmit} ml={3}>
                                Confirm
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};

export default CreateUserPage;
