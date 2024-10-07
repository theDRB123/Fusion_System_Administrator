import React, { useState } from 'react';
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
    // Checkbox,
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
    Grid
} from '@chakra-ui/react';
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

    const handleArchive = () => {
        onOpen(); // Open confirmation modal
    };

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
        onClose(); // Close modal after confirmation
        toast({
            title: isArchiving ? 'Users Archived' : 'Users Unarchived',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-center',
        });
    };

    const filteredUsers = userList.filter(user => {
        const searchLower = searchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(searchLower) ||
            user.rollNo.toLowerCase().includes(searchLower) ||
            user.branch.toLowerCase().includes(searchLower) ||
            user.batch.toString().includes(searchLower) || // Ensures numeric values are also searchable
            user.role.toLowerCase().includes(searchLower)
        );
    });

    const displayedUsers = filteredUsers.filter(user => (tabIndex === 0 ? !user.isArchived : user.isArchived));

    return (
        <Box bg="gray.100" minHeight="100vh" p={5}>
            {/* Header and Search Section */}
            <Flex justify="space-between" align="center" mb={5} flexDirection={['column', 'row']}>
                <Box p={4} bgGradient="linear(to-r, lightblue, lightgreen)" borderRadius="lg" shadow="md" mb={[4, 0]}>
                    <Text fontSize={['2xl', '4xl']} fontWeight="bold" color="white">
                        User Archive
                    </Text>
                </Box>
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
                    mt={[4, 0]}
                />
            </Flex>

            {/* Tab Section */}
            <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} variant="unstyled">
                <TabList justifyContent="center" mb={5}>
                    <Tab
                        _selected={{
                            color: 'blue.500',  // Use a more visible color
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
                            color: 'green.500',  // Use a more visible color
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
                <Flex justifyContent="center" mt={5}>  {/* Flex container to center the button */}
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
                        borderLeft="4px solid"  // Add left border
                        borderColor={user.isArchived ? 'lightgreen' : 'lightblue'}
                        transition="all 0.2s ease"
                        bgGradient={
                            selectedUsers.includes(user.id)
                                ? isArchived
                                    ? 'linear(to-r, lightgreen, white)'
                                    : 'linear(to-r, lightblue, white)'
                                : 'none'
                        }
                        cursor="pointer"
                        onClick={() => toggleSelectUser(user.id)}  // Make the entire card clickable
                    >
                        {/* Grid layout to organize the card content */}
                        <Grid templateColumns={['1fr', '0.5fr 1fr auto']} gap={4} alignItems="center">
                            {/* Roll Number in small colored block with alternating colors */}
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
                                    Created: {user.timeOfCreation}
                                </Text>
                            </Box>

                            {/* Checkbox moved to the right corner */}
                            {/* <Checkbox
                                isChecked={selectedUsers.includes(user.id)}
                                onChange={(e) => {
                                    e.stopPropagation();  // Prevent checkbox click from triggering card click
                                    toggleSelectUser(user.id);
                                }}
                                colorScheme={isArchived ? 'green' : 'blue'}
                                justifySelf="end"
                            /> */}
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
