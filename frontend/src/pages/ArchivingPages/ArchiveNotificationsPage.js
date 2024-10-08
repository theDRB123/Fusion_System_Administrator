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
    SimpleGrid
} from '@chakra-ui/react';
import { notifications } from '../../data/notifications';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useBreakpointValue } from '@chakra-ui/react';

const ArchiveNotificationsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [notificationList, setNotificationList] = useState(notifications);
    const [selectedNotifications, setSelectedNotifications] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isArchiving, setIsArchiving] = useState(false);
    const toast = useToast();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const toggleSelectNotification = (notificationId) => {
        setSelectedNotifications((prevSelected) =>
            prevSelected.includes(notificationId)
                ? prevSelected.filter(id => id !== notificationId)
                : [...prevSelected, notificationId]
        );
    };

    const handleArchive = useCallback(() => {
        onOpen();
    }, [onOpen]);

    const confirmArchive = () => {
        setNotificationList(
            notificationList.map(notification => {
                if (selectedNotifications.includes(notification.id)) {
                    return { ...notification, isArchived: !notification.isArchived };
                }
                return notification;
            })
        );
        setSelectedNotifications([]);
        onClose();
        toast({
            title: isArchiving ? 'Notifications Archived' : 'Notifications Unarchived',
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

    const filteredNotifications = notificationList.filter(notification => {
        const searchLower = searchTerm.toLowerCase();
        return (
            notification.title.toLowerCase().includes(searchLower) ||
            notification.message.toLowerCase().includes(searchLower) ||
            notification.time.toLowerCase().includes(searchLower) ||
            String(notification.year).toLowerCase().includes(searchLower)
        );
    });

    const displayedNotifications = filteredNotifications.filter(notification => (tabIndex === 0 ? !notification.isArchived : notification.isArchived));

    const chartWidth = useBreakpointValue({ base: 300, md: 500, lg: 600 });
    const chartHeight = useBreakpointValue({ base: 200, md: 300 });

    const getStats = () => {
        const total = notificationList.length;
        const archived = notificationList.filter(notification => notification.isArchived).length;
        const nonArchived = total - archived;
        return { total, archived, nonArchived };
    };

    const { total, archived, nonArchived } = getStats();

    const getBarChartData = () => {
        const years = [2019, 2020, 2021, 2022, 2023];
        const counts = {};

        years.forEach(year => {
            counts[year] = { year, archived: 0 };
        });

        notificationList.forEach(notification => {
            const notificationYear = notification.year;
            if (notification.isArchived && years.includes(notificationYear)) {
                counts[notificationYear].archived += 1;
            }
        });

        return Object.values(counts);
    };

    const barChartData = getBarChartData();

    return (
        <Box bg="gray.100" minHeight="100vh" p={5}>
            {/* Header and Stats Section */}
            <Flex justify="space-between" align="center" mb={5} flexDirection={['column', 'row']}>
                <Box
                    p={[2, 4]}
                    bgGradient="linear(to-r, LightSeaGreen, MistyRose)"
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
                        Notification Archive
                    </Text>
                </Box>
                <SimpleGrid columns={3} spacing={4} textAlign="center" mt={[4, 0]}>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold">Total</Text>
                        <Text fontSize="xl">{total}</Text>
                    </Box>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold">Archived</Text>
                        <Text fontSize="xl">{archived}</Text>
                    </Box>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold">Non-Archived</Text>
                        <Text fontSize="xl">{nonArchived}</Text>
                    </Box>
                </SimpleGrid>
            </Flex>

            {/* Bar Chart Section for Archived Notifications by Year */}
            <Box
                p={5}
                bg="white"
                borderRadius="md"
                boxShadow="md"
                textAlign="center"
                mb={5}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                <Text fontSize="xl" mb={4} fontWeight="bold">
                    Archived Notifications by Year (2019-2023)
                </Text>
                <BarChart
                    width={chartWidth}
                    height={chartHeight}
                    data={barChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="archived" fill="#20B2AA" />
                </BarChart>
            </Box>

            {/* Search Section */}
            <Flex justify="center" mb={5}>
                <Input
                    placeholder="Search by title, message, etc."
                    value={searchTerm}
                    onChange={handleSearch}
                    maxW="300px"
                    bg="white"
                    borderRadius="full"
                    boxShadow="xl"
                    _hover={{ boxShadow: '2xl' }}
                    _focus={{ borderColor: 'LightSeaGreen' }}
                />
            </Flex>

            {/* Tab Section */}
            <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} variant="unstyled">
                <TabList justifyContent="center" mb={5}>
                    <Tab
                        _selected={{
                            borderBottom: '3px solid',
                            borderColor: 'Salmon',
                            fontSize: ['md', 'lg'],
                            color: 'Salmon',
                            transition: 'all 0.2s ease-in-out',
                        }}
                        mr={4}
                    >
                        Non-Archived Notifications
                    </Tab>
                    <Tab
                        _selected={{
                            color: 'Salmon',
                            borderBottom: '3px solid',
                            borderColor: 'Salmon',
                            fontSize: ['md', 'lg'],
                            transition: 'all 0.2s ease-in-out',
                        }}
                    >
                        Archived Notifications
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <NotificationList
                            notifications={displayedNotifications}
                            selectedNotifications={selectedNotifications}
                            toggleSelectNotification={toggleSelectNotification}
                            isArchived={false}
                        />
                    </TabPanel>
                    <TabPanel>
                        <NotificationList
                            notifications={displayedNotifications}
                            selectedNotifications={selectedNotifications}
                            toggleSelectNotification={toggleSelectNotification}
                            isArchived={true}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>

            {/* Archive/Unarchive Button */}
            <Flex justifyContent="center" mt={5}>
                <Button
                    bgGradient="linear(to-r, MistyRose, LightSeaGreen)"
                    color="white"
                    onClick={() => {
                        setIsArchiving(tabIndex === 0);
                        handleArchive();
                    }}
                    isDisabled={selectedNotifications.length === 0}
                >
                    {tabIndex === 0 ? 'Archive Selected' : 'Unarchive Selected'}
                </Button>
            </Flex>

            {/* Confirmation Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Action</ModalHeader>
                    <ModalBody>
                        Are you sure you want to {isArchiving ? 'archive' : 'unarchive'} the selected notifications?
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

const NotificationList = ({ notifications, selectedNotifications, toggleSelectNotification, isArchived }) => {
    return (
        <VStack align="stretch" spacing={4} overflowY="scroll" maxHeight="500px">
            {notifications.length > 0 ? (
                notifications.map(notification => (
                    <Box
                        key={notification.id}
                        bg="white"
                        shadow="md"
                        p={4}
                        borderRadius="md"
                        borderLeft="4px solid"
                        borderColor={isArchived ? 'MistyRose' : 'LightSeaGreen'}
                        transition="all 0.2s ease"
                        bgGradient={
                            selectedNotifications.includes(notification.id)
                                ? isArchived
                                    ? 'linear(to-r, MistyRose, white)'
                                    : 'linear(to-r, LightSeaGreen, white)'
                                : 'none'
                        }
                        cursor="pointer"
                        onClick={() => toggleSelectNotification(notification.id)}
                    >
                        <Grid templateColumns={['1fr', '0.5fr 1fr auto']} gap={4} alignItems="center">
                            <Box
                                bg={isArchived ? 'LightSeaGreen' : 'MistyRose'}
                                p={2}
                                borderRadius="md"
                                textAlign="center"
                                color={!isArchived ? 'LightSeaGreen' : 'MistyRose'}
                                fontWeight="bold"
                            >
                                {notification.title} - {notification.year}
                            </Box>

                            {/* Notification Info */}
                            <Box>
                                <Text fontSize={['md', 'lg']} fontFamily="Georgia, serif" fontWeight="bold">
                                    {notification.message}
                                </Text>
                                <Text fontSize={['xs', 'sm']} color="gray.500">
                                    Time: {notification.time}
                                </Text>
                            </Box>
                        </Grid>
                    </Box>
                ))
            ) : (
                <Text>No notifications found.</Text>
            )}
        </VStack>
    );
};

export default ArchiveNotificationsPage;
