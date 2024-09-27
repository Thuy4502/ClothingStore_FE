import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { retrieveMonthlyRevenue } from "../../State/Statistic/Action";

const ColumnChartStatistics = () => {
    const dispatch = useDispatch();
    const { monthlyRevenue, loading, error } = useSelector(store => store.statistics);
    const [selectedYear, setSelectedYear] = useState(2024);

    useEffect(() => {
        dispatch(retrieveMonthlyRevenue(selectedYear));
    }, [selectedYear, dispatch]);

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    const transformedData = monthlyRevenue?.data || [];

    return (
        <div className="h-[24rem] bg-white p-4 rounded-md border border-gray-200 flex flex-col flex-1">
            <strong className="text-sub font-semibold">Thống kê doanh thu</strong>
            <div className="flex justify-end items-start mt-3">
                <label htmlFor="yearSelect" className="mr-2 font-RobotoMedium">Choose year:</label>
                <select id="yearSelect" value={selectedYear} onChange={handleYearChange} className="rounded-md font-RobotoMedium focus:border-none">
                    <option value={2020}>2020</option>
                    <option value={2021}>2021</option>
                    <option value={2022}>2022</option>
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                </select>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-full">Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="w-full mt-3 flex-1 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={500} height={300} data={transformedData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="totalRevenue" fill="#880E0E" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default ColumnChartStatistics;
