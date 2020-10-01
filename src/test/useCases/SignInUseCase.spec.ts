import 'mocha'
import { expect } from 'chai'
import { ISignInUseCase } from '../../application/useCases/SignIn/ISignInUseCase';
import { bindings } from '../../inversify.config';
import { Container } from 'inversify';
import TYPES from '../../domain/constants/types';
import { MissingParameterException } from '../../application/exceptions/MissingParameterException';
import { UserAlreadyExistsException } from '../../application/exceptions/UserAlreadyExistsException';

let usecase: ISignInUseCase
const container: Container = new Container()

before(async () => {
    await container.loadAsync(bindings)
})

beforeEach(async () => {
    usecase = container.get<ISignInUseCase>(TYPES.SignInUseCase)
})

describe('SignInUseCase', () => {
    it('should  create an user', async () => {
        await usecase.Execute({
            name: "teste",
            email: "teste@teste.com",
            password: "teste"
        })
    })

    it('shouldn´t allow creating the same user email', async () => {
        try {
            await usecase.Execute({
                name: "teste",
                email: "teste@teste.com",
                password: "teste"
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
            expect(err).to.be.instanceOf(MissingParameterException)
        }
    })
})
