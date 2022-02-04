import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Jon Smith',
    email: 'jon@example.com',
    password: bcrypt.hashSync('Tester1', 10),
    rating: 4.5,
    numReviews: 3,
    isAdmin: true,
  },
  {
    name: 'Toni Miller',
    email: 'toni@example.com',
    password: bcrypt.hashSync('Tester1', 10),
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Sara Wilson',
    email: 'sara@example.com',
    password: bcrypt.hashSync('Tester1', 10),
    rating: 4.5,
    numReviews: 3,
  },
];

export default users;
