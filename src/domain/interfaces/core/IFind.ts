export interface IFind<T> {
    Find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): Promise<T>
}
