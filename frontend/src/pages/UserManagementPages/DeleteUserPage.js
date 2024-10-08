import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Button,
    Flex,
    Input,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text,
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    SimpleGrid,
} from '@chakra-ui/react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { users } from '../../data/users';

const DeleteUserPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [userList, setUserList] = useState(users);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isDeleting, setIsDeleting] = useState(false);
    const toast = useToast();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const toggleSelectUser = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter(id => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const handleDelete = useCallback(() => {
        onOpen();
    }, [onOpen]);

    const confirmDelete = () => {
        setIsDeleting(true);
        const updatedUserList = userList.map(user => {
            if (selectedUsers.includes(user.id)) {
                return { ...user, isDeleted: true };
            }
            return user;
        });
        setUserList(updatedUserList);
        setSelectedUsers([]);
        onClose();
        toast({
            title: 'Users Deleted',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-center',
        });
        setIsDeleting(false);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                handleDelete();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleDelete]);

    const filteredUsers = users.filter(user => {
        const name = user.name ? user.name.toLowerCase() : '';
        const rollNo = user.rollNo ? user.rollNo.toLowerCase() : '';
        const branch = user.branch ? user.branch.toLowerCase() : '';

        return (
            name.includes(searchTerm.toLowerCase()) ||
            rollNo.includes(searchTerm.toLowerCase()) ||
            branch.includes(searchTerm.toLowerCase())
        );
    });

    const displayedUsers = filteredUsers.filter(user => !user.isDeleted);

    const deletedUsers = userList.filter(user => user.isDeleted).length;
    const currentUsers = userList.length - deletedUsers;

    const pieData = [
        { name: 'Deleted Students', value: userList.filter(user => user.isDeleted && user.role === 'Student').length },
        { name: 'Deleted Professors', value: userList.filter(user => user.isDeleted && user.role === 'Professor').length },
    ];

    const barData = [
        { batch: 'Batch 2019', count: userList.filter(user => user.batch === "2019" && user.isDeleted).length },
        { batch: 'Batch 2020', count: userList.filter(user => user.batch === "2020" && user.isDeleted).length },
        { batch: 'Batch 2021', count: userList.filter(user => user.batch === "2021" && user.isDeleted).length },
        { batch: 'Batch 2022', count: userList.filter(user => user.batch === "2022" && user.isDeleted).length },
        { batch: 'Batch 2023', count: userList.filter(user => user.batch === "2023" && user.isDeleted).length },
    ];

    return (
        <Box bg="gray.200" minHeight="100vh" p={5}>
            {/* Header Section */}
            <Flex justify="space-between" align="center" mb={5} flexDirection={['column', 'row']}>
                <Box p={4} bgGradient="linear(to-r, teal.300, yellow.400)" borderRadius="lg" shadow="md" mb={[4, 0]}>
                    <Text
                        fontSize={['xl', '2xl', '4xl']}
                        fontWeight="bold"
                        color="white"
                        textAlign={['center', 'left']}
                    >
                        Delete User Management
                    </Text>
                </Box>

                {/* Statistics Section */}
                <SimpleGrid columns={2} spacing={4} textAlign="center" mt={[4, 0]}>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold">Current Users</Text>
                        <Text fontSize="xl">{currentUsers}</Text>
                    </Box>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold">Deleted Users</Text>
                        <Text fontSize="xl">{deletedUsers}</Text>
                    </Box>
                </SimpleGrid>
            </Flex>

            {/* Chart Section */}
            <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={5}>
                <Box p={5} bg="white" borderRadius="md" boxShadow="md" textAlign="center">
                    <Text fontSize="xl" mb={4} fontWeight="bold">Deleted Users by Role</Text>
                    <Flex justify="center" align="center">
                        <PieChart width={400} height={300}>
                            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} fill="#FFA07A">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`hsl(${Math.random() * 360}, 70%, 60%)`} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </Flex>
                </Box>
                <Box p={5} bg="white" borderRadius="md" boxShadow="md" textAlign="center">
                    <Text fontSize="xl" mb={4} fontWeight="bold">Deleted Students by Batch</Text>
                    <Flex justify="center" align="center" height="300px">
                        <BarChart width={400} height={300} data={barData}>
                            <XAxis dataKey="batch" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#FFD700" />
                        </BarChart>
                    </Flex>
                </Box>
            </SimpleGrid>

            {/* Search Input Section */}
            <Flex justify="center" mb={5}>
                <Input
                    placeholder="Search by name, roll number, etc."
                    value={searchTerm}
                    onChange={handleSearch}
                    maxW="300px"
                    bg="white"
                    borderRadius="full"
                    boxShadow="xl"
                    _hover={{ boxShadow: '2xl' }}
                    _focus={{ borderColor: 'teal.400' }}
                />
            </Flex>

            {/* Tab Section */}
            <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} variant="unstyled">
                <TabList justifyContent="center" mb={5}>
                    <Tab
                        _selected={{
                            color: 'teal.500',
                            borderBottom: '3px solid',
                            borderColor: 'teal.500',
                            fontSize: ['md', 'lg'],
                            transition: 'all 0.2s ease-in-out',
                        }}
                    >
                        Current Users
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <UserList
                            users={displayedUsers}
                            selectedUsers={selectedUsers}
                            toggleSelectUser={toggleSelectUser}
                            isDeleted={false}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>

            {/* Delete Button */}
            <Flex justifyContent="center" mt={5}>
                <Button
                    bgGradient="linear(to-r, teal.300, yellow.400)"
                    color="white"
                    onClick={handleDelete}
                    isDisabled={selectedUsers.length === 0}
                >
                    Delete Selected
                </Button>
            </Flex>

            {/* Modal Confirmation */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Delete</ModalHeader>
                    <ModalBody>
                        <Text>
                            Are you sure you want to delete the selected users?
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={confirmDelete}
                            isLoading={isDeleting}
                        >
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

const UserList = ({ users, selectedUsers, toggleSelectUser }) => {
    return (
        <SimpleGrid columns={[1, 2, 3]} spacing={5} maxHeight="400px" overflowY="auto">
            {users.map((user) => (
                <Box
                    key={user.id}
                    p={5}
                    bg="white"
                    borderRadius="md"
                    boxShadow="md"
                    border={selectedUsers.includes(user.id) ? '2px solid salmon' : ''}
                    borderLeft="4px"
                    borderLeftColor='teal.300'
                    position="relative"
                    cursor="pointer"
                    transition="all 0.2s ease-in-out"
                    _hover={{ boxShadow: 'lg' }}
                    onClick={() => toggleSelectUser(user.id)}
                >
                    <Flex direction="column" align="center">
                        <Text fontWeight="bold">{user.name}</Text>
                        <Text>{user.rollNo}</Text>
                        <Text>{user.branch}</Text>
                    </Flex>

                    {/* Circle checkbox for selected users */}
                    {selectedUsers.includes(user.id) && (
                        <Box
                            position="absolute"
                            top="50%"
                            right="10px"
                            transform="translateY(-50%)"
                            width="20px"
                            height="20px"
                            borderRadius="full"
                            bg="salmon"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Box width="10px" height="10px" bg="white" borderRadius="full" />
                        </Box>
                    )}
                </Box>
            ))}
        </SimpleGrid>
    );
};

export default DeleteUserPage;
