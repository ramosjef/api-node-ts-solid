import { injectable } from "inversify";

@injectable()
export class InMemoryContext {

    private context = {}

    public Collection<T>(name: string): T[] {
        if (!this.context[name])
            this.context[name] = [] as T[];
        return this.context[name];
    }
}
