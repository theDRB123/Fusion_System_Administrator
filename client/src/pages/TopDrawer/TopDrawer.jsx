import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Drawer, Button, Flex, Menu, rem, ActionIcon } from '@mantine/core';
import {
    IconTrash,
    IconUser,
    IconExchange,
    IconCube,
    IconSphere,
    IconCone,
    IconArchive,
    IconUserFilled,
    IconConeFilled,
    IconArchiveFilled,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function TopDrawer() {
    const [opened, { open, close, toggle }] = useDisclosure(false);
    const isSmallerScreen = useMediaQuery('(max-width: 768px)');
    const handleNavigate = useNavigate();
    const navigate = (redirect) => {
        handleNavigate(redirect);
        close()
    }    

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
                    <Button onClick={() => navigate('/')} leftSection={<IconCube size={18} />} fullWidth variant='light' color='orange' justify='center' size='lg'>Dashboard</Button>
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
                                <Button leftSection={<IconUserFilled size={18} />} fullWidth variant='light' color='cyan' justify='center' size='lg' sx={{
                                    flexGrow: 1,
                                    flexBasis: '33%',
                                }}>User Management</Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Manage Users</Menu.Label>
                                <Menu.Item onClick={() =>  navigate('/UserManagement/CreateUser')} color='green' leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}>
                                    Create User
                                </Menu.Item>
                                <Menu.Divider />
                                {/* <Menu.Item onClick={() => navigate('/UserManagement/DeleteUser')} color='red' leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}>
                                    Delete User
                                </Menu.Item> */}
                                <Menu.Divider />
                                <Menu.Item onClick={() => navigate('/UserManagement/ResetUserPassword')} color='violet' leftSection={<IconExchange style={{ width: rem(14), height: rem(14) }} />}>
                                    Reset User's Password
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                        <Menu openDelay={100} closeDelay={50}>
                            <Menu.Target>
                                <Button leftSection={<IconConeFilled size={18} />} fullWidth variant='light' color='lime' justify='center' size='lg' sx={{
                                    flexGrow: 1,
                                    flexBasis: '33%',
                                }}>Role Management</Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Manage Roles</Menu.Label>
                                <Menu.Item onClick={() => navigate('/RoleManagement/CreateCustomRole')} color='green' leftSection={<IconCube style={{ width: rem(14), height: rem(14) }} />}>
                                    Create Custom Role
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item onClick={() => navigate('/RoleManagement/ManageRoleAccess')} color='indigo' leftSection={<IconSphere style={{ width: rem(14), height: rem(14) }} />}>
                                    Manage Role Access
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item onClick={() => navigate('/RoleManagement/EditUserRole')} color='orange' leftSection={<IconCone style={{ width: rem(14), height: rem(14) }} />}>
                                    Edit Role Access
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                        <Menu openDelay={100} closeDelay={50}>
                            <Menu.Target>
                                <Button leftSection={<IconArchiveFilled size={18} />} fullWidth variant='light' color='indigo' justify='center' size='lg' sx={{
                                    flexGrow: 1,
                                    flexBasis: '33%',
                                }}>Archive Management</Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Archive Management</Menu.Label>
                                <Menu.Item onClick={() => navigate('/archive/users')} color='green' leftSection={<IconArchive style={{ width: rem(14), height: rem(14) }} />}>
                                    Archive User
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item onClick={() => navigate('/archive/announcements')} color='orange' leftSection={<IconArchive style={{ width: rem(14), height: rem(14) }} />}>
                                    Archive Announcements
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item onClick={() => navigate('/archive/notifications')} color='indigo' leftSection={<IconArchive style={{ width: rem(14), height: rem(14) }} />}>
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
                <IconCube />
            </ActionIcon>
        </>
    );
}
