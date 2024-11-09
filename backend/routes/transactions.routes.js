import express from "express";
import  insertData  from "../controllers/init.controller.js";
import getAllTransactions from "../controllers/transactions.controller.js";
import getStatistics from "../controllers/statistics.controller.js";
import getBarChartData from "../controllers/barchart.controller.js";
import getPieChartData from "../controllers/piechart.controller.js";
import getCombinedData from "../controllers/combined.controller.js";


const router = express.Router();


router.get("/init",insertData);
router.get("/all",getAllTransactions);
router.get("/statistics",getStatistics);
router.get("/barchartData",getBarChartData);
router.get("/piechartData",getPieChartData);
router.get("/combinedData",getCombinedData);

export default router;


