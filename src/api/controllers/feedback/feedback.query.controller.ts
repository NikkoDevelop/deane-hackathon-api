import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../../graphql/context';

export const FeedbackQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getAllFeedbacks', {
      type: 'Feedback',
      resolve: async (_, __, ctx: Context) => {
        return ctx.prisma.feedback.findMany();
      },
    });
    t.field('getFeedbackById', {
      type: 'Feedback',
      args: { data: nonNull(arg({ type: GetFeedbackInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.feedback.findUnique({
          where: {
            id: data.feedbackId,
          },
        });
      },
    });
    t.list.field('getFeedbackByIds', {
      type: 'Feedback',
      args: { data: nonNull(arg({ type: GetFeedbacksInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.feedback.findMany({
          where: {
            id: {
              in: data.feedbackIds,
            },
          },
        });
      },
    });
  },
});

export const GetFeedbackInput = inputObjectType({
  name: 'GetFeedbackInput',
  definition (t) {
    t.nonNull.int('feedbackId');
  },
});

export const GetFeedbacksInput = inputObjectType({
  name: 'GetFeedbacksInput',
  definition (t) {
    t.list.nonNull.int('feedbackIds');
  },
});
