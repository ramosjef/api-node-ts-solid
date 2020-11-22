import { ICreate } from "@domain/core/interfaces/ICreate";
import { ISelectByToken } from "@domain/core/interfaces/ISelectByToken";
import { UserSession } from "./UserSession";

export interface IUserSessionRepository extends
    ICreate<UserSession, Promise<string>>,
    ISelectByToken<Promise<UserSession>> {
}
