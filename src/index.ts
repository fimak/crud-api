import 'dotenv/config';
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import config from './config';
import usersAPI from './api/users';

const server = createServer((req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const { url } = req;

  try {
    if (url && url.startsWith('/api/users')) {
      usersAPI(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Non existing endpoint' }));
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Something went wrong' }));
  }
});

server.listen(config.port, config.host, () => {
  console.log(`Server successfully started at ${config.host}:${config.port}`);
});
