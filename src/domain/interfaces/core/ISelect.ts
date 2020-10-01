export interface ISelect<T> {
    Select(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): Promise<T[]>
}