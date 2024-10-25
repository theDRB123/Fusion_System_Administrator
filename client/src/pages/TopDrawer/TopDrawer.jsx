import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Drawer, Button, Flex, Menu, rem, ActionIcon } from '@mantine/core';
import { FaTrash, FaUser, FaExchangeAlt, FaCube, FaCircle, FaClone, FaArchive, FaUserCheck, FaUserPlus, FaUserEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function TopDrawer() {
    const [opened, { open, close, toggle }] = useDisclosure(false);
    const isSmallerScreen = useMediaQuery('(max-width: 768px)');
    const handleNavigate = useNavigate();
    const navigate = (redirect) => {
        handleNavigate(redirect);
        close();
    };

    // Alt + M to toggle drawer open/close
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.altKey && event.key === 'm') {
                toggle(); // Toggles between open and close
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener on unmount
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [toggle]);

    return (
        <>
            <Drawer
                mt={'1rem'}
                opened={opened}
                onClose={close}
                position="top"
                overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                size={isSmallerScreen ? "50%" : "35%"}
            >
                <Flex
                    direction={{ base: 'column' }}
                    gap={{ base: 'sm', sm: 'lg' }}
                    justify={{ sm: 'center' }}
                    align={{
                        sm: 'center'
                    }}
                >
                    <Button onClick={() => navigate('/')} leftSection={<FaCube size={18} />} fullWidth variant='light' color='orange' justify='center' size='lg'>Dashboard</Button>
                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        gap={{ base: 'sm', md: 'lg' }}
                        justify={{ sm: 'center' }}
                        align={{
                            sm: 'center'
                        }}
                        w="100%"
                    >
                        <Menu openDelay={100} closeDelay={50}>
                            <Menu.Target>
                                <Button leftSection={<FaUserCheck size={18} />} fullWidth variant='light' color='cyan' justify='center' size='lg' sx={{
                                    flexGrow: 1,
                                    flexBasis: '33%',
                                }}>User Management</Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Manage Users</Menu.Label>
                                <Menu.Item onClick={() => navigate('/UserManagement/CreateUser')} color='green' leftSection={<FaUserPlus style={{ width: rem(14), height: rem(14) }} />}>
                                    Create User
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item onClick={() => navigate('/UserManagement/ResetUserPassword')} color='violet' leftSection={<FaExchangeAlt style={{ width: rem(14), height: rem(14) }} />}>
                                    Reset User's Password
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                        <Menu openDelay={100} closeDelay={50}>
                            <Menu.Target>
                                <Button leftSection={<FaClone size={18} />} fullWidth variant='light' color='lime' justify='center' size='lg' sx={{
                                    flexGrow: 1,
                                    flexBasis: '33%',
                                }}>Role Management</Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Manage Roles</Menu.Label>
                                <Menu.Item onClick={() => navigate('/RoleManagement/CreateCustomRole')} color='green' leftSection={<FaCube style={{ width: rem(14), height: rem(14) }} />}>
                                    Create Custom Role
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item onClick={() => navigate('/RoleManagement/ManageRoleAccess')} color='indigo' leftSection={<FaCircle style={{ width: rem(14), height: rem(14) }} />}>
                                    Manage Role Access
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item onClick={() => navigate('/RoleManagement/EditUserRole')} color='orange' leftSection={<FaClone style={{ width: rem(14), height: rem(14) }} />}>
                                    Edit Role Access
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                        <Menu openDelay={100} closeDelay={50}>
                            <Menu.Target>
                                <Button leftSection={<FaArchive size={18} />} fullWidth variant='light' color='indigo' justify='center' size='lg' sx={{
                                    flexGrow: 1,
                                    flexBasis: '33%',
                                }}>Archive Management</Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Archive Management</Menu.Label>
                                <Menu.Item onClick={() => navigate('/archive/users')} color='green' leftSection={<FaArchive style={{ width: rem(14), height: rem(14) }} />}>
                                    Archive User
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item onClick={() => navigate('/archive/announcements')} color='orange' leftSection={<FaArchive style={{ width: rem(14), height: rem(14) }} />}>
                                    Archive Announcements
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item onClick={() => navigate('/archive/notifications')} color='indigo' leftSection={<FaArchive style={{ width: rem(14), height: rem(14) }} />}>
                                    Archive Notifications
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Flex>
                </Flex>
            </Drawer>

            <ActionIcon
                onClick={open}
                variant="filled"
                color="blue"
                radius="xl"
                size="xl"
                pos="fixed"
                right="2%"
            >
                <FaCube />
            </ActionIcon>
        </>
    );
}
