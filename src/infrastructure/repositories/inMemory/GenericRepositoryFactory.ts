import { inject, injectable } from "inversify";
import TYPES from "@domain/core/constants/types";
import { IGenericRepository } from "@domain/core/interfaces/IGenericRepository";
import { IGenericRepositoryFactory } from "@domain/core/interfaces/IGenericRepositoryFactory";
import { GenericRepository } from "./GenericRepository";
import { InMemoryContext } from "./context/InMemoryContext";

@injectable()
export class GenericRepositoryFactory implements IGenericRepositoryFactory {

    private readonly _context: InMemoryContext;

    constructor(
        @inject(TYPES.DbContext) context: InMemoryContext
    ) {
        this._context = context;
    }

    public Create<T>(key: string): IGenericRepository<T> {
        return new GenericRepository<T>(key, this._context);
    }

}
