import React, { useState } from 'react';
import {
    Box,
    Button,
    Flex,
    Input,
    Text,
    Stack,
    Modal,
    TextInput,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications'; // Correctly import the notifications
import '@mantine/notifications/styles.css';

const ResetUserPasswordPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        rollNo: '',
        newPassword1: '',
        newPassword2: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [opened, setOpened] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrorMessage(''); // Clear error when user starts typing
    };

    const openConfirmationDialog = () => {
        // Check if passwords match
        if (formData.newPassword1 !== formData.newPassword2) {
            setErrorMessage('Passwords do not match.');
        } else if (formData.newPassword1.trim() === '') {
            setErrorMessage('Password cannot be empty.');
        } else if (formData.newPassword1.length < 6) {
            setErrorMessage('Password must be at least 6 characters.');
        } else {
            setOpened(true); // Open confirmation dialog if passwords match
        }
    };

    const handleSubmit = () => {
        // Close the modal
        setOpened(false);

        // Logic to handle form submission (e.g., send password reset request to server)
        console.log('Reset Password for:', formData);

        showNotification({
            title: 'Password Reset',
            message: `Password for ${formData.name} has been reset successfully.`,
            color: 'green',
        });

        // Reset form after submission
        setFormData({
            name: '',
            rollNo: '',
            newPassword1: '',
            newPassword2: '',
        });
    };

    return (
        <Box style={{ background: '#f7f7f7', minHeight: '100vh', padding: '20px' }}>
            <Flex justify="space-between" align="center" mb="20px" direction={{ base: 'column', sm: 'row' }}>
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
            </Flex>

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

                        <TextInput
                            label="New Password"
                            name="newPassword1"
                            type="password"
                            placeholder="Enter new password"
                            value={formData.newPassword1}
                            onChange={handleChange}
                            required
                        />

                        <TextInput
                            label="Confirm New Password"
                            name="newPassword2"
                            type="password"
                            placeholder="Confirm new password"
                            value={formData.newPassword2}
                            onChange={handleChange}
                            required
                        />

                        {errorMessage && (
                            <Text color="red" style={{ fontSize: '14px' }}>
                                {errorMessage}
                            </Text>
                        )}

                        <Button
                            style={{ background: '#F5B2B2', color: 'white' }}
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
