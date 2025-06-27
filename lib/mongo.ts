'use server'
import mongoose from "mongoose";

export const connectMongodb = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI as string)
        console.log('Connected to db');
        
    } catch (error) {
        console.log('Error connected to db : ',error);
    }
};
