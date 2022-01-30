import mongoose  from "mongoose";

// In the tutorial these 2 lines are not include but you included this so your program can run
import dotenv from 'dotenv'
dotenv.config({path:'./config.env'})

// Connnecting to database
const DB = process.env.APP_DB //pass: mrsaint04   username: saintUser dbName: mernusers
 
// mongoose.connect(DB).then(()=>{
//     console.log(`Connected to DB successfully...`);
// })
// .catch((e)=>{
//     console.log(`Error occured while connecting to DB `, e);
// })

const connectDB = async ()=>{
    try {
        await mongoose.connect(DB)
        console.log(`Connected DB successfully`);
    } catch (error) {
        console.log('Error occured during DB connection', error);
    }
}

connectDB()