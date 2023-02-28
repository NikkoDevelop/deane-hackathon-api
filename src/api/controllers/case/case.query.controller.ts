import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../../graphql/context';

export const CaseQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getAllCases', {
      type: 'Case',
      resolve: async (_, __, ctx: Context) => {
        return ctx.prisma.case.findMany();
      },
    });
    t.field('getCaseById', {
      type: 'Case',
      args: { data: nonNull(arg({ type: GetCaseInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.case.findUnique({
          where: {
            id: data.caseId,
          },
        });
      },
    });
    t.list.field('getCasesByIds', {
      type: 'Case',
      args: { data: nonNull(arg({ type: GetCasesInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.case.findMany({
          where: {
            id: {
              in: data.caseIds,
            },
          },
        });
      },
    });
  },
});

export const GetCaseInput = inputObjectType({
  name: 'GetCaseInput',
  definition (t) {
    t.nonNull.int('caseId');
  },
});

export const GetCasesInput = inputObjectType({
  name: 'GetCasesInput',
  definition (t) {
    t.list.nonNull.int('caseIds');
  },
});
