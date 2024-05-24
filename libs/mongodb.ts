import mongoose from "mongoose";

function connectDB() {
    try{
        mongoose.connect(process.env.MONGODB_URI || "");
    }
    catch(error) {
        console.log(error);

    }
}

export default connectDB;