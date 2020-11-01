import { IGenericRepository } from "./IGenericRepository";

export interface IGenericRepositoryFactory {
    Create<T>(key?: string): IGenericRepository<T>
}