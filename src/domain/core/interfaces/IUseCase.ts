export interface IUseCase<TReq, TRes> {
    Execute(req: TReq): Promise<TRes>
}