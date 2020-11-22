import express from 'express'
import { inject, injectable } from "inversify";
import { interfaces } from "inversify-express-utils";
import { Principal } from '@domain/core/entities/Principal';
import { IAuthProvider } from '@domain/core/interfaces/IAuthProvider';
import TYPES from '@domain/core/constants/types';
import { IUsersRepository } from '@domain/users/IUsersRepository';
import { IUserSessionRepository } from '@domain/userSessions/IUserSessionRepository';

const authService = inject(TYPES.UsersRepository);

@injectable()
export class AuthProvider implements IAuthProvider {

    @authService private readonly _usersRepository: IUsersRepository
    @inject(TYPES.UserSessionRepository) private readonly _userSessionsRepository: IUserSessionRepository

    public async getUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<interfaces.Principal> {
        const token = req.headers["x-auth-token"]

        if (token) {

            var session = await this._userSessionsRepository.SelectByToken(`${token}`);
            if (session) {
                const user = await this._usersRepository.FindById(session.userId);
                const principal = new Principal(user);
                return principal;
            }
        }

        return new Principal({});

    }
}
