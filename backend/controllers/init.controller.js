import axios from "axios";
import { Transaction } from "../models/transactions.model.js";

const insertData = async (req, res) => {
    try {
      const response = await axios.get(
        "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
      );
  
      await Transaction.insertMany(response.data);
  
      res.status(200).send("Get All data Successfully ");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export default insertData;