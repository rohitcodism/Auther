import mongoose from "mongoose";

export async function connectDb() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const dbConnection = mongoose.connection;

        dbConnection.on('connected', () => {
            console.log("MongoDb Connected!!!");
        })

        dbConnection.on('error', () => {
            console.log("Error while connecting to mongodb");
            process.exit();
        })
    } catch (error) {
        console.log("DB connection error : ", error);
    }
}