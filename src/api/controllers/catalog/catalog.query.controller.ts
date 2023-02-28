import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../../graphql/context';

export const CatalogQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getAllCatalogs', {
      type: 'Catalog',
      resolve: async (_, __, ctx: Context) => {
        return ctx.prisma.catalog.findMany();
      },
    });
    t.field('getCatalogById', {
      type: 'Catalog',
      args: { data: nonNull(arg({ type: GetCatalogInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.catalog.findUnique({
          where: {
            id: data.catalogId,
          },
        });
      },
    });
    t.list.field('getCatalogsByIds', {
      type: 'Catalog',
      args: { data: nonNull(arg({ type: GetCatalogsInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.catalog.findMany({
          where: {
            id: {
              in: data.catalogIds,
            },
          },
        });
      },
    });
  },
});

export const GetCatalogInput = inputObjectType({
  name: 'GetCatalogInput',
  definition (t) {
    t.nonNull.int('catalogId');
  },
});

export const GetCatalogsInput = inputObjectType({
  name: 'GetCatalogsInput',
  definition (t) {
    t.list.nonNull.int('catalogIds');
  },
});
