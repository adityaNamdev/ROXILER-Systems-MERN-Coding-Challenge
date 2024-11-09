import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_NAME = "ROXILER-System";



const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !!`);
    } catch (error) {
        console.log("MongoDB connection Failed ", error);
    }
}

export default connectDB;