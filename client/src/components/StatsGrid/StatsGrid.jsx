import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import {
    FaUserAlt,          // Replace with Font Awesome icon for user
    FaCog,              // Replace with Font Awesome icon for settings
    FaArchive,          // Replace with Font Awesome icon for archive
    FaTrash,            // Replace with Font Awesome icon for delete
    FaVolumeUp,         // Replace with Font Awesome icon for speakerphone
    FaArrowUp,         // Replace with Font Awesome icon for up arrow
    FaArrowDown         // Replace with Font Awesome icon for down arrow
} from 'react-icons/fa'; // Import from react-icons
import classes from './StatsGrid.module.css';

const icons = {
    user: FaUserAlt,      // Use Font Awesome icon for user
    settings: FaCog,      // Use Font Awesome icon for settings
    arch: FaArchive,      // Use Font Awesome icon for archive
    del: FaTrash,         // Use Font Awesome icon for delete
    speakerPhone: FaVolumeUp, // Use Font Awesome icon for speakerphone
};

export function StatsGrid({ data }) {
    const stats = data.map((stat) => {
        const Icon = icons[stat.icon];
        const DiffIcon = stat.diff > 0 ? FaArrowUp : FaArrowDown; // Use Font Awesome arrows

        return (
            <Paper withBorder p="md" radius="md" key={stat.title}>
                <Group justify="space-between">
                    <Text size="xs" c="dimmed" className={classes.title}>
                        {stat.title}
                    </Text>
                    <Icon className={classes.icon} size="1.4rem" />
                </Group>

                <Group align="flex-end" gap="xs" mt={25}>
                    <Text className={classes.value}>{stat.value}</Text>
                </Group>

                <Text fz="xs" c="dimmed" mt={7}>
                    <Text className={classes.time}>{stat.time}</Text>
                </Text>
            </Paper>
        );
    });
    return (
        <div className={classes.root}>
            <SimpleGrid cols={{ base: 1, xs: 2, md: data.length }}>{stats}</SimpleGrid>
        </div>
    );
}
