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
} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import Select from 'react-select'; // Import Select from react-select
import { roles } from '../../data/roles';
import { users } from '../../data/users';
import { privileges } from '../../data/privileges'; 

const CreateCustomRolePage = () => {
    const [roleName, setRoleName] = useState('');
    const [selectedPrivileges, setSelectedPrivileges] = useState([]); 
    const [description, setDescription] = useState('');
    const [timeOfCreation] = useState(new Date().toISOString().slice(0, 19).replace('T', ' '));
    const [createdBy] = useState('superadmin');
    const [lastUpdated] = useState(new Date().toISOString().slice(0, 19).replace('T', ' '));

    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef();
    const toast = useToast();

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
        // Map selected options to an array of privilege values
        setSelectedPrivileges(selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    const handleSubmit = () => {
        setIsOpen(false);
        console.log('Custom Role Created:', {
            roleName,
            selectedPrivileges, // use selectedPrivileges instead of privileges
            description,
            timeOfCreation,
            createdBy,
            lastUpdated,
        });

        toast({
            title: 'Custom Role Created',
            description: 'The custom role has been successfully created.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
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

    const colors = ['#4A90E2', '#005B96', '#0069B9', '#1E90FF', '#87CEFA', '#4682B4', '#4169E1']; // Blue shades

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
                        fontSize={['xl', '2xl', '4xl']}
                        fontWeight="bold"
                        color="white"
                        textAlign={['center', 'left']}
                    >
                        Create Custom Role
                    </Text>
                </Box>

                <SimpleGrid columns={2} spacing={4} textAlign="center" mb={5}>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold">Total Roles</Text>
                        <Text fontSize="xl">{totalRoles}</Text>
                    </Box>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold">Roles Created This Year</Text>
                        <Text fontSize="xl">{rolesCreatedThisYear}</Text>
                    </Box>
                </SimpleGrid>
            </Flex>

            <Flex direction={{ base: 'column', lg: 'row' }} gap={10}>
                {/* Form Section */}
                <Box
                    p={5}
                    //bg="white"
                    rounded="md"
                    //shadow="md"
                    width={{ base: '100%', lg: '50%' }}
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

                        <FormControl isRequired>
                            <FormLabel>Select Privileges</FormLabel>
                            <Select
                                isMulti
                                options={privilegeOptions} // Options for select
                                onChange={handleAddPrivilegesChange}
                                placeholder="Select privileges"
                                value={privilegeOptions.filter(option => selectedPrivileges.includes(option.value))}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Description</FormLabel>
                            <Input
                                name="description"
                                placeholder="Enter role description"
                                value={description}
                                onChange={handleChange}
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
                            Create Role
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
                        <Text fontSize="xl" fontWeight="bold" mb={4}>
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

                    {/* Responsive Pie Chart Section for Number of Users by Role */}
                    <Box>
                        <Text fontSize="xl" fontWeight="bold" mb={4}>
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
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Confirm Role Creation
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to create this custom role?
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

export default CreateCustomRolePage;
