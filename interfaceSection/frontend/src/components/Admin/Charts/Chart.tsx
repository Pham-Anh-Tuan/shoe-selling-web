import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { dashboardApi, orderApi } from '../../../api-client/api';
import formatCurrencyVND from '../../../hooks/FormatCurrency';

const cards = [
    {
        label: "Tổng số sản phẩm",
        value: "345,768",
        change: "+ 8%",
        isIncrease: true,
    },
    {
        label: "Số đơn hàng đã giao",
        value: "31,385",
        change: "+ 12,4",
        isIncrease: true,
    },
    {
        label: "Số sản phẩm bán ra",
        value: "27,274",
        change: "- 3,7",
        isIncrease: false,
    },
    {
        label: "Số sản phẩm trả về",
        value: "3,506",
        change: "- 12,4",
        isIncrease: false,
    },
];
const Chart = () => {
    type SalesMonth = {
        month: string;
        revenue: number;
    };

    interface SummaryData {
        totalProductQuantity: number;
        deliveredOrderCount: number;
        soldProductCount: number;
        returnedProductCount: number;
    }

    const [summaryData, setSummaryData] = useState<SummaryData | null>(null);

    const [availableYears, setAvailableYears] = useState<number[]>([]);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [monthlyRevenue, setMonthlyRevenue] = useState<SalesMonth[]>([]);

    const loadYears = async () => {
        try {
            const res = await orderApi.getAvailableYears();
            const years = res.data;
            setAvailableYears(years);
            if (years.length > 0) {
                setSelectedYear(years[0]); // chọn năm đầu tiên
            }
        } catch (err) {
            console.error("Lỗi khi lấy danh sách năm:", err);
        }
    };

    const loadMonthly = async () => {
        try {
            const res = await orderApi.getMonthlyRevenue(selectedYear);
            const data = await res.data;
            setMonthlyRevenue(data);
        } catch (err) {
            console.error("Lỗi khi lấy doanh thu:", err);
        }
    };

    const loadDashboardSummary = async () => {
        try {
            const res = await dashboardApi.getDashboardSummary();
            setSummaryData(res.data);
        } catch (err) {
            console.error("Lỗi khi lấy doanh thu:", err);
        }
    }

    useEffect(() => {
        loadDashboardSummary();
        loadYears();
    }, []);

    useEffect(() => {
        if (selectedYear) {
            loadMonthly();
        }
    }, [selectedYear]);

    const formatCurrencyTrVND = (value: number) => {
        if (value >= 1000000) return `${value / 1000000}tr`;
        if (value >= 1000) return `${value / 1000}k`;
        return `${value}₫`;
    };

    const [selectedDate, setSelectedDate] = useState<string>("");
    const [dailyRevenue, setDailyRevenue] = useState<number | null>(null);

    const loadDailyRevenue = async (date: string) => {
        try {
            const response = await orderApi.getRevenueByDate(date);
            setDailyRevenue(response.data.totalRevenue);
        } catch (error) {
            console.error("Lỗi khi lấy doanh thu:", error);
            setDailyRevenue(null);
        }
    };

    return (
        <div className='w-full p-4 bg-gray-100 dark:bg-gray-900 overflow-x-hidden mt-[60px]'>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* {cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-md shadow border p-6 flex flex-col gap-2"
                    >
                        <div
                            className={`inline-flex items-center gap-1 text-sm font-medium px-2 py-0.5 rounded-md w-fit ${card.isIncrease
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                        >
                            {card.isIncrease ? (
                                <ArrowUp className="w-4 h-4" />
                            ) : (
                                <ArrowDown className="w-4 h-4" />
                            )}
                            {card.change}
                        </div>
                        <div className="text-2xl font-bold bg-green-100 text-green-700 w-fit px-2">{card.value}</div>
                        <div className="text-gray-500 text-sm">{card.label}</div>
                    </div>
                ))} */}

                <div
                    className="bg-white dark:bg-gray-800 rounded-md shadow p-6 flex flex-col gap-2"
                >
                    <div className="text-2xl font-bold bg-green-100 text-green-700 w-fit px-2">{summaryData?.totalProductQuantity.toLocaleString()}</div>
                    <div className="text-gray-500 text-sm dark:text-white">Tổng số sản phẩm</div>
                </div>
                <div
                    className="bg-white dark:bg-gray-800 rounded-md shadow p-6 flex flex-col gap-2"
                >
                    <div className="text-2xl font-bold bg-green-100 text-green-700 w-fit px-2">{summaryData?.deliveredOrderCount.toLocaleString()}</div>
                    <div className="text-gray-500 text-sm dark:text-white">Số đơn hàng đã giao</div>
                </div>
                <div
                    className="bg-white dark:bg-gray-800 rounded-md shadow p-6 flex flex-col gap-2"
                >
                    <div className="text-2xl font-bold bg-green-100 text-green-700 w-fit px-2">{summaryData?.soldProductCount.toLocaleString()}</div>
                    <div className="text-gray-500 text-sm dark:text-white">Số sản phẩm bán ra</div>
                </div>
                <div
                    className="bg-white dark:bg-gray-800 rounded-md shadow p-6 flex flex-col gap-2"
                >
                    <div className="text-2xl font-bold bg-red-100 text-red-700 w-fit px-2">{summaryData?.returnedProductCount.toLocaleString()}</div>
                    <div className="text-gray-500 text-sm dark:text-white">Số sản phẩm trả về</div>
                </div>
            </div>

            <div className="mx-auto bg-white dark:bg-gray-800 rounded-md shadow mt-4 pt-3">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Doanh thu hàng tháng - {selectedYear}
                </h2>

                <div className="flex justify-center gap-2 mb-6">
                    {availableYears.map((year) => (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`px-4 py-2 rounded-md border text-sm font-medium ${year === selectedYear
                                ? 'bg-[#fea928] text-white'
                                : 'bg-white text-[#fea928] border-[#fea928] hover:bg-orange-100'
                                }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>

                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={monthlyRevenue} margin={{ top: 30, right: 30, left: 20, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month">
                            <Label value="Tháng" offset={-10} position="insideBottomRight" style={{ fill: '#fea928', fontWeight: 'bold' }} />
                        </XAxis>
                        <YAxis tickFormatter={formatCurrencyTrVND}>
                            <Label
                                value="VND"
                                angle={0}
                                position="top"
                                offset={18}
                                style={{ textAnchor: 'middle', fill: '#fea928', fontWeight: 'bold' }}
                            />
                        </YAxis>
                        <Tooltip
                            content={({ payload }) => {
                                if (payload && payload.length > 0 && typeof payload[0].value === 'number') {
                                    return (
                                        <div className="bg-white p-2 rounded shadow">
                                            <p className="text-sm font-medium dark:text-black">Tháng: {payload[0].payload.month}</p>
                                            <p className="text-sm font-medium dark:text-black">Doanh thu: {formatCurrencyVND(payload[0].value)}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="revenue" fill="#fea928" radius={[6, 6, 0, 0]} />
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
                                className="border rounded-md px-2 py-1 w-36 text-[#fea928] dark:bg-gray-800"
                                value={selectedDate}
                                onChange={(e) => {
                                    const date = e.target.value;
                                    setSelectedDate(date);
                                    loadDailyRevenue(date);
                                    // setDailyRevenue(dailySalesData[date] ?? null);
                                }}
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="date" className="text-xl font-medium">
                                Doanh thu:
                            </label>
                            <p className="text-lg text-[#fea928]">
                                {dailyRevenue !== null ? formatCurrencyVND(dailyRevenue) : "Không có số liệu"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Chart;