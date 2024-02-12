import { IncomingMessage, ServerResponse } from 'node:http';
import usersAPI from './api/users';

const app = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
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
}

export default app;
