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
import { announcements } from '../../data/announcements';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useBreakpointValue } from '@chakra-ui/react';

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

    const handleArchive = useCallback(() => {
        onOpen();
    }, [onOpen]);

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

    const filteredAnnouncements = announcementList.filter(announcement => {
        const searchLower = searchTerm.toLowerCase();
        return (
            announcement.title.toLowerCase().includes(searchLower) ||
            announcement.message.toLowerCase().includes(searchLower) ||
            announcement.time.toLowerCase().includes(searchLower)
        );
    });

    const displayedAnnouncements = filteredAnnouncements.filter(announcement => (tabIndex === 0 ? !announcement.isArchived : announcement.isArchived));

    const chartWidth = useBreakpointValue({ base: 300, md: 500, lg: 600 });
    const chartHeight = useBreakpointValue({ base: 200, md: 300 });

    const getStats = () => {
        const total = announcementList.length;
        const archived = announcementList.filter(announcement => announcement.isArchived).length;
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

        announcementList.forEach(announcement => {
            const announcementYear = announcement.year;
            if (announcement.isArchived && years.includes(announcementYear)) {
                counts[announcementYear].archived += 1;
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
                    bgGradient="linear(to-r, lightcoral, lightyellow)"
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
                        Announcement Archive
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

            {/* Bar Chart Section for Archived Announcements by Year */}
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
                w="100%"
            >
                <Text fontSize="xl" mb={4} fontWeight="bold">
                    Archived Announcements by Year (2019-2023)
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
                    <Bar dataKey="archived" fill="#F08080" />
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
                    _focus={{ borderColor: 'lightcoral' }}
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
                        borderLeft="4px solid"
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
                        <Grid templateColumns={['1fr', '0.5fr 1fr auto']} gap={4} alignItems="center">
                            {/* Title and Year Box */}
                            <Box
                                bg={isArchived ? 'lightcoral' : 'lightyellow'}
                                p={2}
                                borderRadius="md"
                                textAlign="center"
                                color={!isArchived ? 'lightcoral' : 'lightyellow'}
                                fontWeight="bold"
                            >
                                {announcement.title} - {announcement.year} 
                            </Box>

                            {/* Announcement Info */}
                            <Box>
                                <Text fontSize={['md', 'lg']} fontFamily="Georgia, serif" fontWeight="medium">
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
