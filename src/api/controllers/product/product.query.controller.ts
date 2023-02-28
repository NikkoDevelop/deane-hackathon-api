import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../../graphql/context';

export const ProductQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getAllProducts', {
      type: 'Product',
      resolve: async (_, __, ctx: Context) => {
        return ctx.prisma.product.findMany();
      },
    });
    t.field('getProductById', {
      type: 'Product',
      args: { data: nonNull(arg({ type: GetProductInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.product.findUnique({
          where: {
            id: data.productId,
          },
        });
      },
    });
    t.list.field('getProductByIds', {
      type: 'Product',
      args: { data: nonNull(arg({ type: GetProductsInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.product.findMany({
          where: {
            id: {
              in: data.productIds,
            },
          },
        });
      },
    });
  },
});

export const GetProductInput = inputObjectType({
  name: 'GetProductInput',
  definition (t) {
    t.nonNull.int('productId');
  },
});

export const GetProductsInput = inputObjectType({
  name: 'GetProductsInput',
  definition (t) {
    t.list.nonNull.int('productIds');
  },
});
