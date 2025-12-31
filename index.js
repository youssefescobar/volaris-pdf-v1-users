require('dotenv').config();
const express = require('express')
const connectdb = require('./configs/db')
const userRoutes = require('./routes/usersRoute')


const app = express()


app.use(express.json());
connectdb();

app.use("/user", userRoutes)

app.get("/", (req,res)=>{
    res.send("up")
})



app.listen(process.env.PORT || 3000, ()=> {
    console.log("server is online")
})