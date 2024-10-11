import { useState } from 'react';
import dayjs from 'dayjs';
import { UnstyledButton, Text, Paper, Group, rem } from '@mantine/core';
import {
    IconArchive,
    IconUserBolt,
    IconUserCheck,
    IconChevronDown,
    IconChevronUp,
    IconSettings,
} from '@tabler/icons-react';
import classes from './StatsControls.module.css';

const data = [
    { icon: IconUserCheck, label: 'Users Created' },
    { icon: IconArchive, label: 'Users Archived' },
    { icon: IconSettings, label: 'Roles Created' },
];

export function StatsControls() {
    const [date, setDate] = useState(new Date(2024, 9, 11));

    const stats = data.map((stat) => (
        <Paper className={classes.stat} radius="md" shadow="md" p="xs" key={stat.label}>
            <stat.icon
                style={{ width: rem(32), height: rem(32) }}
                className={classes.icon}
                stroke={1.5}
            />
            <div>
                <Text fz="sm" className={classes.label}>{stat.label}</Text>
                <Text fz="xl" className={classes.count}>
                    <span className={classes.value}>{Math.floor(Math.random() * 6 + 4)}</span>
                </Text>
            </div>
        </Paper>
    ));

    return (
        <div className={classes.root}>
            <div className={classes.controls}>
                <UnstyledButton
                    className={classes.control}
                    onClick={() => setDate((current) => dayjs(current).add(1, 'day').toDate())}
                >
                    <IconChevronUp
                        style={{ width: rem(16), height: rem(16) }}
                        className={classes.controlIcon}
                        stroke={1.5}
                    />
                </UnstyledButton>

                <div className={classes.date}>
                    <Text className={classes.day}>{dayjs(date).format('DD')}</Text>
                    <Text className={classes.month}>{dayjs(date).format('MMMM')}</Text>
                </div>

                <UnstyledButton
                    className={classes.control}
                    onClick={() => setDate((current) => dayjs(current).subtract(1, 'day').toDate())}
                >
                    <IconChevronDown
                        style={{ width: rem(16), height: rem(16) }}
                        className={classes.controlIcon}
                        stroke={1.5}
                    />
                </UnstyledButton>
            </div>
            <Group style={{ flex: 1 }}>{stats}</Group>
        </div>
    );
}