import { Transaction } from "../models/transactions.model.js";
import axios from "axios";

const getCombinedData = async (req, res) => {
  try {
    const month = parseInt(req.query.month) || 3;

    if (month < 1 || month > 12 || isNaN(month)) {
      return res.status(400).json({ error: "Please provide a valid month" });
    }


    const statistics = await axios.get(
      `http://localhost:${process.env.PORT}/api/transactions/statistics?month=${month}`
    );
    const barChart = await axios.get(
      `http://localhost:${process.env.PORT}/api/transactions/barchartData?month=${month}`
    );
    const pieChart = await axios.get(
      `http://localhost:${process.env.PORT}/api/transactions/piechartData?month=${month}`
    );

    res.json({
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getCombinedData;
