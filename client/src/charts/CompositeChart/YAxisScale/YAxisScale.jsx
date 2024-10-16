import { CompositeChart } from '@mantine/charts';
import { data } from './data';

export function YAxisChart() {
    return (
        <CompositeChart
            h={300}
            data={data}
            dataKey="date"
            yAxisProps={{ domain: [0, 100] }}
            series={[{ name: 'Apples', color: 'indigo.6', type: 'area' }]}
        />
    );
}