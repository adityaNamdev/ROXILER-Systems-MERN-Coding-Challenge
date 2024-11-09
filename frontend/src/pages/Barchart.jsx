import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Spinner from "../components/Spinner";
import { Helmet } from "react-helmet";

const Barchart = ({ month }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `api/transactions/barchartData?month=${month}`
        );
        const formatedData = response?.data?.data.map((item) => ({
          range: item.range,
          count: item.count,
        }));
        setData(formatedData);
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month]);

  return (
    <div>
      <Helmet>
        <title>ROXILER Systems-Bar Chart</title>
      </Helmet>

      <h1 className="text-center py-3 text-4xl font-semibold text-gray-900">
        Bar Chart
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
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#010ed0" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Barchart;
