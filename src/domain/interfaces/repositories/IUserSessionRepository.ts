import { UserSession } from "../../entities/UserSession";
import { ICreate } from "../core/ICreate";
import { IFind } from "../core/IFind";

export interface IUserSessionRepository extends
    ICreate<UserSession, string>,
    IFind<UserSession> {
}