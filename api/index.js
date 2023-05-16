import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"

const app = express()

dotenv.config();

const connect = async () => {
    try {

        await mongoose.connect(process.env.MONGO);
        console.log("Connected to Database")
    
    } catch(error){
        
        throw error;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!")
})

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!")
})


//middlewares

app.use(cookieParser())

app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//error for middlewares
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMsg = err.message || "Something went wrong";
    return res.status(500).json({
        sucess: false,
        status: errorStatus,
        message: errorMsg,
        stack: err.stack,
    });
});

app.listen(8800, () => {
    connect()
    console.log("Connected to backend!")
})
