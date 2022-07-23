import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import bodyParser from 'body-parser';
const app = express()
const port = process.env.PORT
const DB_URI = process.env.DB_URI
app.use(cors())

connectDB(DB_URI)
app.use(express.json())


app.use("/v1/smart_coders", userRoutes)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})