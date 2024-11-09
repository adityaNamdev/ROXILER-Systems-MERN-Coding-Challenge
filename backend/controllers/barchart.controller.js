import { Transaction } from "../models/transactions.model.js";

const getBarChartData = async (req, res) => {
  try {
    const month = parseInt(req.query.month) || 3;

    if (month < 1 || month > 12 || isNaN(month)) {
      return res.status(400).json({ error: "Please provide a valid month" });
    }

    const ranges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "801-900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: Infinity },
    ];

    const query = {
      $expr: { $eq: [{ $month: "$dateOfSale" }, month] },
    };

    const result = await Promise.all(
      ranges.map(async (range) => {
        const count = await Transaction.countDocuments({
          ...query,
          price: { $gte: range.min, $lt: range.max },
        });
        return { range: range.range, count };
      })
    );

    res.json({
        month,
        data:result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getBarChartData;
