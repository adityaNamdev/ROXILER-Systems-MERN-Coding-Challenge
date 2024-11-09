import { Transaction } from "../models/transactions.model.js";

const getStatistics = async (req, res) => {
  try {
    const month = parseInt(req.query.month) || 3;

    if (month < 1 || month > 12 || isNaN(month)) {
        return res.status(400).json({ error: "Please provide a valid month" });
      }

    const statistics = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, month] },
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: { $cond: ["$sold", "$price", 0] } },
          totalSoldItems: { $sum: { $cond: ["$sold", 1, 0] } },
          totalNotSoldItems: { $sum: { $cond: ["$sold", 0, 1] } },
        },
      },
    ]);

    const dataOfSale = statistics[0] || {
      totalSaleAmount: 0,
      totalSoldItems: 0,
      totalNotSoldItems: 0,
    };

    res.status(200).json({
      month,
      data:dataOfSale
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getStatistics;
