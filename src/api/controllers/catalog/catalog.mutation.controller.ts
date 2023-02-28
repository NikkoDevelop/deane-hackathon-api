import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../../graphql/context';

export const CatalogMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('CreateOneCatalog', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'CreateOneCatalogInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          const exhibitor = await ctx.prisma.exhibitor.findFirst({
            where: {
              owner: {
                id: ctx.user.id,
              },
            },
          });

          await ctx.prisma.catalog.create({
            data: {
              is_visible_cost: data.is_visible_cost,
              author: {
                connect: {
                  id: exhibitor.id,
                },
              },
            },
          });
          return {
            statusCode: 200,
            message: 'Catalog was created',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Create catalog has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Catalog created has error: ${error}`,
          };
        }
      },
    });

    t.field('UpdateOneCatalog', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'UpdateOneCatalogInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          const oldCatalogData = await ctx.prisma.catalog.findUnique({
            where: {
              id: data.id,
            },
          });

          await ctx.prisma.catalog.update({
            where: {
              id: data.id,
            },
            data: {
              is_visible_cost: data.is_visible_cost ? data.is_visible_cost : oldCatalogData.is_visible_cost,
            },
          });

          return {
            statusCode: 200,
            message: 'Catalog was updated',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Update catalog has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Catalog updated has error: ${error}`,
          };
        }
      },
    });

    t.field('DeleteOneCatalog', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'DeleteOneCatalogInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          await ctx.prisma.catalog.delete({
            where: {
              id: data.id,
            },
          });
          return {
            statusCode: 200,
            message: 'Catalog was deleted',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Delete catalog has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Catalog delete has error: ${error}`,
          };
        }
      },
    });
  },
});

export const CreateOneCatalogInput = inputObjectType({
  name: 'CreateOneCatalogInput',
  definition (t) {
    t.nonNull.field('is_visible_cost', {
      type: 'VisibleCostEnum',
    });
  },
});

export const UpdateOneCatalogInput = inputObjectType({
  name: 'UpdateOneCatalogInput',
  definition (t) {
    t.nonNull.int('id');
    t.field('is_visible_cost', {
      type: 'VisibleCostEnum',
    });
  },
});

export const DeleteOneCatalogInput = inputObjectType({
  name: 'DeleteOneCatalogInput',
  definition (t) {
    t.nonNull.int('id');
  },
});

