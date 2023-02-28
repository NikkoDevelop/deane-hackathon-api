import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../../graphql/context';

export const LocationQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getAllLocations', {
      type: 'Location',
      resolve: async (_, __, ctx: Context) => {
        return ctx.prisma.location.findMany();
      },
    });
    t.field('getLocationById', {
      type: 'Location',
      args: { data: nonNull(arg({ type: GetLocationInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.location.findUnique({
          where: {
            id: data.locationId,
          },
        });
      },
    });
    t.list.field('getLocationByIds', {
      type: 'Location',
      args: { data: nonNull(arg({ type: GetLocationsInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.location.findMany({
          where: {
            id: {
              in: data.locationIds,
            },
          },
        });
      },
    });
  },
});

export const GetLocationInput = inputObjectType({
  name: 'GetLocationInput',
  definition (t) {
    t.nonNull.int('locationId');
  },
});

export const GetLocationsInput = inputObjectType({
  name: 'GetLocationsInput',
  definition (t) {
    t.list.nonNull.int('locationIds');
  },
});
