import { BarChart } from '@mantine/charts';
import { data } from './data';
import { Title } from '@mantine/core'; // Import for heading

export function Simple() {
    return (
        <div>
            {/* Heading */}
            <Title order={2} align="center" mt="md" mb="lg">
                User Role Distribution by Year
            </Title>

            {/* BarChart */}
            <BarChart
                h={250}
                data={data}
                dataKey="year"
                series={[
                    { name: 'Students', color: 'violet.6' },
                    { name: 'Professors', color: 'blue.6' },
                    { name: 'Others', color: 'teal.6' },
                ]}
                tickLine="y"
                styles={{
                    bar: {
                        transition: '0.3s', // Add smooth transition for hover
                        '&:hover': {
                            fillOpacity: 0.8, // Make it slightly transparent on hover
                        },
                    },
                }}
            />
        </div>
    );
}
