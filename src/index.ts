import 'dotenv/config';
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import config from './config';
import usersAPI from './api/users';

const server = createServer((req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const { url } = req;

  if (url && url.startsWith('/api/users')) {
    usersAPI(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Non existing endpoint' }));
  }
});

server.listen(config.port, config.host, () => {
  console.log(`Server successfully started at ${config.host}:${config.port}`);
});