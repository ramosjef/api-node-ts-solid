import { uuid } from "uuidv4";
import { UserSession } from "../../../domain/entities/UserSession";
import { IUserSessionRepository } from "../../../domain/interfaces/repositories/IUserSessionRepository";
import { injectable } from "inversify";

@injectable()
export class UserSessionsRepository implements IUserSessionRepository {

    private userSessions: UserSession[] = []

    public Create(req: UserSession): Promise<string> {
        req.id = uuid();
        this.userSessions.push(req);
        return Promise.resolve(req.id);
    }

    public Find(
        predicate: (
            value: UserSession,
            index: number,
            obj: UserSession[]
        ) => unknown, thisArg?: any
    ): Promise<UserSession> {
        var res = this.userSessions.find(predicate);
        return Promise.resolve(res);
    }
}