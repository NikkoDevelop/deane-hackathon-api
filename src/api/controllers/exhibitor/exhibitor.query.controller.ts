import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../../graphql/context';

export const ExhibitorQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getAllExhibitors', {
      type: 'Exhibitor',
      resolve: async (_, __, ctx: Context) => {
        return ctx.prisma.exhibitor.findMany();
      },
    });
    t.field('getExhibitorById', {
      type: 'Exhibitor',
      args: { data: nonNull(arg({ type: GetExhibitorInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.exhibitor.findUnique({
          where: {
            id: data.exhibitorId,
          },
        });
      },
    });
    t.list.field('getExhibitorsByIds', {
      type: 'Exhibitor',
      args: { data: nonNull(arg({ type: GetExhibitorsInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.exhibitor.findMany({
          where: {
            id: {
              in: data.exhibitorIds,
            },
          },
        });
      },
    });
  },
});

export const GetExhibitorInput = inputObjectType({
  name: 'GetExhibitorInput',
  definition (t) {
    t.nonNull.int('exhibitorId');
  },
});

export const GetExhibitorsInput = inputObjectType({
  name: 'GetExhibitorsInput',
  definition (t) {
    t.list.nonNull.int('exhibitorIds');
  },
});
