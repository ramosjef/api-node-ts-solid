import { inject, injectable } from "inversify";
import TYPES from "../../../domain/core/constants/types";
import { IGenericRepository } from "../../../domain/core/interfaces/IGenericRepository";
import { IGenericRepositoryFactory } from "../../../domain/core/interfaces/IGenericRepositoryFactory";
import { UserSession } from "../../../domain/userSessions/UserSession";
import { IUserSessionRepository } from "../../../domain/userSessions/IUserSessionRepository";

@injectable()
export class UserSessionsRepository implements IUserSessionRepository {

    private readonly _key = TYPES.UserSession;
    private readonly _genericRepository: IGenericRepository<UserSession>;

    constructor(
        @inject(TYPES.GenericRepositoryFactory) genericRepositoryFactory: IGenericRepositoryFactory,
    ) {
        this._genericRepository = genericRepositoryFactory.Create<UserSession>(this._key);
    }

    public async Create(req: UserSession): Promise<string> {
        return await this._genericRepository.Create(req);
    }

    public async SelectByToken(token: string): Promise<UserSession> {
        return await this._genericRepository.Find({ token: token });
    }
}
