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
import { announcements } from '../../data/announcements';

const ArchiveAnnouncementsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [announcementList, setAnnouncementList] = useState(announcements);
    const [selectedAnnouncements, setSelectedAnnouncements] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isArchiving, setIsArchiving] = useState(false);
    const toast = useToast();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const toggleSelectAnnouncement = (announcementId) => {
        setSelectedAnnouncements((prevSelected) =>
            prevSelected.includes(announcementId)
                ? prevSelected.filter(id => id !== announcementId)
                : [...prevSelected, announcementId]
        );
    };

    const handleArchive = () => {
        onOpen();
    };

    const confirmArchive = () => {
        setAnnouncementList(
            announcementList.map(announcement => {
                if (selectedAnnouncements.includes(announcement.id)) {
                    return { ...announcement, isArchived: !announcement.isArchived };
                }
                return announcement;
            })
        );
        setSelectedAnnouncements([]);
        onClose();
        toast({
            title: isArchiving ? 'Announcements Archived' : 'Announcements Unarchived',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-center',
        });
    };

    const filteredAnnouncements = announcementList.filter(announcement => {
        const searchLower = searchTerm.toLowerCase();
        return (
            announcement.title.toLowerCase().includes(searchLower) ||
            announcement.message.toLowerCase().includes(searchLower) ||
            announcement.time.toLowerCase().includes(searchLower)
        );
    });

    const displayedAnnouncements = filteredAnnouncements.filter(announcement => (tabIndex === 0 ? !announcement.isArchived : announcement.isArchived));

    return (
        <Box bg="gray.100" minHeight="100vh" p={5}>
            {/* Header and Search Section */}
            <Flex justify="space-between" align="center" mb={5} flexDirection={['column', 'row']}>
                <Box
                    p={[2, 4]}  // Smaller padding for small screens
                    bgGradient="linear(to-r, lightcoral, lightyellow)"
                    borderRadius="lg"
                    shadow="md"
                    mb={[4, 0]}
                >
                    <Text
                        fontSize={['xl', '2xl', '4xl']}  // Adjust font size: 'xl' for small, '2xl' for medium, '4xl' for large
                        fontWeight="bold"
                        color="white"
                        textAlign={['center', 'left']}  // Center the text on small screens
                    >
                        Announcement Archive
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
                    _focus={{ borderColor: 'lightcoral' }}
                    mt={[4, 0]}
                />
            </Flex>

            {/* Tab Section */}
            <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} variant="unstyled">
                <TabList justifyContent="center" mb={5}>
                    <Tab
                        _selected={{
                            borderBottom: '3px solid',
                            borderColor: 'coral.500',
                            fontSize: ['md', 'lg'],
                            color: "coral",
                            transition: 'all 0.2s ease-in-out',
                        }}
                        mr={4}
                    >
                        Non-Archived Announcements
                    </Tab>
                    <Tab
                        _selected={{
                            color: 'yellow.500',
                            borderBottom: '3px solid',
                            borderColor: 'yellow.500',
                            fontSize: ['md', 'lg'],
                            transition: 'all 0.2s ease-in-out',
                        }}
                    >
                        Archived Announcements
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <AnnouncementList
                            announcements={displayedAnnouncements}
                            selectedAnnouncements={selectedAnnouncements}
                            toggleSelectAnnouncement={toggleSelectAnnouncement}
                            isArchived={false}
                        />
                    </TabPanel>
                    <TabPanel>
                        <AnnouncementList
                            announcements={displayedAnnouncements}
                            selectedAnnouncements={selectedAnnouncements}
                            toggleSelectAnnouncement={toggleSelectAnnouncement}
                            isArchived={true}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>

            {/* Archive/Unarchive Button */}
            {selectedAnnouncements.length > 0 && (
                <Flex justifyContent="center" mt={5}>
                    <Button
                        bgGradient="linear(to-r, lightyellow, lightcoral)"
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
                        Are you sure you want to {isArchiving ? 'archive' : 'unarchive'} the selected announcements?
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

const AnnouncementList = ({ announcements, selectedAnnouncements, toggleSelectAnnouncement, isArchived }) => {
    return (
        <VStack align="stretch" spacing={4} overflowY="scroll" maxHeight="500px">
            {announcements.length > 0 ? (
                announcements.map(announcement => (
                    <Box
                        key={announcement.id}
                        bg="white"
                        shadow="md"
                        p={4}
                        borderRadius="md"
                        borderLeft="4px solid"  // Add left border
                        borderColor={announcement.isArchived ? 'lightyellow' : 'lightcoral'}
                        transition="all 0.2s ease"
                        bgGradient={
                            selectedAnnouncements.includes(announcement.id)
                                ? isArchived
                                    ? 'linear(to-r, lightyellow, white)'
                                    : 'linear(to-r, lightcoral, white)'
                                : 'none'
                        }
                        cursor="pointer"
                        onClick={() => toggleSelectAnnouncement(announcement.id)}
                    >
                        {/* Grid layout to organize the card content */}
                        <Grid templateColumns={['1fr', '0.5fr 1fr auto']} gap={4} alignItems="center">
                            {/* Title in small colored block with alternating colors */}
                            <Box
                                bg={isArchived ? 'lightcoral' : 'lightyellow'}
                                p={2}
                                borderRadius="md"
                                textAlign="center"
                                color={!isArchived ? 'lightcoral' : 'lightyellow'}
                                fontWeight="bold"
                            >
                                {announcement.title}
                            </Box>

                            {/* Announcement Info */}
                            <Box>
                                <Text fontSize={['md', 'lg']} fontFamily="Georgia, serif" fontWeight="bold">
                                    {announcement.message}
                                </Text>
                                <Text fontSize={['xs', 'sm']} color="gray.500">
                                    Time: {announcement.time}
                                </Text>
                            </Box>
                        </Grid>
                    </Box>
                ))
            ) : (
                <Text>No announcements found.</Text>
            )}
        </VStack>
    );
};

export default ArchiveAnnouncementsPage;
