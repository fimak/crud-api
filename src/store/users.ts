import { v1 } from 'uuid';

export interface User {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: User[] = [
  { id: v1(), username: 'Alex', age: 34, hobbies: ['boxing']},
  { id: v1(), username: 'Sergey', age: 33, hobbies: ['hockey']},
  { id: v1(), username: 'Vladimir', age: 32, hobbies: ['football']},
  { id: v1(), username: 'Artur', age: 33, hobbies: ['basketball']},
  { id: v1(), username: 'Dmitriy', age: 30, hobbies: ['swimming']},
  { id: v1(), username: 'Denis', age: 29, hobbies: ['shooting']},
];

export default users;
