import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart } from '@mui/x-charts/PieChart';
import { retrieveTopSelling } from '../../State/Statistic/Action'; 

const BasicPie = () => {
    const dispatch = useDispatch();
    const { topSellingProducts, loading, error } = useSelector(state => state.statistics);

    useEffect(() => {
        dispatch(retrieveTopSelling());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;


    const pieData = Array.isArray(topSellingProducts?.data) ? topSellingProducts.data.map(item => ({
        id: item.productId.toString(),
        value: item.totalSold,
        label: item.productName
    })) : [];

    console.log("Pie data", topSellingProducts);

    return (
        <div className="flex flex-col l-0 h-full ">
            <div className='font-semibold text-center mb-10'>Top 3 sản phẩm bán chạy nhất</div>
            <div className="w-full flex justify-center l-0 mt-5">
                <PieChart
                    data={pieData} 
                    width={600}
                    height={250}
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
                    colors={['#FF6384', '#36A2EB', '#FFCE56']}
                />
            </div>
        </div>
    );
};

export default BasicPie;
