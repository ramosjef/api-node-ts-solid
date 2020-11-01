import { ICreate } from "../core/interfaces/ICreate";
import { ISelectByToken } from "../core/interfaces/ISelectByToken";
import { UserSession } from "./UserSession";

export interface IUserSessionRepository extends
    ICreate<UserSession, Promise<string>>,
    ISelectByToken<Promise<UserSession>> {
}
