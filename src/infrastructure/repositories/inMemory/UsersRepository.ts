import { IUsersRepository } from "../../../domain/interfaces/repositories/IUsersRepository";
import { User } from "../../../domain/entities/User";
import { uuid } from 'uuidv4'
import { injectable } from "inversify";

@injectable()
export class UsersRepository implements IUsersRepository {

    private users: User[] = []

    public Select(predicate: (value: User, index: number, obj: User[]) => unknown, thisArg?: any): Promise<User[]> {
        let res = this.users.filter(predicate);
        return Promise.resolve(res);
    }

    public Create(user: User): Promise<string> {
        user.id = uuid();
        this.users.push(user)
        return Promise.resolve(user.id);
    }

    public Update(entity: User): Promise<void> {
        var user = this.users.find(p => p.id == entity.id);
        var idx = this.users.indexOf(user);
        this.users.splice(idx, 1, entity);
        return Promise.resolve()
    }

    public Find(
        predicate: (
            value: User,
            index: number,
            obj: User[]
        ) => unknown, thisArg?: any
    ): Promise<User> {
        var user = this.users.find(predicate);
        return Promise.resolve(user);
    }
}
