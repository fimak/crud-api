interface User {
  id: number;
  username: string;
  age: number;
  hobbies: string[];
}

const users = [
  { id: '1', username: 'Alex', age: 34, hobbies: ['boxing']},
  { id: '2', username: 'Sergey', age: 33, hobbies: ['hockey']},
  { id: '3', username: 'Vladimir', age: 32, hobbies: ['football']},
  { id: '4', username: 'Artur', age: 33, hobbies: ['basketball']},
  { id: '5', username: 'Dmitriy', age: 30, hobbies: ['swimming']},
  { id: '6', username: 'Denis', age: 29, hobbies: ['shooting']},
];

export default users;
