import { notAuth } from "./handle_errors";


export const isAdmin = (req, res, next) => {
    const {role_code} = req.user;
    if(role_code != 'R1') return notAuth('Requied role Admin', res);
    next()
}

export const isModerator = (req, res, next) => {
    const {role_code} = req.user;
    if(role_code != 'R1' && role_code == 'R2') return notAuth('Requied role Amin', res);
    next()
}

export const isUser = (req, res, next) => {
    next()
}