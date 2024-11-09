import { Transaction } from "../models/transactions.model.js";

const getAllTransactions = async (req, res) => {
  try {
   
    const month = parseInt(req.query.month) || 3;
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const searchText = req.query.search || "";

    if (month < 1 || month > 12 || isNaN(month)) {
      return res.status(400).json({ error: "Please provide a valid month" });
    }

    let query = {
      $or: [
        { title: { $regex: new RegExp(searchText, "i") } },
        { description: { $regex: new RegExp(searchText, "i") } },
      ],
      $expr: { $eq: [{ $month: "$dateOfSale" }, month] },
    };
    if (!isNaN(searchText) && searchText !== "") {
      query.$or.push({ price: parseFloat(searchText) });
    }
    const totalTransactions = await Transaction.find(query).countDocuments();
    const allTransactions = await Transaction.find(query)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      month,
      totalPages: Math.ceil(totalTransactions / limit),
      currentPage: page,
      totalResults: totalTransactions,
      totaltranscationsInthisPage: allTransactions.length,
      transactions: allTransactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getAllTransactions;
