import "dotenv/config"
import express, { urlencoded } from "express"
import cors from "cors"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

//routes import
import { userRouter } from "./routes/user.route.js"

app.use("/api/v1/users", userRouter)

export { app };