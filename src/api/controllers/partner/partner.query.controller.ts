import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../../graphql/context';

export const PartnerQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getAllPartners', {
      type: 'Partner',
      resolve: async (_, __, ctx: Context) => {
        return ctx.prisma.partner.findMany();
      },
    });
    t.field('getPartnerById', {
      type: 'Partner',
      args: { data: nonNull(arg({ type: GetPartnerInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.partner.findUnique({
          where: {
            id: data.partnerId,
          },
        });
      },
    });
    t.list.field('getPartnerByIds', {
      type: 'Partner',
      args: { data: nonNull(arg({ type: GetPartnersInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.partner.findMany({
          where: {
            id: {
              in: data.partnerIds,
            },
          },
        });
      },
    });
  },
});

export const GetPartnerInput = inputObjectType({
  name: 'GetPartnerInput',
  definition (t) {
    t.nonNull.int('partnerId');
  },
});

export const GetPartnersInput = inputObjectType({
  name: 'GetPartnersInput',
  definition (t) {
    t.list.nonNull.int('partnerIds');
  },
});
