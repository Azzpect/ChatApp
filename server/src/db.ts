import mongoose from "mongoose";


export async function connectToDB() {
    try {
        await mongoose.connect(process.env.DB_URI as string)
        console.log("Connected to database");
    } catch (err) {
        console.log("Error connecting to database");
    }
}