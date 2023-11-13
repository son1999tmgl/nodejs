import joi from 'joi';

export const email = joi.string().email().required()
export const password = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()