import 'dotenv/config';
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import config from './config';
import app from './app';

const server = createServer((req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  app(req, res);
});

server.listen(config.port, config.host, () => {
  console.log(`Server successfully started at ${config.host}:${config.port}`);
});
