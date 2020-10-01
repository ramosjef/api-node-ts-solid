import { User } from "../../entities/User";
import { ICreate } from "../core/ICreate";
import { IFind as IFind } from "../core/IFind";
import { ISelect } from "../core/ISelect";
import { IUpdate } from "../core/IUpdate";

export interface IUsersRepository extends
    ICreate<User, string>,
    IUpdate<User>,
    ISelect<User>,
    IFind<User> {

}
