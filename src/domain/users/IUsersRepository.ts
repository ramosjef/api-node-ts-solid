import { ICreate } from "@domain/core/interfaces/ICreate";
import { IFindByEmail } from "@domain/core/interfaces/IFindByEmail";
import { IFindById } from "@domain/core/interfaces/IFindById";
import { IUpdate } from "@domain/core/interfaces/IUpdate";
import { User } from "./User";

export interface IUsersRepository extends
    ICreate<User, Promise<string>>,
    IUpdate<User>,
    IFindById<string, Promise<User>>,
    IFindByEmail<Promise<User>> {
}
