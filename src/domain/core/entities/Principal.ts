import { interfaces } from "inversify-express-utils";
import { User } from "../../users/User";

export class Principal implements interfaces.Principal {
    details: User;

    constructor(user: User) {
        this.details = user
    }

    isAuthenticated(): Promise<boolean> {
        let res = (this.details && this.details.id != null && this.details.id != undefined);
        return Promise.resolve(res)
    }

    isResourceOwner(resourceId: any): Promise<boolean> {
        return Promise.resolve(true)
    }

    isInRole(role: string): Promise<boolean> {
        return Promise.resolve(this.details && this.details.role === role)
    }

}