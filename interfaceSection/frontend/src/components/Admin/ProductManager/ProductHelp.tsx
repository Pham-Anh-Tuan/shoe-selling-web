import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProductHelp = () => {
  type SalesMonth = {
    month: string;
    revenue: number;
  };
  const salesData: Record<number, SalesMonth[]> = {
    2022: [
      { month: 'Tháng 1', revenue: 1000 },
      { month: 'Tháng 2', revenue: 1500 },
      { month: 'Tháng 3', revenue: 700 },
      { month: 'Tháng 4', revenue: 1200 },
      { month: 'Tháng 5', revenue: 2100 },
      { month: 'Tháng 6', revenue: 1400 },
      { month: 'Tháng 7', revenue: 1600 },
      { month: 'Tháng 8', revenue: 2300 },
      { month: 'Tháng 9', revenue: 1900 },
      { month: 'Tháng 10', revenue: 1700 },
      { month: 'Tháng 11', revenue: 2000 },
      { month: 'Tháng 12', revenue: 2200 },
    ],
    2023: [
      { month: 'Tháng 1', revenue: 1200 },
      { month: 'Tháng 2', revenue: 2100 },
      { month: 'Tháng 3', revenue: 800 },
      { month: 'Tháng 4', revenue: 1600 },
      { month: 'Tháng 5', revenue: 2400 },
      { month: 'Tháng 6', revenue: 1800 },
      { month: 'Tháng 7', revenue: 2000 },
      { month: 'Tháng 8', revenue: 2700 },
      { month: 'Tháng 9', revenue: 2200 },
      { month: 'Tháng 10', revenue: 1900 },
      { month: 'Tháng 11', revenue: 2300 },
      { month: 'Tháng 12', revenue: 2500 },
    ],
    2024: [
      { month: 'Tháng 1', revenue: 1300 },
      { month: 'Tháng 2', revenue: 1800 },
      { month: 'Tháng 3', revenue: 900 },
      { month: 'Tháng 4', revenue: 1700 },
      { month: 'Tháng 5', revenue: 2500 },
      { month: 'Tháng 6', revenue: 1900 },
      { month: 'Tháng 7', revenue: 2100 },
      { month: 'Tháng 8', revenue: 2800 },
      { month: 'Tháng 9', revenue: 2300 },
      { month: 'Tháng 10', revenue: 2000 },
      { month: 'Tháng 11', revenue: 2400 },
      { month: 'Tháng 12', revenue: 2600 },
    ],
    2025: [
      { month: 'Tháng 1', revenue: 1400 },
      { month: 'Tháng 2', revenue: 1700 },
      { month: 'Tháng 3', revenue: 2540 },
      { month: 'Tháng 4', revenue: 1930 },
    ]
  };

  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const data = salesData[selectedYear];

  const formatVND = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)} triệu VND`;
    }
    return `${value.toLocaleString()} VND`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Doanh thu hàng tháng - {selectedYear}
      </h2>

      <div className="flex justify-center gap-2 mb-6">
        {Object.keys(salesData).map((year) => (
          
          <button
            key={year}
            onClick={() => setSelectedYear(+year)}
            className={`px-4 py-2 rounded-md border text-sm font-medium ${
              +year === selectedYear
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-100'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={formatVND} />
          <Tooltip formatter={(value: number) => [formatVND(value), 'Doanh thu']} />
          <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProductHelp;