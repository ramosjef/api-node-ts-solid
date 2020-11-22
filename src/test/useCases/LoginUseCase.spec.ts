import 'mocha'
import 'dotenv/config'
import { expect } from 'chai';
import { ISignInUseCase } from '@application/useCases/SignIn/ISignInUseCase';
import { bindings } from '@config/inversify.config.dev';
import { Container } from 'inversify';
import TYPES from '@domain/core/constants/types';
import { ILoginUseCase } from '@application/useCases/Login/ILoginUseCase';
import { UserNotFoundException } from '@application/exceptions/UserNotFoundException';
import { ValidationError } from 'joi'

let loginUsecase: ILoginUseCase
const container: Container = new Container()

before(async () => {
    await container.loadAsync(bindings)
    loginUsecase = container.get<ILoginUseCase>(TYPES.LoginUseCase)

    const signInUseCase = container.get<ISignInUseCase>(TYPES.SignInUseCase)
    await signInUseCase.Execute({
        name: "teste",
        email: "teste@teste.com",
        password: "teste1234"
    })
})

describe('LoginUseCase', () => {

    it('should check if user exists', async () => {
        try {
            await loginUsecase.Execute({
                email: 'notfound@mail.com',
                password: "notExists"
            })
        } catch (error) {
            expect(error).to.be.instanceOf(UserNotFoundException)
        }
    })

    it('should validate email', async () => {
        try {
            await loginUsecase.Execute({
                email: undefined,
                password: "teste1234"
            })
        } catch (error) {
            expect(error).to.be.instanceOf(ValidationError)
        }
    })

    it('should validate password', async () => {
        try {
            await loginUsecase.Execute({
                email: "teste@teste.com",
                password: undefined
            })
        } catch (error) {
            expect(error).to.be.instanceOf(ValidationError)
        }
    })

    it('should authenticate user', async () => {
        await loginUsecase.Execute({
            email: "teste@teste.com",
            password: "teste1234"
        })
    })
})
