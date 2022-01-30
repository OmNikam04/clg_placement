import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({path:'./config.env'})
const SECRET = process.env.APP_SECRET

const auth = async ( req, res, next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]

        const isCustomAuth = token.length < 500 // token created by us

        let decodedData

        if(token && isCustomAuth ){
            // token is created by us then give data stored inside that token 
            decodedData = jwt.verify(token, SECRET)
            req.user_id = decodedData?.id
        }else{
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

export default auth