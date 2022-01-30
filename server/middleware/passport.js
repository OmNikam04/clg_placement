import User from '../models/User.js'
import { Strategy, ExtractJwt } from 'passport-jwt'
import dotenv from 'dotenv'
dotenv.config({path:'./config.env'})
const SECRET = process.env.APP_SECRET


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
}

export default (passport)=>{
    passport.use(
        new Strategy(options, async(payload, done)=>{ // payload is jsonwebtoken
            await User.findById(payload.user_id) // and finding the user with userid from payload i.e. from token
        .then(user=>{
            if(user){
                return done(null, user)
            } 
            //if there is no user then 
            return done(null, false)
        }).catch((err)=>{
            return done(null, false)
        })
    }))

}

