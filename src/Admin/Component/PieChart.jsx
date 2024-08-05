import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart } from '@mui/x-charts/PieChart';
import { retrieveTopSelling } from '../../State/Statistic/Action'; // Update the path as needed

const BasicPie = () => {
    const dispatch = useDispatch();
    const { topSellingProducts, loading, error } = useSelector(state => state.statistics);

    useEffect(() => {
        dispatch(retrieveTopSelling());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    // Check if topSelling is defined and is an array
    const pieData = Array.isArray(topSellingProducts?.data) ? topSellingProducts.data.map(item => ({
        id: item.productId.toString(), // Convert productId to string
        value: item.totalSold,
        label: item.productName
    })) : [];

    console.log("Pie data", topSellingProducts);

    return (
        <div className="flex flex-col items-center justify-center h-full ">
            <div className='font-semibold text-center mb-10'>Top 3 sản phẩm bán chạy nhất</div>
            <div className="w-full flex justify-center mt-10">
                <PieChart
                    data={pieData} // Pass the data directly
                    width={600}
                    height={200}
                    series={[{ 
                        data: pieData,
                        label: {
                            position: 'outside',
                            connector: true,
                            style: {
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: '#333',
                                right: 0,
                            },
                        },
                    }]}
                    colors={['#FF6384', '#36A2EB', '#FFCE56']} // Custom color palette
                />
            </div>
        </div>
    );
};

export default BasicPie;
