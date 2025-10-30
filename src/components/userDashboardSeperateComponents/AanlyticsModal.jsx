import { useEffect, useState } from "react";
import { X } from "lucide-react"; 

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

export const AnalyticsModal = ({
  analyticsModal,
  setAnalyticsModal,
  userId,
}) => {
  const [monthlyData, setMonthlyData] = useState([]);
  const display = analyticsModal ? "flex" : "hidden";
  useEffect(() => {
    if (analyticsModal) {
      fetch(`${import.meta.env.VITE_API_URL}/get-analytics-data/${userId}`)
        .then((res) => res.json())
        .then((data) => setMonthlyData(data))
        .catch((err) => console.error(err));
    }
  }, [analyticsModal, userId]);

  return (
    <>
      <div
        className={`fixed inset-0 backdrop-blur-sm bg-opacity-50 z-50 ${display} items-center justify-center p-4`}
      >
        <div className="bg-white rounded-xl w-full max-w-3xl p-6 relative">
          <button
            onClick={() => setAnalyticsModal(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold mb-4">Monthly Purchases</h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

                {/* X axis: months */}
                <XAxis
                  dataKey="month"
                  stroke="#334155"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />

                {/* Y axis for orders */}
                <YAxis
                  yAxisId="left"
                  stroke="#334155"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />

                {/* Y axis for total spent */}
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#f97316"
                  tick={{ fontSize: 12, fill: "#f97316" }}
                />

                {/* Tooltip */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderRadius: "8px",
                    border: "none",
                    color: "#f8fafc",
                    fontSize: 12,
                  }}
                />

                <Legend verticalAlign="top" height={36} />

                {/* Orders as thin bars */}
                <Bar
                  yAxisId="left"
                  dataKey="orders"
                  barSize={12}
                  radius={[6, 6, 0, 0]}
                  fill="#4ade80"
                >
                  {monthlyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#barGradient${index})`}
                    />
                  ))}
                </Bar>

                {/* Total spent as line */}
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="total_spent"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />

                {/* Gradients for bars */}
                <defs>
                  {monthlyData.map((entry, index) => (
                    <linearGradient
                      id={`barGradient${index}`}
                      key={index}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#4ade80" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#4ade80"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  ))}
                </defs>
              </ComposedChart>
            </ResponsiveContainer>

            {/* </ResponsiveContainer> */}
          </div>
        </div>
      </div>
    </>
  );
};
