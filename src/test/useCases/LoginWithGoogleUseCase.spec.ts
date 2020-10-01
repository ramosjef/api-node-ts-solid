import 'mocha'
import { bindings } from '../../inversify.config';
import { Container } from 'inversify';
import TYPES from '../../domain/constants/types';
import dotenv from 'dotenv-safe'
import { expect } from 'chai';
import { MissingParameterException } from '../../application/exceptions/MissingParameterException';
import { ISignInWithGoogleUseCase } from '../../application/useCases/SignInWithGoogle/ISignInWithGoogleUseCase';
dotenv.config();

let usecase: ISignInWithGoogleUseCase
const container: Container = new Container()

before(async () => {
    await container.loadAsync(bindings)
})

beforeEach(async () => {
    usecase = container.get<ISignInWithGoogleUseCase>(TYPES.LoginUseCase)
})

describe('SighInWithGoogleUseCase', () => {
    it('should check google token', async () => {
        try {
            await usecase.Execute({
                token: ""
            })
        } catch (error) {
            expect(error).to.be.instanceOf(MissingParameterException)
        }
    })
})
