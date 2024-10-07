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
import { notifications } from '../../data/notifications'; // Update with actual data

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

    const handleArchive = () => {
        onOpen();
    };

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

    const filteredNotifications = notificationList.filter(notification => {
        const searchLower = searchTerm.toLowerCase();
        return (
            notification.title.toLowerCase().includes(searchLower) ||
            notification.message.toLowerCase().includes(searchLower) ||
            notification.time.toLowerCase().includes(searchLower)
        );
    });

    const displayedNotifications = filteredNotifications.filter(notification => (tabIndex === 0 ? !notification.isArchived : notification.isArchived));

    return (
        <Box bg="gray.100" minHeight="100vh" p={5}>
            {/* Header and Search Section */}
            <Flex justify="space-between" align="center" mb={5} flexDirection={['column', 'row']}>
                <Box
                    p={[2, 4]}  // Adjust padding for small screens
                    bgGradient="linear(to-r, LightSeaGreen, MistyRose)"
                    borderRadius="lg"
                    shadow="md"
                    mb={[4, 0]}
                >
                    <Text
                        fontSize={['xl', '2xl', '4xl']}  // Adjust font size for responsiveness
                        fontWeight="bold"
                        color="white"
                        textAlign={['center', 'left']}
                    >
                        Notification Archive
                    </Text>
                </Box>
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
                    mt={[4, 0]}
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
            {selectedNotifications.length > 0 && (
                <Flex justifyContent="center" mt={5}>
                    <Button
                        bgGradient="linear(to-r, MistyRose, LightSeaGreen)"
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
                            {/* Title Block */}
                            <Box
                                bg={isArchived ? 'LightSeaGreen' : 'MistyRose'}
                                p={2}
                                borderRadius="md"
                                textAlign="center"
                                color={!isArchived ? 'LightSeaGreen' : 'MistyRose'}
                                fontWeight="bold"
                            >
                                {notification.title}
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
