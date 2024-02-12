import { IncomingMessage, ServerResponse } from 'node:http';
import { validate } from 'uuid';
import users from '../store/users';

const usersAPI = (req: IncomingMessage, res: ServerResponse<IncomingMessage>):void => {
  const { method, url } = req;
  if (url) {
    const getUser = (url: string) => {
      const params = url.split('/');
      if (params.length === 3) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
        return;
      } else if (params.length === 4) {
        const userId = params[3];
        if (validate(userId)) {
          const user = users.find((el) => el.id === userId);
          if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
            return;
          }
        }
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Non existing endpoint' }));
      }
    }

    switch (method) {
      case 'GET':
        getUser(url);
        break;
      default:
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Non existing endpoint' }));
        break;
    }
  }
}

export default usersAPI;
