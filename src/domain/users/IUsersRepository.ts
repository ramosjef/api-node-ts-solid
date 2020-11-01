import { ICreate } from "../core/interfaces/ICreate";
import { IFindByEmail } from "../core/interfaces/IFindByEmail";
import { IFindById } from "../core/interfaces/IFindById";
import { IUpdate } from "../core/interfaces/IUpdate";
import { User } from "./User";

export interface IUsersRepository extends
    ICreate<User, Promise<string>>,
    IUpdate<User>,
    IFindById<string, Promise<User>>,
    IFindByEmail<Promise<User>> {
}
