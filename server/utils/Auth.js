// ! registration is same for all the user only role is changing same goes for login functionality
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import dotenv from 'dotenv'
dotenv.config({path:'./config.env'})
const SECRET = process.env.APP_SECRET
// Todo: DESC to register the user( student, admin, company )

export const userRegister = async (userDets, role, res )=>{
    try {
            // validate the username 
        let usernameNotTaken = await validateUsername(userDets.name)
        if(!usernameNotTaken){
            return res.status(400).send({message:"Username is already taken"})
        }
        // validate the email
        let emailNotRegistered = await validateEmail(userDets.email)
        if(!emailNotRegistered){
            return res.status(400).send({message:"Email is already registered"})
        }

        // if everything is fine then register the user with hashed password
        // get the hashed password
        const hashedPassword = await bcrypt.hash(userDets.password, 12) //12 rounds of hashing
        // create a new user
        const newUser = new User({
            ...userDets,
            password: hashedPassword,
            role
        })

        await newUser.save()

        return res.status(201).json({newUser, message:"User successfully registered! Please now login"})

    } catch (error) {
        console.log('Error occured while registering', error);
        return res.status(500).json({message:"Unable to create account"})
    }
}   

const validateUsername = async (username)=>{
    // check that the username exist in DB is it exist then validation fails
    let user =await User.findOne({ name: username })

    // if user is there in DB then return false i.e. user already exist
    return user? false : true; 
}

export const userLogin = async (userCreds, role, res)=>{
    let { email, password } = userCreds
    // check if email is there in DB 
    const user = await User.findOne({ email })
    if(!user){
        return res.status(404).json({
            message:"Can't find the account with give email"
        })
    }
    // we will check the role
    if(user.role !== role){
        return res.status(403).json({
            name : user.name,
            role : user.role,
            message:"Please make sure you are loggin from right portal"
        })
    }
    // that means user is existing and trying to sign in from the right portal
    // now check for the password
    let isMatch = await bcrypt.compare(password, user.password) // user.password is from database // and this function returns boolean

    if(isMatch){
        //sign in the token and issue it to the user
        let token = jwt.sign({
            user_id : user._id,
            role: user.role,
            name: user.name,
            email: user.email
        }, SECRET, { expiresIn: "7 days"})  // 1st argument of this function is what our token is going to contain

        let result = {
            name : user.name,
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn:168 //168 hours
        }

        return res.status(200).json({
            ...result, 
            message:"Welcome back! You are now logged in"
        })

    }else{
        return res.status(403).json({
            message:"Incorrect password"
        })
    }

}


const validateEmail = async (email)=>{
    // check that the email exist in DB is it exist then validation fails
    let user =await User.findOne({ email })

    // if user is there in DB then return false i.e. user already exist
    return user? false : true; 
}


// ! passport middlware ( can be used to protect any route )
export const userAuth = passport.authenticate('jwt', { session:false })


export const serializeUser = user =>{
    return{
        name: user.name,
        email: user.email,
        _id: user._id,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt
    }
}



// ! Check role middleware
export const checkRole = roles =>(req, res, next)=>{
    if(roles.includes(req.user.role)){
        next()
    }
    return res.status(401).json({
        message:"Unauthorized, you cannot come to this page"
    })
}