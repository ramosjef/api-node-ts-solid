import express from 'express'
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from 'inversify';
import { bindings } from './inversify.config';
import helmet from "helmet";
import dotenv from 'dotenv-safe'
import { AuthProvider } from './infrastructure/providers/AuthProvider';

dotenv.config();

(async () => {
    const container = new Container()
    await container.loadAsync(bindings)

    const app = new InversifyExpressServer(container, null, null, null, AuthProvider)

    app.setConfig((app) => {
        // Disable default cache
        app.set("etag", false);
        app.use(express.json())
        app.use(helmet());
    })

    const port = process.env.PORT || 3333
    const server = app.build()

    server.listen(port, () => {
        console.log(`server running at http://localhost:${port}`)
    })

})();
