import { UserSession } from "@domain/userSessions/UserSession";
import { IUserSessionRepository } from "@domain/userSessions/IUserSessionRepository";
import { inject, injectable } from "inversify";
import TYPES from "@domain/core/constants/types";
import { IGenericRepository } from "@domain/core/interfaces/IGenericRepository";
import { IGenericRepositoryFactory } from "@domain/core/interfaces/IGenericRepositoryFactory";

@injectable()
export class UserSessionsRepository implements IUserSessionRepository {

    private readonly _key = TYPES.UserSession;
    private readonly _genericRepository: IGenericRepository<UserSession>;

    constructor(
        @inject(TYPES.GenericRepositoryFactory) genericRepositoryFactory: IGenericRepositoryFactory,
    ) {
        this._genericRepository = genericRepositoryFactory.Create(this._key);
    }

    public Create(req: UserSession): Promise<string> {
        return this._genericRepository.Create(req)
    }

    public SelectByToken(token: string): Promise<UserSession> {
        return this._genericRepository.Find(p => p.token == token);
    }
}
