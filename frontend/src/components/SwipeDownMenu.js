import React, { useEffect, useState } from 'react';
import {
    Box,
    IconButton,
    Slide,
    Grid,
    GridItem,
    VStack,
    Text,
    Icon,
    useDisclosure,
    useMediaQuery,
} from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp, FaUserShield, FaKey, FaArchive, FaUser, FaTrashAlt, FaBell, FaBullhorn, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SwipeDownMenu = () => {
    const { isOpen, onToggle } = useDisclosure();
    const [activeOption, setActiveOption] = useState(null);
    const [isSmallScreen] = useMediaQuery('(max-width: 768px)');

    const handleOptionClick = (option) => {
        setActiveOption(activeOption === option ? null : option);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.altKey && event.key === 'm') {
                onToggle();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onToggle]);

    return (
        <Box position="relative" w="full" textAlign="center">
            <IconButton
                onClick={onToggle}
                icon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
                bg="white"
                color="gray.700"
                _hover={{ bg: 'gray.200' }}
                borderRadius="full"
                position="fixed"
                top="20px"
                left={isSmallScreen ? '95%' : '50%'}
                transform={isSmallScreen ? 'translateX(-50%)' : 'translateX(-50%)'}
                zIndex={10}
                aria-label="Menu"
            />

            {/* Slide-down menu */}
            <Slide direction="top" in={isOpen} style={{ zIndex: 7 }}>
                <Box
                    mt={10}
                    bg="white"
                    color="gray.800"
                    borderRadius="md"
                    py={6}
                    shadow="lg"
                    maxW="container.lg"
                    mx="auto"
                    px={6}
                >
                    <Grid templateColumns={isSmallScreen ? '1fr' : 'repeat(3, 1fr)'} gap={6}>
                        {/* User Management Option */}
                        <GridItem>
                            <Box
                                p={4}
                                bg="gray.100"
                                borderRadius="md"
                                shadow="sm"
                                _hover={{ bg: 'gray.200', cursor: 'pointer' }}
                                onClick={() => handleOptionClick('userManagement')}
                            >
                                <Icon as={FaUserShield} mr={2} />
                                <Text fontSize="lg">User Management</Text>
                            </Box>
                            {activeOption === 'userManagement' && (
                                <VStack mt={3} align="start" spacing={2}>
                                    <Link to="/UserManagement/CreateUser">
                                        <Icon as={FaUser} mr={2} /> Create User
                                    </Link>
                                    <Link to="/UserManagement/DeleteUser">
                                        <Icon as={FaTrashAlt} mr={2} /> Delete User
                                    </Link>
                                    <Link to="/UserManagement/ResetUserPassword">
                                        <Icon as={FaKey} mr={2} /> Reset Password
                                    </Link>
                                </VStack>
                            )}
                        </GridItem>

                        {/* Role Management Option */}
                        <GridItem>
                            <Box
                                p={4}
                                bg="gray.100"
                                borderRadius="md"
                                shadow="sm"
                                _hover={{ bg: 'gray.200', cursor: 'pointer' }}
                                onClick={() => handleOptionClick('roleManagement')}
                            >
                                <Icon as={FaKey} mr={2} />
                                <Text fontSize="lg">Role Management</Text>
                            </Box>
                            {activeOption === 'roleManagement' && (
                                <VStack mt={3} align="start" spacing={2}>
                                    <Link to="/RoleManagement/CreateCustomRole">
                                        <Icon as={FaKey} mr={2} /> Create Custom Role
                                    </Link>
                                    <Link to="/RoleManagement/EditUserRole">
                                        <Icon as={FaKey} mr={2} /> Edit User Role
                                    </Link>
                                    <Link to="/RoleManagement/ManageRoleAccess">
                                        <Icon as={FaKey} mr={2} /> Manage Role Access
                                    </Link>
                                </VStack>
                            )}
                        </GridItem>

                        {/* Archive Management Option */}
                        <GridItem>
                            <Box
                                p={4}
                                bg="gray.100"
                                borderRadius="md"
                                shadow="sm"
                                _hover={{ bg: 'gray.200', cursor: 'pointer' }}
                                onClick={() => handleOptionClick('archiveManagement')}
                            >
                                <Icon as={FaArchive} mr={2} />
                                <Text fontSize="lg">Archive Management</Text>
                            </Box>
                            {activeOption === 'archiveManagement' && (
                                <VStack mt={3} align="start" spacing={2}>
                                    <Link to="/archive/users">
                                        <Icon as={FaUsers} mr={2} /> Archive Users
                                    </Link>
                                    <Link to="/archive/notifications">
                                        <Icon as={FaBell} mr={2} /> Archive Notifications
                                    </Link>
                                    <Link to="/archive/announcements">
                                        <Icon as={FaBullhorn} mr={2} /> Archive Announcements
                                    </Link>
                                </VStack>
                            )}
                        </GridItem>
                    </Grid>
                </Box>
            </Slide>
        </Box>
    );
};

export default SwipeDownMenu;
