import request from 'supertest';
import app from './app';
import { User } from './store/users';


describe('GET /api/users', () => {
  it('responds with JSON containing an empty list of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(6);
  });
});

describe('POST /api/users to create a new user', () => {
  it('creates a new user', async () => {
    const newUser: User = {
      username: 'Emily',
      age: 28,
      hobbies: ['Singing', 'Painting'],
    };
    const response = await request(app).post('/api/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.username).toEqual(newUser.username);
    expect(response.body.age).toEqual(newUser.age);
    expect(response.body.hobbies).toEqual(newUser.hobbies);
  });
});

describe('GET /api/users after creating a new user', () => {
  it('responds with an array of users containing the newly created user', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(7);
  });
});
