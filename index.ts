import 'dotenv/config';
import { createServer } from 'node:http';
import config from './config';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});

server.listen(config.port, config.host, () => {
  console.log(`Server successfully started at ${config.host}:${config.port}`);
});
