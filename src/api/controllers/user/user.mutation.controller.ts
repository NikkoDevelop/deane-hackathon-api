import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import bcrypt from 'bcrypt';

import { createRefreshToken } from '../../../integrations/jwt';
import { Context } from '../../../graphql/context';

export const ClientMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('ChangeEmail', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: ChangeEmailInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          if (await bcrypt.compare(data.password, ctx.user.password)) {
            await ctx.prisma.user.update({
              where: {
                id: ctx.user.id,
              },
              data: {
                email: data.newEmail,
              },
            });
            return {
              statusCode: 200,
              message: 'Email was changed',
              error: undefined,
            };
          }
          return {
            stausCode: 403,
            message: undefined,
            error: 'Password is not correct',
          };
        } catch (error) {
          return {
            statusCode: 500,
            message: undefined,
            error,
          };
        }
      },
    });

    t.field('ChangePassword', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: ChangePasswordInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          if (await bcrypt.compare(data.oldPassword, ctx.user.password)) {
            // eslint-disable-next-line no-magic-numbers
            const newPasswordHash = bcrypt.hash(data.newPassword, 7);

            await ctx.prisma.user.update({
              where: {
                id: ctx.user.id,
              },
              data: {
                password: newPasswordHash,
              },
            });

            return {
              statusCode: 200,
              message: 'Password was changed',
              error: undefined,
            };
          }
          return {
            statusCode: 403,
            message: undefined,
            error: 'Old password is not correct',
          };
        } catch (error) {
          return {
            statusCode: 500,
            message: undefined,
            error,
          };
        }
      },
    });

    t.field('SignUp', {
      type: 'AuthPayload',
      args: { data: nonNull(arg({ type: SignUpInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const payload = await ctx.dataSources.usersAPI.createUser(data);

        ctx.response.cookie('jid', createRefreshToken(payload.user), {
          httpOnly: true,
          secure: process.env.ENV_NAME === 'PRODUCTION',
        });

        return payload;
      },
    });
    t.field('SignIn', {
      type: 'AuthPayload',
      args: { data: nonNull(arg({ type: SignInInput })) },
      resolve: async (_, { data }, { dataSources, response }) => {
        const payload = await dataSources.usersAPI.signIn(data);

        response.cookie('jid', createRefreshToken(payload.user), {
          httpOnly: true,
          secure: process.env.ENV_NAME === 'PRODUCTION',
        });

        return payload;
      },
    });
  },
});

export const SignUpInput = inputObjectType({
  name: 'SignUpInput',
  definition (t) {
    t.nonNull.string('login');
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});

export const SignInInput = inputObjectType({
  name: 'SignInInput',
  definition (t) {
    t.nonNull.string('login');
    t.nonNull.string('password');
  },
});

export const ChangePasswordInput = inputObjectType({
  name: 'ChangePasswordInput',
  definition (t) {
    t.nonNull.string('oldPassword');
    t.nonNull.string('newPassword');
  },
});

export const ChangeEmailInput = inputObjectType({
  name: 'ChangeEmailInput',
  definition (t) {
    t.nonNull.string('newEmail');
    t.nonNull.string('password');
  },
});
