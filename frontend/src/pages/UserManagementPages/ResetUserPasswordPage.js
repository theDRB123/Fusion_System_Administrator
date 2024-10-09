import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    Flex,
    Input,
    Text,
    VStack,
    FormControl,
    FormLabel,
    useToast,
    useBreakpointValue,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';

const ResetUserPasswordPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        rollNo: '',
        newPassword1: '',
        newPassword2: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef();
    const toast = useToast();

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
        } else {
            setIsOpen(true); // Open confirmation dialog if passwords match
        }
    };

    const handleSubmit = () => {
        // Close the modal
        setIsOpen(false);

        // Logic to handle form submission (e.g., send password reset request to server)
        console.log('Reset Password for:', formData);

        toast({
            title: 'Password Reset',
            description: `Password for ${formData.name} has been reset successfully.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
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
        <Box bg="gray.100" minHeight="100vh" p={5}>
             <Flex justify="space-between" align="center" mb={5} flexDirection={['column', 'row']}>
                <Box
                    p={[2, 4]}
                    bgGradient="linear(to-r, lightcoral, lightyellow)"
                    borderRadius="lg"
                    shadow="md"
                    mb={[4, 0]}
                >
                    <Text
                        fontSize={['xl', '2xl', '3xl']} // Responsive font size
                        fontWeight="bold"
                        color="white"
                        textAlign={['center', 'left']}
                    >
                        Reset Password
                    </Text>
                </Box>
            

            {/* <SimpleGrid columns={[1, 2]} spacing={4} textAlign="center" mb={5}>
                <Box>
                    <Text fontSize={['md', 'lg']} fontWeight="bold">Total Roles</Text>
                    <Text fontSize={['lg', 'xl']}>{totalRoles}</Text>
                </Box>
                <Box>
                    <Text fontSize={['md', 'lg']} fontWeight="bold">Roles Created This Year</Text>
                    <Text fontSize={['lg', 'xl']}>{rolesCreatedThisYear}</Text>
                </Box>
            </SimpleGrid> */}
            </Flex>

            <Box
                bg="white"
                p={useBreakpointValue({ base: 5, lg: 8 })} // Padding adjusts for screen size
                rounded="md"
                shadow="md"
                width={{ base: '100%', lg: '50%' }} // Full width on smaller screens, half on larger
                mx="auto" // Center the form horizontally
            >
                <form>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                name="name"
                                placeholder="Enter user name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Roll Number</FormLabel>
                            <Input
                                name="rollNo"
                                placeholder="Enter roll number"
                                value={formData.rollNo}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>New Password</FormLabel>
                            <Input
                                name="newPassword1"
                                type="password"
                                placeholder="Enter new password"
                                value={formData.newPassword1}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Confirm New Password</FormLabel>
                            <Input
                                name="newPassword2"
                                type="password"
                                placeholder="Confirm new password"
                                value={formData.newPassword2}
                                onChange={handleChange}
                            />
                        </FormControl>

                        {errorMessage && (
                            <Text color="red.500" fontSize="sm" alignSelf="flex-start">
                                {errorMessage}
                            </Text>
                        )}

                        <Button 
                            bg="#F5B2B2" 
                            color="white" 
                            _hover={{ bg: "#E78C8C" }} 
                            onClick={openConfirmationDialog} 
                            width="full"
                        >
                            Reset Password
                        </Button>
                    </VStack>
                </form>
            </Box>

            {/* Confirmation Modal */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Confirm Password Reset
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to reset the password for {formData.name}?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue" onClick={handleSubmit} ml={3}>
                                Confirm
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};

export default ResetUserPasswordPage;
