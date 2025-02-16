import {
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
    useMantineTheme,
    Menu,
    Button,
} from '@mantine/core';
import { FaUser, FaArchive, FaStar, FaCog, FaTrashAlt, FaComments } from 'react-icons/fa'; // Import Font Awesome icons
import { useNavigate } from 'react-router-dom'; // Import navigation hook
import classes from './FeaturesCards.module.css';

// Mock data for features with menu items and routes
const mockdata = [
    {
        title: 'Manage Users',
        description: 'Create a User, Delete a User & Reset the Password of a User.',
        icon: FaUser, // Replace with Font Awesome icon
        menuItems: [
            { label: 'Create Student', icon: FaUser, color: 'pink', route: '/UserManagement/CreateStudent' },
            { label: 'Create Faculty', icon: FaUser, color: 'grape', route: '/UserManagement/CreateFaculty' },
            { label: 'Create Staff', icon: FaUser, color: 'green', route: '/UserManagement/CreateStaff' },
            { label: 'Reset Password', icon: FaComments, color: 'blue', route: '/UserManagement/ResetUserPassword' },
        ],
    },
    {
        title: 'Manage Roles',
        description: 'Create a Custom Role, Manage Role Access & Edit Role Access.',
        icon: FaStar, // Replace with Font Awesome icon
        menuItems: [
            { label: 'Create Custom Role', icon: FaCog, color: 'green', route: '/RoleManagement/CreateCustomRole' },
            { label: 'Manage Role Access', icon: FaCog, color: 'orange', route: '/RoleManagement/ManageRoleAccess' },
            { label: 'Edit Role Access', icon: FaCog, color: 'blue', route: '/RoleManagement/EditUserRole' },
        ],
    },
    {
        title: 'Archive Management',
        description: 'Archive Users, Announcements & Notifications.',
        icon: FaArchive, // Replace with Font Awesome icon
        menuItems: [
            { label: 'Archive Users', icon: FaArchive, color: 'green', route: '/archive/users' },
            { label: 'Archive Announcements', icon: FaArchive, color: 'orange', route: '/archive/announcements' },
            { label: 'Archive Notifications', icon: FaArchive, color: 'blue', route: '/archive/notifications' },
        ],
    },
];

export function FeaturesCards() {
    const theme = useMantineTheme();
    const navigate = useNavigate(); // Initialize the navigation hook

    const features = mockdata.map((feature) => (
        <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
            {/* Card Content */}
            <feature.icon style={{ width: rem(50), height: rem(50), color: theme.colors.blue[6] }} />
            <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                {feature.title}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
                {feature.description}
            </Text>

            {/* Menu Integration */}
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <Button variant="light" mt="md">Actions</Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>Options</Menu.Label>
                    {feature.menuItems.map((item, index) => (
                        <Menu.Item
                            key={index}
                            color={item.color || 'black'}
                            leftSection={<item.icon style={{ width: rem(14), height: rem(14) }} />}
                            onClick={() => navigate(item.route)} // Navigate to the respective route
                        >
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </Card>
    ));

    return (
        <Container size="lg" py="xl">
            <Group justify="center">
                <Badge variant="filled" size="lg">
                    Fusion System Admin
                </Badge>
            </Group>

            <Title order={2} className={classes.title} ta="center" mt="sm">
                Quick Actions
            </Title>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
                {features}
            </SimpleGrid>
        </Container>
    );
}
