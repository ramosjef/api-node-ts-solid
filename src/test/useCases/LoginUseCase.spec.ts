import 'mocha'
import { expect } from 'chai';
import { ISignInUseCase } from '../../application/useCases/SignIn/ISignInUseCase';
import { bindings } from '../../inversify.config';
import { Container } from 'inversify';
import TYPES from '../../domain/constants/types';
import { ILoginUseCase } from '../../application/useCases/Login/ILoginUseCase';
import dotenv from 'dotenv-safe'
import { MissingParameterException } from '../../application/exceptions/MissingParameterException';
import { UserNotFoundException } from '../../application/exceptions/UserNotFoundException';
dotenv.config();

let usecase: ILoginUseCase
const container: Container = new Container()

before(async () => {
    await container.loadAsync(bindings)
    let createUserUsecase = container.get<ISignInUseCase>(TYPES.SignInUseCase)
    await createUserUsecase.Execute({
        name: "teste",
        email: "teste@teste.com",
        password: "teste"
    })
})

beforeEach(async () => {
    usecase = container.get<ILoginUseCase>(TYPES.LoginUseCase)
})

describe('LoginUseCase', () => {

    it('should check if user exists', async () => {
        try {
            await usecase.Execute({
                email: 'notfound@mail.com',
                password: "notExists"
            })
        } catch (error) {
            expect(error).to.be.instanceOf(UserNotFoundException)
        }
    })

    it('should validate email', async () => {
        try {
            await usecase.Execute({
                email: undefined,
                password: "teste"
            })
        } catch (error) {
            expect(error).to.be.instanceOf(MissingParameterException)
        }
    })

    it('should validate password', async () => {
        try {
            await usecase.Execute({
                email: "teste@teste.com",
                password: undefined
            })
        } catch (error) {
            expect(error).to.be.instanceOf(MissingParameterException)
        }
    })

    it('should authenticate user', async () => {
        let res = await usecase.Execute({
            email: "teste@teste.com",
            password: "teste"
        })
    })
})
