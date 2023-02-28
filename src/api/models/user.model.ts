import { objectType } from 'nexus';

export * from '../controllers/user/user.mutation.controller';
export * from '../controllers/user/user.query.controller';

export const User = objectType({
  name: 'User',
  definition (t) {
    t.int('id');
    t.string('login');
    t.string('password');
    t.string('email');
    t.int('tokenVersion');
  },
});

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition (t) {
    t.string('token');
    t.field('user', { type: 'User' });
  },
});
