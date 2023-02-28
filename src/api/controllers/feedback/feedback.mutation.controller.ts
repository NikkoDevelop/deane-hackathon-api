import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../../graphql/context';

export const FeedbackMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('CreateOneFeedback', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'CreateOneFeedbackInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          const exhibitor = await ctx.prisma.exhibitor.findFirst({
            where: {
              owner: {
                id: ctx.user.id,
              },
            },
          });

          await ctx.prisma.feedback.create({
            data: {
              text: data.text,
              rate: data.rate,
              company: {
                connect: {
                  id: data.companyId,
                },
              },
              author: {
                connect: {
                  id: exhibitor.id,
                },
              },
            },
          });
          return {
            statusCode: 200,
            message: 'Feedback was created',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Create feedback has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Feedback created has error: ${error}`,
          };
        }
      },
    });

    t.field('UpdateOneFeedback', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'UpdateOneFeedbackInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          const oldFeedbackData = await ctx.prisma.feedback.findUnique({
            where: {
              id: data.id,
            },
          });

          await ctx.prisma.feedback.update({
            where: {
              id: data.id,
            },
            data: {
              text: data.text ? data.text : oldFeedbackData.text,
              rate: data.rate ? data.rate : oldFeedbackData.rate,
            },
          });
          return {
            statusCode: 200,
            message: 'Feedback was updated',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Updaet feedback has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Feedback update has error: ${error}`,
          };
        };
      },
    });

    t.field('DeleteOneFeedback', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'DeleteOneFeedbackInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          await ctx.prisma.feedback.delete({
            where: {
              id: data.id,
            },
          });
          return {
            statusCode: 200,
            message: 'Feedback was deleted',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Delete feedback has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Feedback delete has error: ${error}`,
          };
        };
      },
    });
  },
});

export const CreateOneFeedbackInput = inputObjectType({
  name: 'CreateOneFeedbackInput',
  definition (t) {
    t.nonNull.int('companyId');
    t.nonNull.string('text');
    t.nonNull.int('rate');
  },
});

export const UpdateOneFeedbackInput = inputObjectType({
  name: 'UpdateOneFeedbackInput',
  definition (t) {
    t.nonNull.int('id');
    t.string('text');
    t.int('rate');
  },
});

export const DeleteOneFeedbackInput = inputObjectType({
  name: 'DeleteOneFeedbackInput',
  definition (t) {
    t.nonNull.int('id');
  },
});
