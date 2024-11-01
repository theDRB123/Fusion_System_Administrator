import React, { useState } from 'react';
import {
    Box,
    Button,
    Flex,
    Input,
    Text,
    Stack,
    rem,
    Modal,
    TextInput,
    Group,
    Tabs,
    Container,
    Title,
    Space,
    SimpleGrid,
    Divider,
    Checkbox,
    Center
} from '@mantine/core';

import { showNotification } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { FaCheck, FaTimes, FaDiceD6 } from 'react-icons/fa';
import { resetPassword } from '../../api/Users';

const ResetUserPasswordPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        rollNo: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [opened, setOpened] = useState(false);


    const xIcon = <FaTimes style={{ width: rem(20), height: rem(20) }} />;
    const checkIcon = <FaCheck style={{ width: rem(20), height: rem(20) }} />;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrorMessage(''); // Clear error when user starts typing
    };

    const openConfirmationDialog = () => {
        if (formData.name.trim() === '' || formData.rollNo.trim() === '') {
            setErrorMessage('Please fill all the fields.');
        } else {
            setOpened(true);
        }
    };

    const handleSubmit = async () => {
        try {
            setOpened(false);
            const response = await resetPassword(formData);
            console.log('Reset Password for:', formData);
            close();
            showNotification({
                title: 'Password Reset',
                icon: checkIcon,
                position: "top-center",
                withCloseButton: true,
                message: `Password for ${formData.name} has been reset successfully.\nNew password: ${response.password}`,
                color: 'green',
            });
            setFormData({
                name: '',
                rollNo: '',
            });
        }
        catch (e) {
            showNotification({
                title: 'Error',
                icon: xIcon,
                position: "top-center",
                withCloseButton: true,
                message: 'An error occurred while resetting password.   ',
                color: 'red',
            });
        }
    };

    return (
        <Box style={{ background: '#f7f7f7', minHeight: '100vh', padding: '20px' }}>
            {/* <Flex justify="space-between" align="center" mb="20px" direction={{ base: 'column', sm: 'row' }}>
                <Box
                    style={{
                        padding: '10px',
                        background: 'linear-gradient(to right, lightcoral, lightyellow)',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        marginBottom: '10px',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: 'white',
                        }}
                    >
                        Reset Password
                    </Text>
                </Box>
            </Flex> */}
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
                        Reset Password
                    </Title>
                </Button>
            </Flex>


            {/* <StatsGrid data={archiveAnnouncementStats} />  */}

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


            <Box
                style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    width: '100%',
                    maxWidth: '600px',
                    margin: '0 auto',
                }}
            >
                <form>
                    <Stack spacing="md">
                        <TextInput
                            label="Name"
                            name="name"
                            placeholder="Enter user name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <TextInput
                            label="Roll Number"
                            name="rollNo"
                            placeholder="Enter roll number"
                            value={formData.rollNo}
                            onChange={handleChange}
                            required
                        />

                        {errorMessage && (
                            <Text color="red" style={{ fontSize: '14px' }}>
                                {errorMessage}
                            </Text>
                        )}

                        <Button
                            style={{ background: 'light-blue', color: 'white' }}
                            onClick={openConfirmationDialog}
                            fullWidth
                        >
                            Reset Password
                        </Button>
                    </Stack>
                </form>
            </Box>

            {/* Confirmation Modal */}
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Reset Password"
            >
                <Text>
                    Are you sure you want to reset the password for {formData.name}?
                </Text>
                <Flex justify="flex-end" mt="md">
                    <Button variant="outline" onClick={() => setOpened(false)}>
                        Cancel
                    </Button>
                    <Button color="blue" onClick={handleSubmit} ml="sm">
                        Confirm
                    </Button>
                </Flex>
            </Modal>
        </Box>
    );
};

export default ResetUserPasswordPage;
