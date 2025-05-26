import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './routes/userroutes'
dotenv.config()

const app = express()
const PORT = 3000
const MONGO_URI = process.env.MONGO_URL as string

app.use(express.json())

function connecttoDb(){
    mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    })
    .catch(err => {
      console.error('Failed to connect to MongoDB', err);
    });
}
app.use('/api',router)
app.get('/',(req,res) => {
    res.send({message : "Welcome to server"})
})
connecttoDb()
