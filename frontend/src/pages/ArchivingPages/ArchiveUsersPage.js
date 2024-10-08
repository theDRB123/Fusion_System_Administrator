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
    VStack,
    Text,
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Grid,
    SimpleGrid,
    // Stat,
    // StatLabel,
    // StatNumber,
} from '@chakra-ui/react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { users } from '../../data/users';

const ArchiveUsersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [userList, setUserList] = useState(users);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isArchiving, setIsArchiving] = useState(false);
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

    const handleArchive = useCallback(() => {
        onOpen();
    }, [onOpen]);

    const confirmArchive = () => {
        setUserList(
            userList.map(user => {
                if (selectedUsers.includes(user.id)) {
                    return { ...user, isArchived: !user.isArchived };
                }
                return user;
            })
        );
        setSelectedUsers([]);
        onClose();
        toast({
            title: isArchiving ? 'Users Archived' : 'Users Unarchived',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-center',
        });
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                setIsArchiving(tabIndex === 0);
                handleArchive();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [tabIndex, handleArchive]);

    const filteredUsers = userList.filter(user => {
        const searchLower = searchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(searchLower) ||
            user.rollNo.toLowerCase().includes(searchLower) ||
            user.branch.toLowerCase().includes(searchLower) ||
            user.batch.toString().includes(searchLower) ||
            user.role.toLowerCase().includes(searchLower)
        );
    });

    const displayedUsers = filteredUsers.filter(user => (tabIndex === 0 ? !user.isArchived : user.isArchived));

    const totalUsers = userList.length;
    const archivedUsers = userList.filter(user => user.isArchived).length;
    const nonArchivedUsers = totalUsers - archivedUsers;

    const pieData = [
        { name: 'Archived Students', value: userList.filter(user => user.isArchived && user.role === 'Student').length },
        { name: 'Archived Professors', value: userList.filter(user => user.isArchived && user.role === 'Professor').length },
    ];

    const barData = [
        { batch: 'Batch 2019', count: userList.filter(user => user.batch === "2019" && user.isArchived).length },
        { batch: 'Batch 2020', count: userList.filter(user => user.batch === "2020" && user.isArchived).length },
        { batch: 'Batch 2021', count: userList.filter(user => user.batch === "2021" && user.isArchived).length },
        { batch: 'Batch 2022', count: userList.filter(user => user.batch === "2022" && user.isArchived).length },
        { batch: 'Batch 2023', count: userList.filter(user => user.batch === "2023" && user.isArchived).length },
    ];

    return (
        <Box bg="gray.100" minHeight="100vh" p={5}>
            {/* Header Section */}
            <Flex justify="space-between" align="center" mb={5} flexDirection={['column', 'row']}>
                <Box p={4} bgGradient="linear(to-r, lightblue, lightgreen)" borderRadius="lg" shadow="md" mb={[4, 0]}>
                    <Text
                        fontSize={['xl', '2xl', '4xl']}
                        fontWeight="bold"
                        color="white"
                        textAlign={['center', 'left']}
                    >
                        User Archive
                    </Text>
                </Box>

                {/* Statistics Section Beside the Heading */}
                <SimpleGrid columns={3} spacing={4} textAlign="center" mt={[4, 0]}>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold">Total</Text>
                        <Text fontSize="xl">{totalUsers}</Text>
                    </Box>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold">Archived</Text>
                        <Text fontSize="xl">{archivedUsers}</Text>
                    </Box>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold">Non-Archived</Text>
                        <Text fontSize="xl">{nonArchivedUsers}</Text>
                    </Box>
                </SimpleGrid>
            </Flex>

            {/* Chart Section */}
            <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={5}>
                <Box p={5} bg="white" borderRadius="md" boxShadow="md" textAlign="center">
                    <Text fontSize="xl" mb={4} fontWeight="bold">Archived Users by Role</Text>
                    <Flex justify="center" align="center">
                        <PieChart width={400} height={300}>
                            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} fill="#82ca9d">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`hsl(${Math.random() * 360}, 70%, 60%)`} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </Flex>
                </Box>
                <Box p={5} bg="white" borderRadius="md" boxShadow="md" textAlign="center">
                    <Text fontSize="xl" mb={4} fontWeight="bold">Archived Students by Batch</Text>
                    <Flex justify="center" align="center" height="300px">
                        <BarChart width={400} height={300} data={barData}>
                            <XAxis dataKey="batch" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#90EE90" />
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
                    _focus={{ borderColor: 'lightgreen' }}
                />
            </Flex>

            {/* Tab Section */}
            <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} variant="unstyled">
                <TabList justifyContent="center" mb={5}>
                    <Tab
                        _selected={{
                            color: 'blue.500',
                            borderBottom: '3px solid',
                            borderColor: 'blue.500',
                            fontSize: ['md', 'lg'],
                            transition: 'all 0.2s ease-in-out',
                        }}
                        mr={4}
                    >
                        Non-Archived Users
                    </Tab>
                    <Tab
                        _selected={{
                            color: 'green.500',
                            borderBottom: '3px solid',
                            borderColor: 'green.500',
                            fontSize: ['md', 'lg'],
                            transition: 'all 0.2s ease-in-out',
                        }}
                    >
                        Archived Users
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <UserList
                            users={displayedUsers}
                            selectedUsers={selectedUsers}
                            toggleSelectUser={toggleSelectUser}
                            isArchived={false}
                        />
                    </TabPanel>
                    <TabPanel>
                        <UserList
                            users={displayedUsers}
                            selectedUsers={selectedUsers}
                            toggleSelectUser={toggleSelectUser}
                            isArchived={true}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>

            {/* Archive/Unarchive Button */}
            {selectedUsers.length > 0 && (
                <Flex justifyContent="center" mt={5}>
                    <Button
                        bgGradient="linear(to-r, lightgreen, lightblue)"
                        color="white"
                        onClick={() => {
                            setIsArchiving(tabIndex === 0);
                            handleArchive();
                        }}
                    >
                        {tabIndex === 0 ? 'Archive Selected' : 'Unarchive Selected'}
                    </Button>
                </Flex>
            )}

            {/* Confirmation Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Action</ModalHeader>
                    <ModalBody>
                        Are you sure you want to {isArchiving ? 'archive' : 'unarchive'} the selected users?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={confirmArchive}>
                            Proceed
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

const UserList = ({ users, selectedUsers, toggleSelectUser, isArchived }) => {
    return (
        <VStack align="stretch" spacing={4} overflowY="scroll" maxHeight="500px">
            {users.length > 0 ? (
                users.map(user => (
                    <Box
                        key={user.id}
                        bg="white"
                        shadow="md"
                        p={4}
                        borderRadius="md"
                        borderLeft="4px solid"
                        borderColor={user.isArchived ? 'lightgreen' : 'lightblue'}
                        transition="all 0.2s ease"
                        bgGradient={
                            selectedUsers.includes(user.id)
                                ? user.isArchived
                                    ? 'linear(to-r, lightgreen, white)'
                                    : 'linear(to-r, lightblue, white)'
                                : 'none'
                        }
                        cursor="pointer"
                        onClick={() => toggleSelectUser(user.id)}
                    >
                        <Grid templateColumns={['1fr', '0.5fr 1fr auto']} gap={4} alignItems="center">
                            <Box
                                bg={isArchived ? 'lightblue' : 'lightgreen'}
                                p={2}
                                borderRadius="md"
                                textAlign="center"
                                color="white"
                                fontWeight="bold"
                            >
                                {user.rollNo}
                            </Box>

                            {/* User Info */}
                            <Box>
                                <Text fontSize={['md', 'lg']} fontFamily="Georgia, serif" fontWeight="bold">
                                    {user.name}
                                </Text>
                                <Text fontSize={['sm', 'md']}>Branch: {user.branch}</Text>
                                <Text fontSize={['sm', 'md']}>Batch: {user.batch}</Text>
                                <Text fontSize={['xs', 'sm']} color="gray.500">
                                    Role: {user.role}
                                </Text>
                                <Text fontSize={['xs', 'sm']} color="gray.500">
                                    Created: {user.createdAt}
                                </Text>
                            </Box>
                        </Grid>
                    </Box>
                ))
            ) : (
                <Text>No users found.</Text>
            )}
        </VStack>
    );
};

export default ArchiveUsersPage;
