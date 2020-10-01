import * as express from "express"
import { controller, httpGet, httpPost, queryParam, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import { ISignInUseCase } from "../../application/useCases/SignIn/ISignInUseCase";
import TYPES from "../../domain/constants/types";
import { ILoginUseCase } from "../../application/useCases/Login/ILoginUseCase";
import { BaseController } from "./BaseController";
import { NotAuthenticatedException } from "../../application/exceptions/NotAuthenticatedException";
import { ISignInWithGoogleUseCase } from "../../application/useCases/SignInWithGoogle/ISignInWithGoogleUseCase";

@controller("/api/v1/users")
export class UsersController extends BaseController {

    @inject(TYPES.SignInUseCase) private readonly _createUserUseCase: ISignInUseCase
    @inject(TYPES.SignInWithGoogleUseCase) private readonly _signInWithGoogleUseCase: ISignInWithGoogleUseCase
    @inject(TYPES.LoginUseCase) private readonly _loginUseCase: ILoginUseCase

    @httpPost('/signin')
    async signin(@request() req: express.Request, @response() res: express.Response) {
        try {

            const { name, email, password } = req.body;
            await this._createUserUseCase.Execute({ name, email, password })
            return this.statusCode(201)

        } catch (err) {
            return this.handleError(err)
        }
    }

    @httpPost('/signinwithgoogle')
    async signinWithGoogle(@queryParam("token") token: string) {
        try {

            var response = await this._signInWithGoogleUseCase.Execute({ token: token })
            return response

        } catch (err) {
            return this.handleError(err)
        }
    }

    @httpPost('/login')
    async login(@request() req: express.Request, @response() res: express.Response) {
        try {

            const { email, password } = req.body
            var response = await this._loginUseCase.Execute({ email, password })
            return this.ok(response)

        } catch (err) {
            return this.handleError(err)
        }
    }

    @httpGet('/')
    async get() {
        try {

            if (!await this.httpContext.user.isAuthenticated())
                throw new NotAuthenticatedException()

            return [
                { Name: "Jeff" },
                { Name: "Bob" },
                { Name: "Myke" },
            ]

        } catch (err) {
            return this.handleError(err)
        }
    }
}
