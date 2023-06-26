import mongoose from "mongoose";

//DataBase
export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "Post_Backend",
    },

    ).then(() => {
        console.log("Database connected");
    }).catch((err) => {
        console.log(err);
    })
}