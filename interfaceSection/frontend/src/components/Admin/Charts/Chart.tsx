import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
const Chart = () => {
    type SalesMonth = {
        month: string;
        revenue: number;
    };
    const salesData: Record<number, SalesMonth[]> = {
        2022: [
            { month: '1', revenue: 1000 },
            { month: '2', revenue: 1500 },
            { month: '3', revenue: 700 },
            { month: '4', revenue: 1200 },
            { month: '5', revenue: 2100 },
            { month: '6', revenue: 1400 },
            { month: '7', revenue: 1600 },
            { month: '8', revenue: 2300 },
            { month: '9', revenue: 1900 },
            { month: '10', revenue: 1700 },
            { month: '11', revenue: 2000 },
            { month: '12', revenue: 2200 },
        ],
        2023: [
            { month: '1', revenue: 1200 },
            { month: '2', revenue: 2100 },
            { month: '3', revenue: 800 },
            { month: '4', revenue: 1600 },
            { month: '5', revenue: 2400 },
            { month: '6', revenue: 1800 },
            { month: '7', revenue: 2000 },
            { month: '8', revenue: 2700 },
            { month: '9', revenue: 2200 },
            { month: '10', revenue: 1900 },
            { month: '11', revenue: 2300 },
            { month: '12', revenue: 2500 },
        ],
        2024: [
            { month: '1', revenue: 1300 },
            { month: '2', revenue: 1800 },
            { month: '3', revenue: 900 },
            { month: '4', revenue: 1700 },
            { month: '5', revenue: 2500 },
            { month: '6', revenue: 1900 },
            { month: '7', revenue: 2100 },
            { month: '8', revenue: 2800 },
            { month: '9', revenue: 2300 },
            { month: '10', revenue: 2000 },
            { month: '11', revenue: 2400 },
            { month: '12', revenue: 2600 },
        ],
        2025: [
            { month: '1', revenue: 1400 },
            { month: '2', revenue: 1700 },
            { month: '3', revenue: 2540 },
            { month: '4', revenue: 230 },
            { month: '5', revenue: 0 },
            { month: '6', revenue: 0 },
            { month: '7', revenue: 0 },
            { month: '8', revenue: 0 },
            { month: '9', revenue: 0 },
            { month: '10', revenue: 0 },
            { month: '11', revenue: 0 },
            { month: '12', revenue: 0 },
        ]
    };

    const [selectedYear, setSelectedYear] = useState<number>(2025);
    const data = salesData[selectedYear];

    const formatVND = (value: number) => {
        if (value >= 1000) {
            return `${(value / 1000).toFixed(1)} triệu`;
        }
        return `${value.toLocaleString()}`;
    };

    const formatVND2 = (value: number) => {
        if (value >= 1000) {
            return `${(value / 1000).toFixed(1)} triệu VND`;
        }
        return `${value.toLocaleString()} VND`;
    };


    // daily sale
    const dailySalesData: Record<string, number> = {
        '2025-04-01': 2500000,
        '2025-04-02': 3200000,
        '2025-04-03': 1800000,
        '2025-04-04': 2750000,
        '2025-04-07': 750000,
        '2025-04-08': 250000,
    };



    const getToday = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // "2025-04-06"
    };

    const [selectedDate, setSelectedDate] = useState<string>(getToday());
    const [dailyRevenue, setDailyRevenue] = useState<number | null>(null);

    useEffect(() => {
        // Lấy doanh thu theo ngày mặc định ban đầu
        setDailyRevenue(dailySalesData[selectedDate] ?? null);
    }, [selectedDate]);

    return (
        <div className='w-full p-4 bg-gray-100 dark:bg-gray-900'>
            {/* <div className="flex items-center justify-center gap-4 mt-16">
                <div className='flex gap-4 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="date" className="text-xl font-medium">
                            Ngày:
                        </label>
                        <input
                            type="date"
                            id="date"
                            className="border rounded-md px-2 py-1 w-36 text-blue-600 dark:bg-gray-800"
                            value={selectedDate}
                            onChange={(e) => {
                                const date = e.target.value;
                                setSelectedDate(date);
                                setDailyRevenue(dailySalesData[date] ?? null);
                            }}
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="date" className="text-xl font-medium">
                            Doanh thu:
                        </label>
                        <p className="text-lg text-blue-600">
                            {dailyRevenue !== null ? formatVND2(dailyRevenue) : "Không có số liệu"}
                        </p>
                    </div>
                </div>
            </div> */}

            <div className="mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow mt-16 pt-3">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Doanh thu hàng tháng - {selectedYear}
                </h2>

                <div className="flex justify-center gap-2 mb-6">
                    {Object.keys(salesData).map((year) => (

                        <button
                            key={year}
                            onClick={() => setSelectedYear(+year)}
                            className={`px-4 py-2 rounded-md border text-sm font-medium ${+year === selectedYear
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-100'
                                }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>

                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month">
                            <Label value="Tháng" offset={-10} position="insideBottomRight" style={{ fill: '#2563eb', fontWeight: 'bold' }} />
                        </XAxis>
                        <YAxis tickFormatter={formatVND}>
                            <Label
                                value="VND"
                                angle={0}
                                position="top"
                                offset={10}
                                style={{ textAnchor: 'middle', fill: '#2563eb', fontWeight: 'bold' }}
                            />
                        </YAxis>
                        <Tooltip
                            content={({ payload }) => {
                                if (payload && payload.length > 0 && typeof payload[0].value === 'number') {
                                    return (
                                        <div className="bg-white p-2 rounded shadow">
                                            <p className="text-sm font-medium dark:text-black">Tháng: {payload[0].payload.month}</p>
                                            <p className="text-sm font-medium dark:text-black">Doanh thu: {formatVND2(payload[0].value)}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>

                <div className="flex items-center justify-center gap-4">
                    <div className='flex gap-4 bg-white dark:bg-gray-800 rounded-2xl p-3'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="date" className="text-xl font-medium">
                                Ngày:
                            </label>
                            <input
                                type="date"
                                id="date"
                                className="border rounded-md px-2 py-1 w-36 text-blue-600 dark:bg-gray-800"
                                value={selectedDate}
                                onChange={(e) => {
                                    const date = e.target.value;
                                    setSelectedDate(date);
                                    setDailyRevenue(dailySalesData[date] ?? null);
                                }}
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="date" className="text-xl font-medium">
                                Doanh thu:
                            </label>
                            <p className="text-lg text-blue-600">
                                {dailyRevenue !== null ? formatVND2(dailyRevenue) : "Không có số liệu"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Chart;