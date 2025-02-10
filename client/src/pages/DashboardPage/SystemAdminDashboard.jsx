import React from 'react';
import { StatsGrid } from '../../components/StatsGrid/StatsGrid';
import { StatsRing } from '../../components/StatsRing/StatsRing';
import { StatsControls } from '../../components/StatsControls/StatsControls';
import { FeaturesCards } from '../../components/FeaturesCards/FeaturesCards';
import { Container, Title, Space, SimpleGrid, Divider, Button, Flex } from '@mantine/core';
import { FaCube } from 'react-icons/fa';
import { useForm } from '@mantine/form';

const SystemAdminDashboard = () => {
    const form = useForm({
        initialValues: {
            dashboardStats: [
                { title: 'Total Users', icon: 'user', value: '5,173', diff: 34, time: "in last year" },
                { title: 'Total Roles', icon: 'settings', value: '56', diff: -13, time: "in last year" },
                { title: 'Archived Users', icon: 'arch', value: '573', diff: -30, time: "in last year" },
                { title: 'Deleted Users', icon: 'del', value: '2,543', diff: 18, time: "in last year" },
            ]
        }
    });

    return (
        <Container fluid my="md">
            {/* Heading */}
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
                        Dashboard
                    </Title>
                </Button>
            </Flex>

            {/* Stats */}
            <StatsGrid data={form.values.dashboardStats} />

            <Space h="sm" />

            <Divider
                my="xs"
                labelPosition="center"
                label={
                    <>
                        <FaCube size={12} />
                    </>
                }
            />

            {/* Quick Actions */}
            <FeaturesCards />

            {/* Spacing between sections */}
            <Space h="xl" />

            <Divider
                my="xs"
                labelPosition="center"
                label={
                    <>
                        <FaCube size={12} />
                    </>
                }
            />

            <Space h="xl" />
            <Space h="xl" />

            <SimpleGrid
                cols={{ base: 1 }}
                mx={'auto'}
                w={{ base: '95%', xl: '65%' }}
                maw={'1200px'}
                spacing={{ base: 10, sm: 'xl' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}
            >
                <StatsControls />
            </SimpleGrid>

            <Space h="xl" />
            <Space h="xl" />

            <Divider
                my="xs"
                labelPosition="center"
                label={
                    <>
                        <FaCube size={12} />
                    </>
                }
            />

            <Space h="xl" />

            {/* Recent Actions */}
            <StatsRing />
        </Container>
    );
};

export default SystemAdminDashboard;
