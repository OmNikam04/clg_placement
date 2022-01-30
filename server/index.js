import express from 'express'
import cors from 'cors'
import './db/conn.js'
import usersRoute from './routes/users.js'
import dotenv from 'dotenv'
import passport from 'passport'
import passportMiddleware from './middleware/passport.js'


const app = express()//initializing application

dotenv.config({path:'./config.env'})
const PORT = process.env.APP_PORT

app.use(cors())
app.use(express.json())
// app.use(passport.initialize())


// passportMiddleware(passport)

// use routes middleware
app.use('/user',usersRoute)


app.listen(PORT, ()=>{
    console.log(`server running on port http://localhost/${PORT}`);
})