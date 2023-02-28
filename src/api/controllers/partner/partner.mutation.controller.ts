import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../../graphql/context';

export const PartnerMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('CreateOnePartner', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'CreateOnePartnerInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          const exhibitor = await ctx.prisma.exhibitor.findFirst({
            where: {
              owner: {
                id: ctx.user.id,
              },
            },
          });

          await ctx.prisma.partner.create({
            data: {
              name: data.name,
              exhibitor: {
                connect: {
                  id: exhibitor.id,
                },
              },
            },
          });

          return {
            statusCode: 200,
            message: 'Partner was create',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Create partner has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Create partner has error: ${error}`,
          };
        }
      },
    });

    t.field('UpdateOnePartner', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'UpdateOnePartnerInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          const oldPartnerData = ctx.prisma.partner.findUnique({
            where: {
              id: data.id,
            },
          });

          await ctx.prisma.partner.update({
            where: {
              id: data.id,
            },
            data: {
              name: data.name ? data.name : oldPartnerData.name,
              display_order: data.display_order ? data.display_order : oldPartnerData.display_order,
            },
          });

          return {
            statusCode: 200,
            message: 'Partner was updated',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Update partner has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Update partner has error: ${error}`,
          };
        }
      },
    });

    t.field('DeleteOnePartner', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'DeleteOnePartnerInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          await ctx.prisma.partner.delete({
            where: {
              id: data.id,
            },
          });

          return {
            statusCode: 200,
            message: 'Partner was delete',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Delete partner has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Delete partner has error: ${error}`,
          };
        }
      },
    });
  },
});

export const CreateOnePartnerInput = inputObjectType({
  name: 'CreateOnePartnerInput',
  definition (t) {
    t.nonNull.string('name');
  },
});

export const UpdateOnePartnerInput = inputObjectType({
  name: 'UpdateOnePartnerInput',
  definition (t) {
    t.nonNull.int('id');
    t.string('name');
    t.int('display_order');
  },
});

export const DeleteOnePartnerInput = inputObjectType({
  name: 'DeleteOnePartnerInput',
  definition (t) {
    t.nonNull.int('id');
  },
});
