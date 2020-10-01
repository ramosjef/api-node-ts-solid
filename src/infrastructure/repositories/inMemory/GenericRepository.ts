import { uuid } from "uuidv4";
import { IGenericRepository } from "../../../domain/interfaces/repositories/IGenericRepository";
import { injectable } from "inversify";

@injectable()
export class GenericRepository<TModel extends { id: string }> implements IGenericRepository<TModel, string> {

    private genericArray: TModel[] = []

    public Select(
        predicate: (
            value: TModel,
            index: number,
            obj: TModel[]
        ) => unknown, thisArg?: any
    ): Promise<TModel[]> {
        var res = this.genericArray.filter(predicate);
        return Promise.resolve(res);
    }

    public Find(
        predicate: (
            value: TModel,
            index: number,
            obj: TModel[]
        ) => unknown, thisArg?: any
    ): Promise<TModel> {
        let res = this.genericArray.find(predicate);
        return Promise.resolve(res);
    }

    public Create(req: TModel): Promise<string> {
        req.id = uuid()
        this.genericArray.push(req);
        return Promise.resolve(req.id);
    }

    public Update(entity: TModel): Promise<void> {
        var entityUpd = this.genericArray.find(p => p.id == entity.id);
        var idx = this.genericArray.indexOf(entityUpd);
        this.genericArray.splice(idx, 1, entity);
        return Promise.resolve()
    }

    public Remove(entity: TModel): Promise<void> {
        var entityUpd = this.genericArray.find(p => p.id == entity.id);
        var idx = this.genericArray.indexOf(entityUpd);
        this.genericArray.splice(idx, 1);
        return Promise.resolve()
    }

}