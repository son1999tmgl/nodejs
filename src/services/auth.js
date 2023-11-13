import db from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8))

const signToken = (response) => {
    return jwt.sign({
        id: response.id,
        email: response.email,
        role_code: response.role_code
    },
        process.env.JWT_SECRET,
        {
            expiresIn: '5d'
        }
    )
}


export const register = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { email },
            defaults: {
                email: email,
                password: hashPassword(password)
            }
        })
        // nếu chưa có user
        let token = null;
        if (response[1]) {
            token = signToken(response[0])
        }
        resolve({
            err: response[1] ? 0 : -1,
            mes: response[1] ? 'Register is successfuly' : 'Email is exits',
            token: token
        }
        )
        console.log('after resolve')
    } catch (error) {
        console.log('err');
        reject(error)
    }
})


export const login = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { email },
            raw: true
        })
        const isChecked = response && bcrypt.compareSync(password, response.password)
        let token = null
        if(isChecked) {
            token =  signToken(response)
        }
        resolve({
            err: response ? 0 : -1,
            mes: response ? 'Login is successfuly' : 'err',
            access_token: token ? `Bearer ${token}` : null 
        }
        )
    } catch (error) {
        console.log('err');
        reject(error)
    }
})