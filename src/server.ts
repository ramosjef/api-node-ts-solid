import express from 'express'
import "reflect-metadata";
import 'dotenv/config'
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from 'inversify';
import { bindings as bindings_dev } from '@config/inversify.config.dev';
import { bindings as bindings_prod } from '@config/inversify.config.prod';
import helmet from 'helmet';
import morgan from 'morgan'
import { AuthProvider } from '@providers/AuthProvider';

(async () => {
    const container = new Container()
    await container.loadAsync(
        process.env.NODE_ENV == 'dev' ?
            bindings_dev :
            bindings_prod)

    const app = new InversifyExpressServer(container, null, null, null, AuthProvider)

    app.setConfig((app) => {
        // Disable default cache
        app.set("etag", false);
        app.use(express.json());
        app.use(helmet());
        app.use(morgan('dev'));
    })

    const port = process.env.PORT || 3333
    const server = app.build()

    server.listen(port, () => {
        console.log(`server running at http://localhost:${port}`)
    })

})();
