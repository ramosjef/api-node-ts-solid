import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { ILoginUseCase } from "./ILoginUseCase"
import { ILoginRequest } from "./ILoginRequest"
import { injectable, inject } from "inversify"
import { IUsersRepository } from "../../../domain/interfaces/repositories/IUsersRepository"
import TYPES from "../../../domain/constants/types"
import { UserNotFoundException } from "../../exceptions/UserNotFoundException"
import { PasswordsDontMatchException } from "../../exceptions/PasswordsDontMatchException"
import { MissingParameterException } from "../../exceptions/MissingParameterException"
import { IUserSessionRepository } from "../../../domain/interfaces/repositories/IUserSessionRepository"
import { UserSession } from "../../../domain/entities/UserSession"

@injectable()
export class LoginUseCase implements ILoginUseCase {

    constructor(
        @inject(TYPES.UsersRepository) private readonly _usersRepository: IUsersRepository,
        @inject(TYPES.UserSessionRepository) private readonly _userSessionRepository: IUserSessionRepository,
    ) { }

    async Execute(_req: ILoginRequest): Promise<UserSession> {

        if (!_req.email || !_req.password)
            throw new MissingParameterException("email or password is missing")

        let user = await this._usersRepository.Find(p => p.email == _req.email)
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

        return userSession;
    }

    private GenerateToken(object: { id: string }) {
        let time = new Date().getTime() + (+process.env.TOKEN_EXPIRES_IN * 60 * 60 * 1000)
        let expiresIn = new Date().setTime(time)
        let token = jwt.sign(object, process.env.SECRET, { expiresIn: expiresIn })

        return {
            token,
            expiresIn
        }
    }
}
