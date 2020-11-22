import 'mocha'
import { expect } from 'chai'
import { Container } from 'inversify';
import { ValidationError } from 'joi'
import { ISignInUseCase } from '@application/useCases/SignIn/ISignInUseCase';
import { UserAlreadyExistsException } from '@application/exceptions/UserAlreadyExistsException';
import { bindings } from '@config/inversify.config.dev';
import TYPES from '@domain/core/constants/types';

let usecase: ISignInUseCase
const container: Container = new Container()

before(async () => {
    await container.loadAsync(bindings)
    usecase = container.get<ISignInUseCase>(TYPES.SignInUseCase)
})

describe('SignInUseCase', () => {
    it('should  create a user', async () => {
        await usecase.Execute({
            name: "teste",
            email: "teste@teste.com",
            password: "teste1234"
        })
    })

    it('shouldn´t allow creating the same user email', async () => {
        try {
            await usecase.Execute({
                name: "teste",
                email: "teste@teste.com",
                password: "teste1234"
            })
        } catch (err) {
            expect(err).to.be.instanceOf(UserAlreadyExistsException)
        }
    })

    it('should have all parameters filled', async () => {
        try {
            await usecase.Execute({
                email: undefined,
                password: undefined,
                name: undefined
            })
        } catch (err) {
            expect(err).to.be.instanceOf(ValidationError)
        }
    })
})
