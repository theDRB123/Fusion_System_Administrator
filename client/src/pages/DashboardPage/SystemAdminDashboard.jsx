import React from 'react';
import { StatsGrid } from '../../components/StatsGrid/StatsGrid';
import { StatsRing } from '../../components/StatsRing/StatsRing';
import { StatsControls } from '../../components/StatsControls/StatsControls';
import { FeaturesCards } from '../../components/FeaturesCards/FeaturesCards';
import { Container, Title, Space, SimpleGrid, Divider, Button, Flex } from '@mantine/core';
import { Simple } from '../../charts/BarChart/Simple/Simple';
import { Icon3dCubeSphere } from '@tabler/icons-react';

const SystemAdminDashboard = () => {
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
            <StatsGrid />

            <Space h="sm" />

            <Divider
                my="xs"
                // variant="dashed"
                labelPosition="center"
                label={
                    <>
                        <Icon3dCubeSphere size={12} />
                    </>
                }
            />

            {/* Quick Actions */}
            <FeaturesCards />

            {/* Spacing between sections */}
            <Space h="xl" />

            <Divider
                my="xs"
                // variant="dashed"
                labelPosition="center"
                label={
                    <>
                        <Icon3dCubeSphere size={12} />
                    </>
                }
            />

            <Space h="xl" />
            <Space h="xl" />

            <SimpleGrid
                cols={{ base: 1, md: 2 }}
                spacing={{ base: 10, sm: 'xl' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}
            >
                <Simple />
                <StatsControls />
            </SimpleGrid>

            <Space h="xl" />
            <Space h="xl" />

            <Divider
                my="xs"
                // variant="dashed"
                labelPosition="center"
                label={
                    <>
                        <Icon3dCubeSphere size={12} />
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
