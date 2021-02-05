import app from "./app";
import {createServer} from "http";
import user from './routes/user'

const port: number = Number(process.env.PORT) || 3000;

const server = createServer(app);

server.listen(port, () => {
    console.log(`${port}aaddf`);
});

export default server;