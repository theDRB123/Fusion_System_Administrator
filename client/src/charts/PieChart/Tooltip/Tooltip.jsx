import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const SimplePieChart = ( { data }) => {
    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx={200}
                cy={200}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

export default SimplePieChart;