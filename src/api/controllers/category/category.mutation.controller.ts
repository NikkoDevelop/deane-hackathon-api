import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../../graphql/context';

export const CategoryMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('CreateOneCategory', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'CreateOneCategoryInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          await ctx.prisma.category.create({
            data: {
              name: data.name,
              connection_type: data.connection_type,
              category: data.categoryId,
            },
          });
          return {
            statusCode: 200,
            message: 'Category was created',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Create category has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Category created has error: ${error}`,
          };
        }
      },
    });

    t.field('UpdateOneCategory', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'UpdateOneCategoryInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          const oldCategoryData = await ctx.prisma.category.findUnique({
            where: {
              id: data.id,
            },
          });

          await ctx.prisma.category.update({
            where: {
              id: data.id,
            },
            data: {
              name: data.name ? data.name : oldCategoryData.name,
              connection_type: data.connection_type ? data.connection_type : oldCategoryData.connection_type,
              sub_category: data.sub_categoryId ? data.sub_categoryId : oldCategoryData.category_id,
            },
          });

          return {
            statusCode: 200,
            message: 'Category was updated',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Update category has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Category update has error: ${error}`,
          };
        };
      },
    });

    t.field('DeleteOneCategory', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'DeleteOneCategoryInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          await ctx.prisma.category.delete({
            where: {
              id: data.id,
            },
          });
          return {
            statusCode: 200,
            message: 'Category was deleted',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Delete category has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Category delete has error: ${error}`,
          };
        };
      },
    });
  },
});

export const CreateOneCategoryInput = inputObjectType({
  name: 'CreateOneCategoryInput',
  definition (t) {
    t.nonNull.string('name');
  },
});

export const UpdateOneCategoryInput = inputObjectType({
  name: 'UpdateOneCategoryInput',
  definition (t) {
    t.nonNull.int('id');
    t.string('name');
    t.field('connection_type', {
      type: 'ConnectionTypeEnum',
    });
    t.int('sub_categoryId');
  },
});

export const DeleteOneCategoryInput = inputObjectType({
  name: 'DeleteOneCategoryInput',
  definition (t) {
    t.nonNull.int('id');
  },
});

