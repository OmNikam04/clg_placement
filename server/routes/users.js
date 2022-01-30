import express from 'express'
const router = express.Router();
import { userRegister, userLogin, userAuth, serializeUser, checkRole} from '../utils/Auth.js'

// !All registration routes
// Student registration
router.post('/register-student', async(req,res)=>{
    // whatever we had in req.body we'll pass it as userDets to our userRegister function from utils->Auth.js
    await userRegister( req.body, 'student', res )
})

// Admin registration
router.post('/register-admin', async(req,res)=>{
    await userRegister( req.body, 'admin', res )
})

// Company registration
router.post('/register-company', async(req,res)=>{
    await userRegister( req.body, 'company', res )
})



// !All login routes
// Student login
router.post('/login-student', async(req,res)=>{
    await userLogin(req.body, "student", res)
})

// Admin login
router.post('/login-admin', async(req,res)=>{
    await userLogin(req.body, "admin", res)

})

// Company login
router.post('/login-company', async(req,res)=>{
    await userLogin(req.body, "company", res)
})




// ! common profile route
router.get('/profile', userAuth, async(req,res)=>{
    // console.log(req.user);
    // return res.json({message:"this is profile"})
    // return res.json(req.user) 
    //? but this req.user also gives passport field which should be protected for security reasons thats why we had created serializeUser function inside utils->Auth.js
    return res.json(serializeUser(req.user)) 
})



// ! All Protected routes
// Student protected route
router.get('/student-protected', userAuth, checkRole(['student']), async(req,res)=>{
    res.json("hello student")
})

// Admin protected route
router.get('/admin-protected', userAuth, checkRole(['admin']), async(req,res)=>{
    res.json('hello admin')
})

// Company protected route
router.get('/company-protected', userAuth, checkRole(['company']), async(req,res)=>{
    res.json('hello company')
})


export default router