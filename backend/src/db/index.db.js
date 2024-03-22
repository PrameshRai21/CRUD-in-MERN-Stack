import mongoose from "mongoose";
import { DB_NAME } from "../constant.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected successfully!!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("ERROR: MongoDB connection failed!!! ", error);
        process.exit(1);
    }
}

export default connectDB;