import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import {Helmet} from "react-helmet";

const Statistics = ({ month }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/transactions/statistics?month=${month}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  return (
    <div className="mb-36">
       <Helmet>
        <title>ROXILER Systems-Statistics</title>
      </Helmet>

      <h1 className="text-center py-3 text-4xl font-semibold text-gray-900">
        Statistics
      </h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex items-center justify-center">
          <div className="bg-gradient-to-r from-primary via-blue-600 to-primary text-white w-full max-w-md p-8 rounded-3xl shadow-lg text-2xl  ">
            <table className="w-full text-left">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">Total Sale</td>
                  <td className="py-3 px-4 text-right">
                    ${(data?.totalSaleAmount || 0).toFixed(2)}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">Total Sold Items</td>
                  <td className="py-3 px-4 text-right">
                    {data?.totalSoldItems || 0}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Total Not Sold Items</td>
                  <td className="py-3 px-4 text-right">
                    {data?.totalNotSoldItems || 0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
