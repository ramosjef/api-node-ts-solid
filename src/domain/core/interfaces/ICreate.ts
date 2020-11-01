export interface ICreate<TReq, TRes> {
    Create(req: TReq): TRes
}
