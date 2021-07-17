import { getDbConnection } from "../db";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const LogInRoute = {
    path: "/api/login",
    method: "post",
    handler: async (req, res) => {
        const {email, password} = req.body;
        const db = getDbConnection("react-auth-db-jun2021");
        const user = await db.collection('users').findOne({email})

        if(!user) {
            return res.sendStatus(401); // 401 = "authentocated"
        }

        const {_id: id, isVerified, passwordHash, info } = user;

        const isCorrect = await bcrypt.compare(password, passwordHash);
        //const passwordHash = await bcrypt(password, 10);
        // const startingInfo = {
        //     hairColor: '',
        //     favoriteFood: '',
        //     bio: '',
        // }

        if(isCorrect) {
            jwt.sign(
                {id, isVerified, passwordHash, info}, 
                process.env.JWT_SECRET, 
                {expiresIn: '2d'},
                (err,token) => {
                    if(err) {
                        console.log(err)
                        res.sendStatus(500)
                    }
                    res.status(200).send({ token})
                })
        } else {
            res.sendStatus(401)
        }
        
    }
}