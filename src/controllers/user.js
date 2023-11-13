import * as services from "../services"
import { interalServerError, notFound, badRequest } from '../middlewares/handle_errors'


export const getCurrent = async (req, res) => {
    try {
        const {id} = req.user;


        const response = await services.getOne(id);
        return res.status(200).json(response);
    } catch (error) {
        return interalServerError(req, res)
    }
}

export const getUserById = async (req, res) => {
    try {
        const { error } = joi.object({ email, password }).validate(req.body)
        if (error) return badRequest(error.details[0].message, res)

        const response = await services.register(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return interalServerError(req, res)
    }
}