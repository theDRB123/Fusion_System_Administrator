import { Group, Text } from '@mantine/core';
import { PieChart } from '@mantine/charts';
import { data } from './data';

export function TooltipChart() {
    return (
        <Group gap={50}>
            <div>
                <Text fz="xs" mb="sm" ta="center">
                    Data only for hovered segment
                </Text>
                <PieChart data={data} withTooltip tooltipDataSource="segment" mx="auto" />
            </div>
        </Group>
    );
}