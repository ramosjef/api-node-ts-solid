import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { ILoginUseCase } from "./ILoginUseCase"
import { ILoginRequest } from "./ILoginRequest"
import { ILoginResponse } from "./ILoginResponse"
import { injectable, inject } from "inversify"
import { IUsersRepository } from "../../../domain/users/IUsersRepository"
import TYPES from "../../../domain/core/constants/types"
import { UserNotFoundException } from "../../exceptions/UserNotFoundException"
import { PasswordsDontMatchException } from "../../exceptions/PasswordsDontMatchException"
import { IUserSessionRepository } from "../../../domain/userSessions/IUserSessionRepository"
import { UserSession } from "../../../domain/userSessions/UserSession"
import LoginRequestValidation from "./LoginRequestValidation"

@injectable()
export class LoginUseCase implements ILoginUseCase {

    constructor(
        @inject(TYPES.UsersRepository) private readonly _usersRepository: IUsersRepository,
        @inject(TYPES.UserSessionRepository) private readonly _userSessionRepository: IUserSessionRepository,
    ) { }

    async Execute(_req: ILoginRequest): Promise<ILoginResponse> {

        await LoginRequestValidation.validateAsync(_req);

        let user = await this._usersRepository.FindByEmail(_req.email)
        if (!user) throw new UserNotFoundException()

        var doesPasswordMatch = await bcrypt.compare(_req.password, user.password)
        if (!doesPasswordMatch) throw new PasswordsDontMatchException()

        var token = this.GenerateToken({ id: user.id })

        var userSession = new UserSession({
            ...token,
            expiresIn: new Date(token.expiresIn),
            userId: user.id,
            createdAt: new Date(),
        })
        userSession.id = await this._userSessionRepository.Create(userSession);

        return token
    }

    private GenerateToken(object: { id: string }): ILoginResponse {
        let time = new Date().getTime() + (+process.env.TOKEN_EXPIRES_IN * 60 * 60 * 1000)
        let expiresIn = new Date().setTime(time)
        let token = jwt.sign(object, process.env.SECRET, { expiresIn: expiresIn })

        return {
            token,
            expiresIn
        }
    }
}
