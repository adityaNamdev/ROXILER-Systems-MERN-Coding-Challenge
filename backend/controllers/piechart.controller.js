import { Transaction } from "../models/transactions.model.js";

const getPieChartData = async (req, res) => {
  try {
    const month = parseInt(req.query.month) || 3;

    if (month < 1 || month > 12 || isNaN(month)) {
      return res.status(400).json({ error: "Please provide a valid month" });
    }

    const query = {
      $expr: { $eq: [{ $month: "$dateOfSale" }, month] },
    };

    const data = await Transaction.aggregate([
      { $match: query },
      { $group: { _id: "$category", items: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
        month,
        data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getPieChartData;
