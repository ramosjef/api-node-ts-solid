import { injectable } from "inversify";
import { Collection, Db, MongoClient } from "mongodb";

@injectable()
export class MongoDbContext {
    private isConnected = false;
    private db: Db;

    public async Collection<T>(name: string): Promise<Collection<T>> {
        const db = await this.GetConnection()
        return db.collection<T>(name)
    }

    private async GetConnection(): Promise<Db> {

        const { MONGO_HOST, MONGO_SSL, MONGO_DATABASE, MONGO_USER, MONGO_PASSWORD } = process.env
        const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority&${MONGO_SSL}`;

        try {

            if (!this.isConnected) {
                await this.Connect();
            }

            return this.db;

        } catch (err) {

            console.log(`
                Erro ao conectar ao mongoDb uri: ${uri}. 
                Detalhes do erro: ${JSON.stringify(err)}`)

            throw err;
        }
    }

    public async Connect(): Promise<void> {
        const { MONGO_HOST, MONGO_SSL, MONGO_DATABASE, MONGO_USER, MONGO_PASSWORD } = process.env
        const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority&${MONGO_SSL}`;

        const client = await MongoClient.connect(
            uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })

        this.db = client.db(MONGO_DATABASE);

        this.isConnected = true;

        console.log(`Conectado ao mongoDb uri: ${uri}`)
    }
}
