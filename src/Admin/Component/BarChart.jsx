import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
// import { dataset } from '../dataset/weather';

const chartSetting = {
  xAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 500,
  height: 400,
};



const valueFormatter = (value) => `${value}mm`;

// Sample data for the bar chart
export const dataset = [
  { month: 'January', seoul: 50 },
  { month: 'February', seoul: 60 },
  { month: 'March', seoul: 70 },
  { month: 'April', seoul: 80 },
  { month: 'May', seoul: 90 },
  { month: 'June', seoul: 100 },
  { month: 'July', seoul: 120 },
  { month: 'August', seoul: 130 },
  { month: 'September', seoul: 110 },
  { month: 'October', seoul: 80 },
  { month: 'November', seoul: 60 },
  { month: 'December', seoul: 50 },
];


export default function GridDemo() {
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[{ dataKey: 'seoul', label: 'Seoul rainfall', valueFormatter }]}
      layout="horizontal"
      grid={{ vertical: true }}
      {...chartSetting}
    />
  );
}
