import jwt from 'jsonwebtoken'
import { badRequest, notAuth } from './handle_errors';

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token: ', token);
    if (!token) return badRequest('Require authrization', res)
    const access_token = token.split(' ')[1];
    jwt.verify(access_token, process.env.JWT_SECRET, (err, decode) => {
        if(err) return notAuth('Access token may be expixed or invalid', res);
        req.user = decode;
        next();
    });
}