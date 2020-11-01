import { injectable, unmanaged } from "inversify";
import { Collection, FilterQuery, OptionalId } from "mongodb";
import { IGenericRepository } from "../../../domain/core/interfaces/IGenericRepository";
import { MongoDbContext } from "./context/MongoDbContext";

@injectable()
export class GenericRepository<T extends { id?: string, _id?: string }> implements IGenericRepository<T> {

    private readonly _key: string
    private readonly _context: MongoDbContext;

    constructor(
        @unmanaged() key: string,
        @unmanaged() context: MongoDbContext
    ) {
        this._key = key;
        this._context = context;
    }

    public async Find(query: any): Promise<T> {
        let collection = await this.DbSet()
        let cursor = collection.find(query as FilterQuery<T>);
        let result = await cursor.toArray();
        return this._ReadMapper(result[0] ?? null);
    }

    public async Create(req: T): Promise<string> {
        let collection = await this.DbSet();
        let res = await collection.insertOne(req as OptionalId<T>)
        return `${res.insertedId}`;
    }

    public async Update(entity: T): Promise<void> {
        let collection = await this.DbSet();
        await collection.updateOne({ _id: new Object(entity.id) }, { $set: entity })
    }

    public async Remove(entity: T): Promise<void> {
        let collection = await this.DbSet();
        collection.deleteOne({ _id: new Object(entity.id) })
    }

    private DbSet(): Promise<Collection<T>> {
        return this._context.Collection<T>(this._key);
    }

    private _ReadMapper(model: T) {
        if (!model) return null;
        model = JSON.parse(JSON.stringify(model));
        Object.defineProperty(model, "id", Object.getOwnPropertyDescriptor(model, "_id"));
        delete model["_id"];
        return model as T;
    }
}
