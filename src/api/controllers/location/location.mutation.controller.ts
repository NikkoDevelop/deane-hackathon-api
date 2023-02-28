import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../../graphql/context';

export const LocationMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('CreateOneLocation', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'CreateOneLocationInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          const exhibitor = await ctx.prisma.exhibitor.findFirst({
            where: {
              owner: {
                id: ctx.user.id,
              },
            },
          });

          await ctx.prisma.location.create({
            data: {
              adress: data.adress,
              gps_coords: data.gps_coords ? data.gps_coords : null,
              name: data.name,
              cooperation_type: data.cooperation_type,
              partner_site_url: data.partner_site_url ? data.partner_site_url : null,
              exhibitor: {
                connect: {
                  id: exhibitor.id,
                },
              },
            },
          });

          return {
            statusCode: 200,
            message: 'Location was create',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Create location has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Location create has error: ${error}`,
          };
        }
      },
    });

    t.field('UpdateOneLocation', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'UpdateOneLocationInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          const oldLocationData = await ctx.prisma.location.findUnique({
            where: {
              id: data.id,
            },
          });

          await ctx.prisma.location.update({
            where: {
              id: data.id,
            },
            data: {
              adress: data.adress ? data.adress : oldLocationData.adress,
              gps_coords: data.gps_coords ? data.gps_coords : oldLocationData.gps_coords,
              name: data.name ? data.name : oldLocationData.name,
              cooperation_type: data.cooperation_type ? data.cooperation_type : oldLocationData.cooperation_type,
              partner_site_url: data.partner_site_url ? data.partner_site_url : oldLocationData.partner_site_url,
            },
          });

          return {
            statusCode: 200,
            message: 'Location was updated',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Update location has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Location update has error: ${error}`,
          };
        }
      },
    });

    t.field('DeleteOneLocation', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'DeleteOneLocationInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          await ctx.prisma.location.delete({
            where: {
              id: data.id,
            },
          });
          return {
            statusCode: 200,
            message: 'Location was deleted',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Delete location has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Location delete has error: ${error}`,
          };
        }
      },
    });
  },
});

export const CreateOneLocationInput = inputObjectType({
  name: 'CreateOneLocationInput',
  definition (t) {
    t.nonNull.string('adress');
    t.string('gps_coords');
    t.nonNull.string('name');
    t.nonNull.string('cooperation_type');
    t.string('partner_site_url');
  },
});

export const UpdateOneLocationInput = inputObjectType({
  name: 'UpdateOneLocationInput',
  definition (t) {
    t.nonNull.int('id');
    t.string('adress');
    t.string('gps_coords');
    t.string('name');
    t.string('cooperation_type');
    t.string('partner_site_url');
  },
});

export const DeleteOneLocationInput = inputObjectType({
  name: 'DeleteOneLocationInput',
  definition (t) {
    t.nonNull.int('id');
  },
});
