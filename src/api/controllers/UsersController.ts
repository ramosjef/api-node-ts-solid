import * as express from "express"
import { controller, httpGet, httpPost, queryParam, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import { ISignInUseCase } from "../../application/useCases/SignIn/ISignInUseCase";
import TYPES from "../../domain/core/constants/types";
import { ILoginUseCase } from "../../application/useCases/Login/ILoginUseCase";
import { BaseController } from "./BaseController";
import { NotAuthenticatedException } from "../../application/exceptions/NotAuthenticatedException";

@controller("/api/v1/users")
export class UsersController extends BaseController {

    private readonly _createUserUseCase: ISignInUseCase
    private readonly _loginUseCase: ILoginUseCase

    constructor(
        @inject(TYPES.SignInUseCase) createUserUseCase: ISignInUseCase,
        @inject(TYPES.LoginUseCase) loginUseCase: ILoginUseCase,
    ) {
        super();

        this._createUserUseCase = createUserUseCase;
        this._loginUseCase = loginUseCase;
    }

    /**
     * @apiDefine Error401
     * @apiErrorExample {json} Unauthorized:
     * HTTP/1.1 401 Unauthorized
     * {
     *     "message": "User not authenticated",
     *     "stack": ""
     * }
     * 
    */

    /**
     * @api {post} /api/v1/users/signin Create a user
     * @apiVersion 1.0.0
     * @apiName SignInUser
     * @apiGroup Users
     * @apiParamExample {json} Request-Example:
     * curl --location --request POST 'http://localhost:3333/api/v1/users/signin' \
     * --header 'Content-Type: application/json' \
     * --data-raw '{
     *     "name": "John Doe",
     *     "email": "john@doe.com",
     *     "password": "Test@123$"
     * }'
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 201 OK
     * Created
    */
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

    /**
     * @api {post} /api/v1/users/login Login user
     * @apiVersion 1.0.0
     * @apiName LoginUser
     * @apiGroup Users
     * @apiParamExample {json} Request-Example:
     * curl --location --request POST 'http://localhost:3333/api/v1/users/login' \
     * --header 'Content-Type: application/json' \
     * --data-raw '{
     *     "email": "john@doe.com",
     *     "password": "Test@123$"
     * }'
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     *   "expiresIn": 1603766102244
     * }
     * @apiUse Error401 
    */
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

    /**
     * @api {get} /api/v1/users List users
     * @apiVersion 1.0.0
     * @apiName GetUsers
     * @apiGroup Users
     * @apiHeader {String} x-auth-token Token de autenticação.
     * @apiUse Error401
     * @apiParamExample {json} Request-Example:
     * curl --location --request GET 'http://localhost:3333/api/v1/users/' \
     * --header 'Content-Type: application/json' \
     * --header 'x-auth-token: eyJpZCI6Ijc3NjRiOWI5LTQxZjEtNGZjNy1iYjEyLWJlMThiMmUyOWFlOCIsImlhdCI6MTYwMzcxNTIxMiwiZXhwIjoxNjA1MzYyMTI3NjMzfQ'
     * @apiSuccessExample Response-Example:
     * HTTP/1.1 200 OK
     * [
     *  {
     *    "Name": "Jeff"
     *  },
     *  {
     *    "Name": "Bob"
     *  }
     * ]
    */
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
