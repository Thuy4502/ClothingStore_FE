import React from 'react'
import Grid from '@mui/material/Grid';
import Achivement from './Achivement';
import PieChar from './PieChart';
import Header from './Header';
import ColumnChartStatistics from './ColumnChartStatistics';
import Box from '@mui/material/Box';






const Dashboard = () => {
  return (
    <div className='bg-[#f0ece2] h-[100vh]'>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Box px={2} py={4}> {/* Padding added for spacing */}
        <Grid container spacing={3} className='mb-10'>
          <Grid item xs={12} className="mb-10">
            <Achivement />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 8 }}>
          <Grid item xs={12} md={5.5} className="flex justify-start bg-white rounded-md" sx={{ ml: 8, mr: 2 }}>
            {/* Adjust ml and mr for spacing */}
            <ColumnChartStatistics />
          </Grid>
          <Grid
            item
            xs={12}
            md={5.5}
            className="flex justify-starr bg-white rounded-md"
            sx={{ ml: 0, display: 'flex',  alignItems: 'center' }}
          >
            {/* Adjust ml and mr for spacing */}
            <PieChar />
          </Grid>

        </Grid>
      </Box>
    </div>
  );
};



export default Dashboard