export interface ICreate<TReq, TRes> {
    Create(req: TReq): Promise<TRes>
}