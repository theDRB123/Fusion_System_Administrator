import React from 'react';
import {
    Box, Flex, Grid, Heading, Text, Stat, StatLabel, StatNumber, SimpleGrid, Modal, ModalOverlay,
    ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, useBreakpointValue,
    useColorMode, useColorModeValue, IconButton
} from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { FaUser, FaBell, FaArchive, FaCog, FaUsers, FaMoon, FaSun } from "react-icons/fa";
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { isOpen: isUserModalOpen, onOpen: onUserModalOpen, onClose: onUserModalClose } = useDisclosure();
    const { isOpen: isRoleModalOpen, onOpen: onRoleModalOpen, onClose: onRoleModalClose } = useDisclosure();
    const { isOpen: isArchiveModalOpen, onOpen: onArchiveModalOpen, onClose: onArchiveModalClose } = useDisclosure();
    const { toggleColorMode } = useColorMode();
    const colorModeIcon = useColorModeValue(FaMoon, FaSun);

    const studentDataByYear = [
        { year: '2020', students: 120 },
        { year: '2021', students: 140 },
        { year: '2022', students: 160 },
        { year: '2023', students: 180 },
    ];

    const quickActionColors = useColorModeValue(
        ["lightcoral", "lightseagreen", "lightsalmon", "lightblue"],
        ["#E53E3E", "#2B6CB0", "#ED8936", "#2C7A7B"]
    );

    const userTypeData = [
        { name: 'Student', value: 350 },
        { name: 'Professor', value: 80 },
        { name: 'Staff', value: 50 },
    ];

    const branchWiseData = [
        { branch: 'CSE', users: 150 },
        { branch: 'ECE', users: 120 },
        { branch: 'ME', users: 180 },
        { branch: 'EE', users: 200 },
    ];

    const announcementsDataByYear = [
        { year: '2020', announcements: 30, notifications: 40 },
        { year: '2021', announcements: 45, notifications: 50 },
        { year: '2022', announcements: 60, notifications: 70 },
        { year: '2023', announcements: 80, notifications: 100 },
    ];

    const ChartBox = ({ title, children }) => {
        const titleFontSize = useBreakpointValue({ base: 'md', md: 'lg', lg: 'xl' });

        return (
            <Box bg={useColorModeValue('white', 'gray.700')} borderRadius="md" boxShadow="md" p={4}>
                <Heading size={titleFontSize} mb={4}>{title}</Heading>
                <Flex justify="center">{children}</Flex>
            </Box>
        );
    };

    const chartColors = ['lightsalmon', 'lightcoral', 'lightseagreen', 'mistyrose'];
    const chartSize = useBreakpointValue({ base: 250, md: 350, lg: 400 });
    const pieChartSize = useBreakpointValue({ base: 200, md: 280, lg: 350 });

    return (
        <Box p={5} bg={useColorModeValue("gray.100", "gray.800")} minH="100vh">
            <Flex justifyContent="space-between" alignItems="center" mb={6}>
                <Heading>System Admin Dashboard</Heading>
                <IconButton
                    icon={React.createElement(colorModeIcon)}
                    onClick={toggleColorMode}
                    aria-label="Toggle Theme"
                />
            </Flex>

            {/* Stats Section */}
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={6}>
                <StatBox title="Total Users" count="500" icon={<FaUser />} />
                <StatBox title="Active Notifications" count="45" icon={<FaBell />} />
                <StatBox title="Archived Data" count="120" icon={<FaArchive />} />
                <StatBox title="Roles Managed" count="8" icon={<FaCog />} />
            </SimpleGrid>

            {/* Quick Actions Section */}
            <Heading size="md" mb={4}>Quick Actions</Heading>
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={8}>
                <QuickAction title="Manage Users" icon={FaUsers} onClick={onUserModalOpen} color={quickActionColors[0]} />
                <QuickAction title="Manage Roles" icon={FaCog} onClick={onRoleModalOpen} color={quickActionColors[1]} />
                <QuickAction title="Archive Data" icon={FaArchive} onClick={onArchiveModalOpen} color={quickActionColors[2]} />
                <QuickAction title="Mail" icon={FaBell} color={quickActionColors[3]} />
            </SimpleGrid>

            {/* Charts Section */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} mb={8}>
                <ChartBox title="Students Registered by Year">
                    <LineChart width={chartSize} height={chartSize} data={studentDataByYear}>
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <XAxis dataKey="year" tickLine={false} />
                        <YAxis tickLine={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="students" stroke="lightsalmon" />
                    </LineChart>
                </ChartBox>

                <ChartBox title="Role Based User Distribution">
                    <PieChart width={pieChartSize} height={pieChartSize}>
                        <Pie data={userTypeData} dataKey="value" cx="50%" cy="50%" outerRadius={pieChartSize / 3}>
                            {userTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ChartBox>

                <ChartBox title="User Distribution Across Branches">
                    <BarChart width={chartSize} height={chartSize} data={branchWiseData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="branch" tickLine={false} />
                        <YAxis tickLine={false} />
                        <Tooltip />
                        <Bar dataKey="users" fill="lightseagreen" />
                    </BarChart>
                </ChartBox>

                <ChartBox title="Announcements & Notifications by Year">
                    <BarChart width={chartSize} height={chartSize} data={announcementsDataByYear}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" tickLine={false} />
                        <YAxis tickLine={false} />
                        <Tooltip />
                        <Bar dataKey="announcements" fill="lightcoral" />
                        <Bar dataKey="notifications" fill="mistyrose" />
                    </BarChart>
                </ChartBox>
            </Grid>

            {/* Modals for Quick Actions */}
            <Modal isOpen={isUserModalOpen} onClose={onUserModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>User Management</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <OptionCard title="Create User" route="/UserManagement/CreateUser" />
                        <OptionCard title="Delete User" route="/UserManagement/DeleteUser" />
                        <OptionCard title="Reset User Password" route="/UserManagement/ResetUserPassword" />
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal isOpen={isRoleModalOpen} onClose={onRoleModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Role Management</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <OptionCard title="Create Custom Role" route="/RoleManagement/CreateCustomRole" />
                        <OptionCard title="Edit User Role" route="/RoleManagement/EditUserRole" />
                        <OptionCard title="Manage Role Access" route="/RoleManagement/ManageRoleAccess" />
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal isOpen={isArchiveModalOpen} onClose={onArchiveModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Archive Users</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <OptionCard title="Archive Users" route="/archive/users" />
                        <OptionCard title="Archive Notifications" route="/archive/notifications" />
                        <OptionCard title="Archive Announcements" route="/archive/announcements" />
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Recent Activity Section */}
            <Heading size="md" mt={10} mb={4}>Recent Activity</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <ActivityCard title="User John Doe Created" date="October 7, 2024" />
                <ActivityCard title="Archived 10 Notifications" date="October 6, 2024" />
                <ActivityCard title="Role 'Admin' Updated" date="October 5, 2024" />
                <ActivityCard title="Password Reset for Jane Doe" date="October 4, 2024" />
            </SimpleGrid>
        </Box>
    );
};

// StatBox Component
const StatBox = ({ title, count, icon }) => (
    <Box as={motion.div} whileHover={{ scale: 1.05 }} transition="0.2s" bg={useColorModeValue("white", "gray.700")} boxShadow="md" p={4} borderRadius="md">
        <Flex justifyContent="space-between" align="center">
            <Stat>
                <StatLabel>{title}</StatLabel>
                <StatNumber>{count}</StatNumber>
            </Stat>
            <Box fontSize="2xl" color="gray.500">
                {icon}
            </Box>
        </Flex>
    </Box>
);

// QuickAction Component
const QuickAction = ({ title, icon, onClick, color }) => (
    <Box
        as={motion.div}
        whileHover={{ scale: 1.05 }}
        transition="0.2s"
        bg={color}
        boxShadow="md"
        p={4}
        borderRadius="md"
        onClick={onClick}
        cursor="pointer"
    >
        <Flex direction="column" align="center" justify="center">
            <Box fontSize="3xl" color="white" mb={2}>
                {React.createElement(icon)}
            </Box>
            <Text fontSize="lg" color="white">{title}</Text>
        </Flex>
    </Box>
);

// OptionCard Component
const OptionCard = ({ title, route }) => (
    <Box
        bg={useColorModeValue("white", "gray.700")}
        borderRadius="md"
        boxShadow="md"
        p={4}
        mb={4}
        cursor="pointer"
        _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
        onClick={() => window.location.href = route}
    >
        <Text fontWeight="bold">{title}</Text>
    </Box>
);

// ActivityCard Component
const ActivityCard = ({ title, date }) => (
    <Box bg={useColorModeValue("white", "gray.700")} borderRadius="md" boxShadow="md" p={4}>
        <Text fontWeight="bold">{title}</Text>
        <Text color="gray.500">{date}</Text>
    </Box>
);

export default Dashboard;
