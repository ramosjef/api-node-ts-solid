import { injectable, unmanaged } from "inversify";
import { v4 } from "uuid";
import { IGenericRepository } from "@domain/core/interfaces/IGenericRepository";
import { InMemoryContext } from "./context/InMemoryContext";

@injectable()
export class GenericRepository<T extends { id?: string }> implements IGenericRepository<T>{

    protected readonly _context: InMemoryContext;
    private _key: string

    constructor(
        @unmanaged() key: string,
        @unmanaged() context: InMemoryContext
    ) {
        this._context = context;
        this._key = key;
    }

    public Find(query: any): Promise<T> {
        let result = this._Collection.find(query);
        return Promise.resolve(result);
    }

    public Create(req: T): Promise<string> {
        req.id = v4();
        this._Collection.push(req);
        return Promise.resolve(req.id);
    }

    public Update(entity: T): Promise<void> {
        let current = this._Collection.find(u => u.id == entity.id)
        let idx = this._Collection.indexOf(current);
        this._Collection.splice(idx, 1, entity);
        return Promise.resolve();
    }

    public Remove(entity: T): Promise<void> {
        let current = this._Collection.find(u => u.id == entity.id)
        let idx = this._Collection.indexOf(current);
        this._Collection.splice(idx, 1);
        return Promise.resolve();
    }

    private get _Collection(): T[] {
        return this._context.Collection<T>(this._key)
    }
}
