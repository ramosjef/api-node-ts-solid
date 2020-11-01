import joi from 'joi'

const SigninRequestValidation = joi.object({
    name: joi.string()
        .required()
        .min(3),

    email: joi.string()
        .required()
        .email(),

    password: joi.string()
        .required()
        .min(8),
})

export default SigninRequestValidation;
