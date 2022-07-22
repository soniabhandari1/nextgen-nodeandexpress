const express=require('express')
const connectDB=require('./db/connect')
const auth=require('./routes/user')
require('dotenv').config()
const app=express()
app.use(express.json())
const port=3000
app.use('/api',auth)
const start=async()=>{
    await connectDB(process.env.MONGO_URI)
    app.listen(port,()=>{
        console.log(`server is listening on ${port}`)
    })
}

start()