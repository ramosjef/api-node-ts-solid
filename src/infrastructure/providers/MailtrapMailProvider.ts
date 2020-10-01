import { IMailProvider, IMessage } from '../../domain/interfaces/providers/IMailProvider'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';
import { injectable } from 'inversify';

@injectable()
export class MailtrapMailProvider implements IMailProvider {
    private readonly _transporter: Mail

    constructor() {
        this._transporter = nodemailer.createTransport({
            host: "",
            port: 0,
            auth: {
                user: "",
                pass: ""
            }
        })
    }

    async SendMail(message: IMessage): Promise<void> {
        await this._transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email,
            },
            from: {
                name: message.from.name,
                address: message.from.email,
            },
            subject: message.subject,
            html: message.body,
        })
    }
}
