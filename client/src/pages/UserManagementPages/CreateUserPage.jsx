import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    Select,
    Text,
    Stack,
    useMantineTheme,
    SimpleGrid,
    Modal,
    Group,
    Container,
    rem,
    Title,
    Flex,
    TextInput,
    Tabs,
    Space,
    Divider,
    Checkbox,
    Center,
    FileInput,
    Pill
} from '@mantine/core';


import { useDisclosure } from '@mantine/hooks';
import { FaCheck, FaTimes, FaDiceD6 } from 'react-icons/fa';
import { users } from '../../data/users';
import { announcements } from '../../data/announcements';

import { bulkUploadUsers, createUser } from '../../api/Users';
import { showNotification } from '@mantine/notifications';

const CreateUserPage = () => {
    const stats = [
        { title: 'Total users', icon: 'speakerPhone', value: '5,173', diff: 34, time: "In last year" },
        { title: 'Created user', icon: 'speakerPhone', value: '573', diff: -30, time: "In last year" },
        { title: 'Total Students', icon: 'speakerPhone', value: '2,543', diff: 18, time: "In last year" },
    ];
    const [archiveAnnouncementStats, setArchiveAnnouncementStats] = useState(stats)
    const theme = useMantineTheme();
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        rollNo: '',
        batch: '',
        branch: '',
        password: '',
        role: 'Student',
    });

    const xIcon = <FaTimes style={{ width: rem(20), height: rem(20) }} />;
    const checkIcon = <FaCheck style={{ width: rem(20), height: rem(20) }} />;

    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrorMessage('');
    };

    const handleFileSubmit = (file) => {
        setFile(file);
        setErrorMessage('');
    }

    const handleSubmit = async () => {
        try {
            let response;
            setLoading(true);
            close();
            if(file){
                const formData = new FormData();
                formData.append('file', file);
                response = await bulkUploadUsers(formData);
                setFile(null);
            }
            else response = await createUser(formData);

            if (response.skipped_users_count > 0) {
                const csvUrl = URL.createObjectURL(new Blob([response.skipped_users_csv], { type: 'text/csv' }));
                downloadCSV(csvUrl, 'skipped_users.csv');
            }

            showNotification({
                title: 'User Created',
                icon: checkIcon,
                position: "top-center",
                withCloseButton: true,
                message: `${response.created_users.length} User has been created successfully.\n${response.skipped_users_count ? `${response.skipped_users_count} User skipped.` : ''}`,
                color: 'teal',
            });
            setFormData({
                name: '',
                rollNo: '',
                password: '',
                role: 'Student',
            });
        } catch (error) {
            showNotification({
                title: 'Error',
                icon: xIcon,
                position: "top-center",
                withCloseButton: true,
                message: 'An error occurred while creating user.',
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    const openConfirmationDialog = () => {
        if (file) {
            open();
        }
        if (formData.name.trim() === '') {
            setErrorMessage('Name cannot be empty.');
        }
        else if (formData.rollNo.trim() === '') {
            setErrorMessage('Roll number cannot be empty.');
        }
        else open();
    };

    const downloadCSV = (url, filename) => {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    const getUsersByYear = () => {
        const yearCount = {};
        users.forEach((user) => {
            const year = new Date(user.createdAt).getFullYear();
            yearCount[year] = (yearCount[year] || 0) + 1;
        });
        return Object.keys(yearCount).map((year) => ({
            year,
            count: yearCount[year],
        }));
    };

    const yearData = getUsersByYear();

    const getUsersByRole = () => {
        const roleCount = { Student: 0, Faculty: 0 };
        users.forEach((user) => {
            roleCount[user.role] = (roleCount[user.role] || 0) + 1;
        });
        return [
            { name: 'Student', value: roleCount.Student },
            { name: 'Faculty', value: roleCount.Faculty },
            { name: 'Staff', value: roleCount.Staff },
        ];
    };

    const roleData = getUsersByRole();
    const COLORS = ['#4A90E2', '#005B96'];
    const chartHeight = 300;

    const totalUsers = users.length;
    const currentYear = new Date().getFullYear();
    const usersCreatedThisYear = users.filter(user => {
        const createdYear = new Date(user.createdAt).getFullYear();
        return createdYear === currentYear;
    }).length;

    return (
        <Box sx={{ background: theme.colors.gray[0], minHeight: '100vh', padding: '2rem' }} mt={'20px'}>
            {/* Top Section */}
            <Flex
                direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
                justify={{ sm: 'center' }}
            >
                <Button
                    variant="gradient"
                    size="xl"
                    radius="xs"
                    gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                    sx={{
                        display: 'block',
                        width: { base: '100%', sm: 'auto' },
                        whiteSpace: 'normal',
                        padding: '1rem',
                        textAlign: 'center',
                    }}
                >
                    <Title
                        order={1}
                        sx={{
                            fontSize: { base: 'lg', sm: 'xl' },
                            lineHeight: 1.2,
                            wordBreak: 'break-word',
                        }}
                    >
                        Create User
                    </Title>
                </Button>
            </Flex>


            <Divider
                my="xs"
                // variant="dashed"
                labelPosition="center"
                label={
                    <>
                        <FaDiceD6 size={12} />
                    </>
                }
            />


            <Stack size="lg" px="lg" w={'100%'} mx={'0px'}>
                <Flex justify={'center'} direction={{ base: 'column', md: 'row' }}>
                    {/* Form Section */}
                    <Box w="50%" mt={'20px'}>
                        <form>
                            <Stack>
                                <Input
                                    placeholder="Enter full name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    label="Name"
                                    required
                                />
                                <Input
                                    placeholder="Enter roll number"
                                    name="rollNo"
                                    value={formData.rollNo}
                                    onChange={handleChange}
                                    label="Roll Number"
                                    required
                                />
                                {errorMessage && !file && (
                                    <Text color="red" style={{ fontSize: '14px' }}>
                                        {errorMessage}
                                    </Text>
                                )}
                                <Select
                                    label="Role"
                                    name="role"
                                    value={formData.role}
                                    onChange={(value) => setFormData({ ...formData, role: value })}
                                    data={[
                                        { value: 'Student', label: 'Student' },
                                        { value: 'Faculty', label: 'Faculty' },
                                        { value: 'Staff', label: 'Staff' },
                                    ]}
                                />
                                <Button onClick={openConfirmationDialog} disabled={loading}>Create User</Button>
                            </Stack>
                        </form>
                    </Box>
                </Flex>
                <Divider
                    mt="20px"
                    // variant="dashed"
                    labelPosition="center"
                    label={
                        <>
                            <FaDiceD6 size={12} />
                        </>
                    }
                />
                <Stack justify='center' align='center' mt={'20px'}>
                    <Title
                        order={1}
                        sx={{
                            fontSize: { base: 'lg', sm: 'xl' },
                            lineHeight: 1.2,
                            wordBreak: 'break-word',
                        }}
                    >
                        Through CSV
                    </Title>
                    <FileInput
                        value={file}
                        onChange={handleFileSubmit}
                        size="md"
                        radius="xs"
                        placeholder="Attach a CSV"
                        w={'50%'}
                    />
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        w={'50%'}
                        mt={'10px'}
                    >
                        Create Users
                    </Button>
                </Stack>
            </Stack>

            {/* Confirmation Modal */}
            <Modal
                opened={opened}
                onClose={close}
                title="Confirm User Creation"
            >
                <Text>Are you sure you want to create this user? This action cannot be undone.</Text>
                <Group position="right" mt="md">
                    <Button variant="outline" onClick={close}>Cancel</Button>
                    <Button color="red" onClick={handleSubmit}>Confirm</Button>
                </Group>
            </Modal>
        </Box>
    );
};

export default CreateUserPage;
