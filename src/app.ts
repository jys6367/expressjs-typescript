import 'reflect-metadata';
import * as express from "express";
import {Container} from 'typedi';
import AService from "./services/AService";

const app: express.Application = express();

app.get(
    "/",
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const aService = Container.get(AService);

        res.json({
            value: aService.test()
        })
    }
);

export default app;