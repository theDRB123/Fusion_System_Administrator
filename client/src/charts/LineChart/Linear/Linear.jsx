import { LineChart } from '@mantine/charts';
import { data } from './data';

export function Linear() {
    return (
        <LineChart
            h={300}
            data={data}
            dataKey="date"
            series={[{ name: 'Users', color: 'indigo.6' }]}
            curveType="linear"
            connectNulls
        />
    );
}