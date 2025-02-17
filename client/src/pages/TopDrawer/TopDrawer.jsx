import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Drawer, Button, Flex, Menu, rem, ActionIcon } from '@mantine/core';
import {
    FaTrash,
    FaUser,
    FaExchangeAlt,
    FaCube,
    FaCircle,
    FaClone,
    FaArchive,
    FaUserAlt,
    FaSignOutAlt,
    FaClone as FaCloneFilled,
    FaArchive as FaArchiveFilled,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '@mantine/core';

export default function TopDrawer() {
    const [opened, { open, close, toggle }] = useDisclosure(false);
    const isSmallerScreen = useMediaQuery('(max-width: 768px)');
    const handleNavigate = useNavigate();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [roleMenuOpened, setRoleMenuOpened] = useState(false);
    const [archiveMenuOpened, setArchiveMenuOpened] = useState(false);
    const [logoutConfirm, setLogoutConfirm] = useState(false);
    
    const navigate = (redirect) => {
        handleNavigate(redirect);
        close();
    };

    const { logout } = useAuth();

    // Keydown handling for toggling drawer and menus
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.altKey) {
                switch (event.key.toLowerCase()) {
                    case 'm':
                        toggle(); // Toggle the drawer
                        break;
                    case 'u':
                        setUserMenuOpened((prev) => !prev); // Toggle User Management menu
                        break;
                    case 'r':
                        setRoleMenuOpened((prev) => !prev); // Toggle Role Management menu
                        break;
                    case 'a':
                        setArchiveMenuOpened((prev) => !prev); // Toggle Archive Management menu
                        break;
                    default:
                        break;
                }
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
                    align={{ sm: 'center' }}
                >
                    <Button
                        onClick={() => navigate('/')}
                        leftSection={<FaCube size={18} />}
                        fullWidth
                        variant="light"
                        color="orange"
                        justify="center"
                        size="lg"
                    >
                        Dashboard
                    </Button>
                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        gap={{ base: 'sm', md: 'lg' }}
                        justify={{ sm: 'center' }}
                        align={{ sm: 'center' }}
                        w="100%"
                    >
                        <Menu
                            openDelay={100}
                            closeDelay={50}
                            opened={userMenuOpened}
                            onClose={() => setUserMenuOpened(false)}
                        >
                            <Menu.Target>
                                <Button
                                    leftSection={<FaUserAlt size={18} />}
                                    fullWidth
                                    variant="light"
                                    color="cyan"
                                    justify="center"
                                    size="lg"
                                    onClick={() => setUserMenuOpened((prev) => !prev)}
                                >
                                    User Management
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Manage Users</Menu.Label>
                                <Menu.Item
                                    onClick={() => navigate('/UserManagement/CreateStudent')}
                                    color="pink"
                                    leftSection={<FaUser style={{ width: rem(14), height: rem(14) }} />}
                                >
                                    Add Student
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    onClick={() => navigate('/UserManagement/CreateFaculty')}
                                    color="grape"
                                    leftSection={<FaUser style={{ width: rem(14), height: rem(14) }} />}
                                >
                                    Add Faculty
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    onClick={() => navigate('/UserManagement/CreateStaff')}
                                    color="teal"
                                    leftSection={<FaUser style={{ width: rem(14), height: rem(14) }} />}
                                >
                                    Add Staff
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    onClick={() => navigate('/UserManagement/ResetUserPassword')}
                                    color="violet"
                                    leftSection={<FaExchangeAlt style={{ width: rem(14), height: rem(14) }} />}
                                >
                                    Reset User's Password
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                        <Menu
                            openDelay={100}
                            closeDelay={50}
                            opened={roleMenuOpened}
                            onClose={() => setRoleMenuOpened(false)}
                        >
                            <Menu.Target>
                                <Button
                                    leftSection={<FaCloneFilled size={18} />}
                                    fullWidth
                                    variant="light"
                                    color="lime"
                                    justify="center"
                                    size="lg"
                                    onClick={() => setRoleMenuOpened((prev) => !prev)}
                                >
                                    Role Management
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Manage Roles</Menu.Label>
                                <Menu.Item
                                    onClick={() => navigate('/RoleManagement/CreateCustomRole')}
                                    color="green"
                                    leftSection={<FaCube style={{ width: rem(14), height: rem(14) }} />}
                                >
                                    Create Custom Role
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    onClick={() => navigate('/RoleManagement/ManageRoleAccess')}
                                    color="indigo"
                                    leftSection={<FaCircle style={{ width: rem(14), height: rem(14) }} />}
                                >
                                    Manage Role Access
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    onClick={() => navigate('/RoleManagement/EditUserRole')}
                                    color="orange"
                                    leftSection={<FaClone style={{ width: rem(14), height: rem(14) }} />}
                                >
                                    Edit Role Access
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                        <Menu
                            openDelay={100}
                            closeDelay={50}
                            opened={archiveMenuOpened}
                            onClose={() => setArchiveMenuOpened(false)}
                        >
                            <Menu.Target>
                                <Button
                                    leftSection={<FaArchiveFilled size={18} />}
                                    fullWidth
                                    variant="light"
                                    color="indigo"
                                    justify="center"
                                    size="lg"
                                    onClick={() => setArchiveMenuOpened((prev) => !prev)}
                                >
                                    Archive Management
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Archive Management</Menu.Label>
                                <Menu.Item
                                    onClick={() => navigate('/archive/users')}
                                    color="green"
                                    leftSection={<FaArchive style={{ width: rem(14), height: rem(14) }} />}
                                >
                                    Archive User
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    onClick={() => navigate('/archive/announcements')}
                                    color="orange"
                                    leftSection={<FaArchive style={{ width: rem(14), height: rem(14) }} />}
                                >
                                    Archive Announcements
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    onClick={() => navigate('/archive/notifications')}
                                    color="indigo"
                                    leftSection={<FaArchive style={{ width: rem(14), height: rem(14) }} />}
                                >
                                    Archive Notifications
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Flex>
                    <Button
                        onClick={() => {
                            setLogoutConfirm(true);
                        }}//        logout(); navigate('/') }}
                        leftSection={<FaSignOutAlt size={18} />}

                        variant="light"
                        color="red"
                        justify="center"
                        size="lg">
                        Log Out
                    </Button>
                </Flex>
            </Drawer>

            {logoutConfirm && (
                <Modal opened={logoutConfirm} onClose={() => setLogoutConfirm(false)} title="Confirm Logout">
                    <p>Are you sure you want to log out?</p>
                    <Flex justify="flex-end" gap="sm" mt="md">
                        <Button
                            variant="outline"
                            color="blue"
                            onClick={() => setLogoutConfirm(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="filled"
                            color="red"
                            onClick={() => {
                                logout();
                                navigate('/');
                            }}
                        >
                            Log Out
                        </Button>
                    </Flex>
                </Modal>
            )}
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
