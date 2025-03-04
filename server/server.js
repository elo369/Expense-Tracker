import express from "express"
import connectDB from "./connect/connect.js"
import dotenv from "dotenv"
import cors from "cors"
import router from "./routers/router.js"
dotenv.config()
connectDB()

const PORT =process.env.PORT || 5000;

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/data",router)

// app.get("/",(req,res)=>{
//     res.send("hello world")
// })

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})