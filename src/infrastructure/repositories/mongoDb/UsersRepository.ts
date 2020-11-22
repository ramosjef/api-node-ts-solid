import { inject, injectable } from "inversify";
import { ObjectId } from "mongodb";
import TYPES from "@domain/core/constants/types";
import { User } from "@domain/users/User";
import { IGenericRepository } from "@domain/core/interfaces/IGenericRepository";
import { IGenericRepositoryFactory } from "@domain/core/interfaces/IGenericRepositoryFactory";
import { IUsersRepository } from "@domain/users/IUsersRepository";

@injectable()
export class UsersRepository implements IUsersRepository {

    private readonly _key = TYPES.UserSession;
    private readonly _genericRepository: IGenericRepository<User>

    constructor(
        @inject(TYPES.GenericRepositoryFactory) genericRepositoryFactory: IGenericRepositoryFactory,
    ) {
        this._genericRepository = genericRepositoryFactory.Create<User>(this._key);
    }

    public async Create(req: User): Promise<string> {
        return await this._genericRepository.Create(req);
    }

    public async Update(entity: User): Promise<void> {
        return await this._genericRepository.Update(entity);
    }

    public async FindByEmail(email: string): Promise<User> {
        return await this._genericRepository.Find({ email: email });
    }

    public async FindById(id: string): Promise<User> {
        return await this._genericRepository.Find({ _id: new ObjectId(id) });
    }
}
