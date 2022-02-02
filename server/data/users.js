import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Jon Smith',
    email: 'jon@example.com',
    password: bcrypt.hashSync('Tester1', 10),
    isAdmin: true,
  },
  {
    name: 'Toni Miller',
    email: 'toni@example.com',
    password: bcrypt.hashSync('Tester1', 10),
  },
  {
    name: 'Sara Wilson',
    email: 'sara@example.com',
    password: bcrypt.hashSync('Tester1', 10),
  },
];

export default users;
