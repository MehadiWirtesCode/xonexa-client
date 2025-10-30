import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { chartData } from "./ChartData";

const ChartSection = () => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-96">
    <h3 className="text-xl font-bold mb-5 text-gray-800">Monthly Income and Profit</h3>
    <div className="h-full -mt-2">
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
            }}
            formatter={(value) => `$${value.toLocaleString()}`}
          />
          <Legend iconType="circle" wrapperStyle={{ paddingTop: 10 }} />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 5, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 8 }}
            name="Daily Income ($)"
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="#f97316"
            strokeWidth={3}
            dot={{ r: 5, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 8 }}
            name="Profit ($)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default ChartSection;