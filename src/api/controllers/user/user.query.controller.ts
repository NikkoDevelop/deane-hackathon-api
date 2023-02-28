import { arg, extendType, inputObjectType, nonNull } from 'nexus';

import { Context } from '../../../graphql/context';

export const UserQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('GetUser', {
      type: 'User',
      args: { data: nonNull(arg({ type: GetUserInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.user.findFirst({
          where: {
            OR: [
              {
                id: data.userId,
              },
              {
                login: data.login,
              },
            ],
          },
        });
      },
    });

    t.list.field('GetUsers', {
      type: 'User',
      resolve: async (_, __, ctx: Context) => {
        return ctx.prisma.user.findMany();
      },
    });

    t.field('me', {
      type: 'User',
      resolve: async (_, __, ctx: Context) => {
        if (ctx.user) {
          return ctx.user;
        }
        throw new Error('Not authenticated');
      },
    });
  },
});

export const GetUserInput = inputObjectType({
  name: 'GetUserInput',
  definition (t) {
    t.int('userId');
    t.string('login');
  },
});
