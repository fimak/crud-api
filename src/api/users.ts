import { IncomingMessage, ServerResponse } from 'node:http';
import { v4, validate } from 'uuid';
import users from '../store/users';

const usersAPI = (req: IncomingMessage, res: ServerResponse<IncomingMessage>):void => {
  const { method, url } = req;

  let bodyBuffer: Uint8Array[] = [];
  let body: string = '';

  req.on('data', (chunk) => {
    bodyBuffer.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(bodyBuffer).toString();

    if (url) {
      const getUser = () => {
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

      const postUser = () => {
        const { username, age, hobbies } = JSON.parse(body);

        if (username && age && hobbies) {
          const newUser = { id: v4(), username, age, hobbies };
          users.push(newUser);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(newUser));
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Username, age and hobbies are required' }));
        }
      }

      const putUser = () => {
        const { username, age, hobbies } = JSON.parse(body);
        const params = url.split('/');
        if (params.length === 4) {
          const userId = params[3];
          if (validate(userId)) {
            const userIndex = users.findIndex((el) => el.id === userId);
            if (userIndex === -1) {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'User not found' }));
              return;
            } else {
              users[userIndex] = {
                ...users[userIndex],
                username: username || users[userIndex].username,
                age: age || users[userIndex].age,
                hobbies: hobbies || users[userIndex].hobbies
              };
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(users[userIndex]));
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

      const deleteUser = () => {
        const params = url.split('/');
        if (params.length === 4) {
          const userId = params[3];
          const userIndex = users.findIndex(user => user.id === userId);
          if (userIndex === -1) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
          } else {
            users.splice(userIndex, 1);
            res.writeHead(204);
            res.end();
          }
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Non existing endpoint' }));
        }
      }

      switch (method) {
        case 'GET':
          getUser();
          break;
        case 'POST':
          postUser();
          break;
        case 'PUT':
          putUser();
          break;
        case 'DELETE':
          deleteUser();
          break;
        default:
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Non existing endpoint' }));
          break;
      }
    }
  });
}

export default usersAPI;
