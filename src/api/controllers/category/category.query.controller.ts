import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../../graphql/context';

export const CategoryQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getAllCategories', {
      type: 'Category',
      resolve: async (_, __, ctx: Context) => {
        return ctx.prisma.category.findMany();
      },
    });
    t.field('getCategoryById', {
      type: 'Category',
      args: { data: nonNull(arg({ type: GetCategoryInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.category.findUnique({
          where: {
            id: data.categoryId,
          },
        });
      },
    });
    t.list.field('getCategorysByIds', {
      type: 'Category',
      args: { data: nonNull(arg({ type: GetCategoriesInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.category.findMany({
          where: {
            id: {
              in: data.categoryIds,
            },
          },
        });
      },
    });
  },
});

export const GetCategoryInput = inputObjectType({
  name: 'GetCategoryInput',
  definition (t) {
    t.nonNull.int('categoryId');
  },
});

export const GetCategoriesInput = inputObjectType({
  name: 'GetCategoriesInput',
  definition (t) {
    t.list.nonNull.int('categoryIds');
  },
});
