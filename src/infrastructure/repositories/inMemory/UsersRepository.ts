import { IUsersRepository } from "../../../domain/users/IUsersRepository";
import { User } from "../../../domain/users/User";
import { inject, injectable } from "inversify";
import TYPES from "../../../domain/core/constants/types";
import { IGenericRepository } from "../../../domain/core/interfaces/IGenericRepository";
import { IGenericRepositoryFactory } from "../../../domain/core/interfaces/IGenericRepositoryFactory";

@injectable()
export class UsersRepository implements IUsersRepository {

    private readonly _key = TYPES.User;
    private readonly _genericRepository: IGenericRepository<User>;

    constructor(
        @inject(TYPES.GenericRepositoryFactory) genericRepositoryFactory: IGenericRepositoryFactory
    ) {
        this._genericRepository = genericRepositoryFactory.Create(this._key);
    }

    public Create(req: User): Promise<string> {
        return this._genericRepository.Create(req);
    }

    public Update(entity: User): Promise<void> {
        return this._genericRepository.Update(entity);
    }

    public async FindByEmail(email: string): Promise<User> {
        return this._genericRepository.Find(e => e.email == email);
    }

    public FindById(id: string): Promise<User> {
        return this._genericRepository.Find(e => e.id == id);
    }
}
