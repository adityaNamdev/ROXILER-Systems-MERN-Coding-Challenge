import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Spinner from "../components/Spinner";
import {Helmet} from "react-helmet";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#010ed0"];

const Piechart = ({ month }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPieData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/transactions/piechartData?month=${month}`
        );
        const formattedData = response.data.data.map((item) => ({
          name: item._id,
          value: item.items,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPieData();
  }, [month]);

  return (
    <div>
       <Helmet>
        <title>ROXILER Systems-Pie Chart</title>
      </Helmet>

      <h1 className="text-center py-3 text-4xl font-semibold text-gray-900">
        Pie Chart
      </h1>
      <div className="flex justify-center">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {data.length === 0 ? (
              <div className="text-center font-semibold text-lg my-44">
                Oops!!No Data Found
              </div>
            ) : (
              <ResponsiveContainer width="80%" height={380}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#010ed0"
                    label
                  >
                    {data.map((en, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Piechart;
