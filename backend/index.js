import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";
import transactionsRoute from "./routes/transactions.routes.js"

dotenv.config();
const app = express();
const Port = process.env.PORT || 4545;

app.use(cors());
app.use(express.json());


connectDB();

//routes
app.use("/api/transactions", transactionsRoute);

app.listen(Port, () => {
  console.log(` App-Server is listen on port:${Port}`);
});
