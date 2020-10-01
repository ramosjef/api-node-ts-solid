import { IGetUserByTokenUseCase } from "./IGetUserByTokenUseCase";
import { User } from "../../../domain/entities/User";
import { injectable, inject } from "inversify";
import TYPES from "../../../domain/constants/types";
import { IUsersRepository } from "../../../domain/interfaces/repositories/IUsersRepository";
import { IUserSessionRepository } from "../../../domain/interfaces/repositories/IUserSessionRepository";

@injectable()
export class GetUserByTokenUseCase implements IGetUserByTokenUseCase {
    @inject(TYPES.UsersRepository) private readonly _usersRepository: IUsersRepository
    @inject(TYPES.UserSessionRepository) private readonly _userSessionRepository: IUserSessionRepository

    public async Execute(token: string): Promise<User> {

        let session = await this._userSessionRepository.Find(p => p.token == token);

        if (session) {

            let user = await this._usersRepository.Find(p => p.id == session.userId);
            return user;
        }

        return null
    }

}
