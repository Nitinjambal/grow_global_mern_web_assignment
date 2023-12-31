import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js"
import postRouter from "./routes/post.js"
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path: "./data/config.env",
})

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

//using routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Nice Working"
    })
})

//using error middleware
app.use(errorMiddleWare)








