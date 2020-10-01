import express from 'express'
import TYPES from '../../domain/constants/types';
import { injectable, inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import { IGetUserByTokenUseCase } from '../../application/useCases/GetUserByToken/IGetUserByTokenUseCase';
import { Principal } from '../../domain/entities/Principal';

const authService = inject(TYPES.GetUserByTokenUseCase);

@injectable()
export class AuthProvider implements interfaces.AuthProvider {

    @authService private readonly _getUserByTokenUseCase: IGetUserByTokenUseCase

    public async getUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<interfaces.Principal> {
        const token = req.headers["x-auth-token"]

        if (token) {
            const user = await this._getUserByTokenUseCase.Execute(token.toString())
            const principal = new Principal(user);
            return principal;
        } else {
            return new Principal({});
        }
    }
}
