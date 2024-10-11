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
    Collapse,
    Link as ChakraLink,
} from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp, FaUserShield, FaKey, FaArchive, FaUser, FaTrashAlt, FaBell, FaBullhorn, FaUsers, FaHome } from 'react-icons/fa';
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
                bg="blue.500"
                color="white"
                _hover={{ bg: 'blue.400' }}
                borderRadius="full"
                position="fixed"
                top="20px"
                left={isSmallScreen ? '90%' : '50%'}
                transform="translateX(-50%)"
                zIndex={10}
                aria-label="Menu"
            />

            {/* Slide-down menu */}
            <Slide direction="top" in={isOpen} style={{ zIndex: 7 }}>
                <Box
                    mt={12}
                    bg="gray.50"
                    color="gray.800"
                    borderRadius="lg"
                    py={6}
                    shadow="xl"
                    maxW="container.md"
                    mx="auto"
                    px={4}
                    border="1px solid"
                    borderColor="gray.200"
                >
                    <Grid templateColumns={isSmallScreen ? '1fr' : 'repeat(3, 1fr)'} gap={4}>

                        {/* Home Button */}
                        <GridItem colSpan={isSmallScreen ? 1 : 3}>
                            <Box
                                p={4}
                                bg="orange.50"
                                borderRadius="md"
                                shadow="sm"
                                _hover={{ bg: 'orange.100', cursor: 'pointer' }}
                                transition="background-color 0.2s ease"
                            >
                                <ChakraLink as={Link} to="/">
                                    <Icon as={FaHome} mr={2} />
                                    <Text fontSize="lg" fontWeight="bold">Dashboard</Text>
                                </ChakraLink>
                            </Box>
                        </GridItem>

                        {/* User Management Option */}
                        <GridItem>
                            <Box
                                p={4}
                                bg="blue.50"
                                borderRadius="md"
                                shadow="sm"
                                _hover={{ bg: 'blue.100', cursor: 'pointer' }}
                                onClick={() => handleOptionClick('userManagement')}
                                transition="background-color 0.2s ease"
                            >
                                <Icon as={FaUserShield} mr={2} />
                                <Text fontSize="lg" fontWeight="bold">User Management</Text>
                            </Box>
                            <Collapse in={activeOption === 'userManagement'} animateOpacity>
                                <VStack mt={3} align="start" spacing={2} px={2}>
                                    <ChakraLink as={Link} to="/UserManagement/CreateUser">
                                        <Icon as={FaUser} mr={2} /> Create User
                                    </ChakraLink>
                                    <ChakraLink as={Link} to="/UserManagement/DeleteUser">
                                        <Icon as={FaTrashAlt} mr={2} /> Delete User
                                    </ChakraLink>
                                    <ChakraLink as={Link} to="/UserManagement/ResetUserPassword">
                                        <Icon as={FaKey} mr={2} /> Reset Password
                                    </ChakraLink>
                                </VStack>
                            </Collapse>
                        </GridItem>

                        {/* Role Management Option */}
                        <GridItem>
                            <Box
                                p={4}
                                bg="green.50"
                                borderRadius="md"
                                shadow="sm"
                                _hover={{ bg: 'green.100', cursor: 'pointer' }}
                                onClick={() => handleOptionClick('roleManagement')}
                                transition="background-color 0.2s ease"
                            >
                                <Icon as={FaKey} mr={2} />
                                <Text fontSize="lg" fontWeight="bold">Role Management</Text>
                            </Box>
                            <Collapse in={activeOption === 'roleManagement'} animateOpacity>
                                <VStack mt={3} align="start" spacing={2} px={2}>
                                    <ChakraLink as={Link} to="/RoleManagement/CreateCustomRole">
                                        <Icon as={FaKey} mr={2} /> Create Custom Role
                                    </ChakraLink>
                                    <ChakraLink as={Link} to="/RoleManagement/EditUserRole">
                                        <Icon as={FaKey} mr={2} /> Edit User Role
                                    </ChakraLink>
                                    <ChakraLink as={Link} to="/RoleManagement/ManageRoleAccess">
                                        <Icon as={FaKey} mr={2} /> Manage Role Access
                                    </ChakraLink>
                                </VStack>
                            </Collapse>
                        </GridItem>

                        {/* Archive Management Option */}
                        <GridItem>
                            <Box
                                p={4}
                                bg="purple.50"
                                borderRadius="md"
                                shadow="sm"
                                _hover={{ bg: 'purple.100', cursor: 'pointer' }}
                                onClick={() => handleOptionClick('archiveManagement')}
                                transition="background-color 0.2s ease"
                            >
                                <Icon as={FaArchive} mr={2} />
                                <Text fontSize="lg" fontWeight="bold">Archive Management</Text>
                            </Box>
                            <Collapse in={activeOption === 'archiveManagement'} animateOpacity>
                                <VStack mt={3} align="start" spacing={2} px={2}>
                                    <ChakraLink as={Link} to="/archive/users">
                                        <Icon as={FaUsers} mr={2} /> Archive Users
                                    </ChakraLink>
                                    <ChakraLink as={Link} to="/archive/notifications">
                                        <Icon as={FaBell} mr={2} /> Archive Notifications
                                    </ChakraLink>
                                    <ChakraLink as={Link} to="/archive/announcements">
                                        <Icon as={FaBullhorn} mr={2} /> Archive Announcements
                                    </ChakraLink>
                                </VStack>
                            </Collapse>
                        </GridItem>
                    </Grid>
                </Box>
            </Slide>
        </Box>
    );
};

export default SwipeDownMenu;
