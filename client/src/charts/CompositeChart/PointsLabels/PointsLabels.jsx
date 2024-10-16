import { CompositeChart } from '@mantine/charts';
import { data } from './data';

export function PointsLabels() {
    return (
        <CompositeChart
            h={300}
            data={data}
            dataKey="date"
            withPointLabels
            series={[
                { name: 'Tomatoes', color: 'rgba(18, 120, 255, 0.2)', type: 'bar' },
                { name: 'Apples', color: 'red.8', type: 'line' },
                { name: 'Oranges', color: 'yellow.8', type: 'area' },
            ]}
        />
    );
}