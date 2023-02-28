import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../../graphql/context';

export const ProductMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('CreateOneProduct', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'CreateOneProductInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          const exhibitor = await ctx.prisma.exhibitor.findFirst({
            where: {
              owner: {
                id: ctx.user.id,
              },
            },
          });

          await ctx.prisma.product.create({
            data: {
              type: data.type, // ProductTypeEnum
              manufacturer: data.manufacturer, // String?
              brand: data.brand, // String?
              name: data.name, // String?
              description: data.description ? data.description : null, // String?
              cost: data.cost, // Float?
              meta_tags: data.meta_tags ? data.meta_tags : [], // MetaTagsEnum[]
              possibility_of_purchase: data.possibility_of_purchase ? data.possibility_of_purchase : [], // PossibilityOfPurchaseEnum[]
              min_batch: data.min_batch ? data.min_batch : null, // Int?
              payment_method: data.payment_method ? data.payment_method : null, // PaymentMethodEnum[]
              delivery_method: data.delivery_method ? data.delivery_method : null, // DeliveryMethodEnum[]
              standards: data.standards, // StandardEnum[]
              analogs: data.analogs ? data.analogs : null, // String?
              exhibitor: {
                connect: {
                  id: exhibitor.id,
                },
              },
            },
          });

          return {
            statusCode: 200,
            message: 'Product was create',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Create product has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Create product has error: ${error}`,
          };
        }
      },
    });

    t.field('UpdateOneProduct', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'UpdateOneProductInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          const oldProductData = await ctx.prisma.product.findUnique({
            where: {
              id: data.id,
            },
          });

          await ctx.prisma.product.update({
            where: {
              id: data.id,
            },
            data: {
              type: data.type ? data.type : oldProductData.type, // ProductTypeEnum
              manufacturer: data.manufacturer ? data.manufacturer : oldProductData.manufacturer, // String?
              brand: data.brand ? data.brand : oldProductData.brand, // String?
              name: data.name ? data.name : oldProductData.name, // String?
              description: data.description ? data.description : oldProductData.description, // String?
              cost: data.cost ? data.cost : oldProductData.cost, // Float?
              meta_tags: data.meta_tags ? data.meta_tags : oldProductData.meta_tags, // MetaTagsEnum[]
              possibility_of_purchase: data.possibility_of_purchase ? data.possibility_of_purchase : oldProductData.possibility_of_purchase, // PossibilityOfPurchaseEnum[]
              min_batch: data.min_batch ? data.min_batch : oldProductData.min_batch, // Int?
              payment_method: data.payment_method ? data.payment_method : oldProductData.payment_method, // PaymentMethodEnum[]
              delivery_method: data.delivery_method ? data.delivery_method : oldProductData.delivery_method, // DeliveryMethodEnum[]
              standards: data.standards ? data.standards : oldProductData.standards, // StandardEnum[]
              analogs: data.analogs ? data.analogs : oldProductData.analogs, // String?
            },
          });

          return {
            statusCode: 200,
            message: 'Product was updated',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Update product has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Update product has error: ${error}`,
          };
        }
      },
    });

    t.field('DeleteOneProduct', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'DeleteOneProductInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          await ctx.prisma.product.delete({
            where: {
              id: data.id,
            },
          });

          return {
            statusCode: 200,
            message: 'Product was deleted',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Delete product has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Delete product has error: ${error}`,
          };
        }
      },
    });
  },
});

export const CreateOneProductInput = inputObjectType({
  name: 'CreateOneProductInput',
  definition (t) {
    t.nonNull.field('type', {
      type: 'ProductTypeEnum',
    });
    t.nonNull.string('manufacturer');
    t.nonNull.string('brand');
    t.nonNull.string('name');
    t.string('description');
    t.nonNull.float('cost');
    t.list.field('meta_tags', {
      type: 'MetaTagsEnum',
    });
    t.field('possibility_of_purchase', {
      type: 'PossibilityOfPurchaseEnum',
    });
    t.int('min_batch');
    t.list.field('payment_method', {
      type: 'PaymentMethodEnum',
    });
    t.list.field('delivery_method', {
      type: 'DeliveryMethodEnum',
    });
    t.nonNull.list.field('standards', {
      type: 'StandardEnum',
    });
    t.string('analogs');
  },
});

export const UpdateOneProductInput = inputObjectType({
  name: 'UpdateOneProductInput',
  definition (t) {
    t.nonNull.int('id');
    t.field('type', {
      type: 'ProductTypeEnum',
    });
    t.string('manufacturer');
    t.string('brand');
    t.string('name');
    t.string('description');
    t.float('cost');
    t.list.field('meta_tags', {
      type: 'MetaTagsEnum',
    });
    t.field('possibility_of_purchase', {
      type: 'PossibilityOfPurchaseEnum',
    });
    t.int('min_batch');
    t.list.field('payment_method', {
      type: 'PaymentMethodEnum',
    });
    t.list.field('delivery_method', {
      type: 'DeliveryMethodEnum',
    });
    t.list.field('standards', {
      type: 'StandardEnum',
    });
    t.string('analogs');
  },
});

export const DeleteOneProductInput = inputObjectType({
  name: 'DeleteOneProductInput',
  definition (t) {
    t.nonNull.int('id');
  },
});
