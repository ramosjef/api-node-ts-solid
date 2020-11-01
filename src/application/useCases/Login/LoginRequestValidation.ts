import joi from 'joi'

const LoginRequestValidation = joi.object({
    email: joi.string()
        .required()
        .email(),

    password: joi.string()
        .required()
        .min(8),
})

export default LoginRequestValidation;