interface IAddress {
    email: string,
    name: string
}

interface IMessage {
    to: IAddress,
    from: IAddress,
    subject: string,
    body: string
}

interface IMailProvider {
    SendMail(message: IMessage): Promise<void>
}

export {
    IMessage,
    IMailProvider
}