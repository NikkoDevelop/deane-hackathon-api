import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../../graphql/context';

export const MediaQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getAllMedias', {
      type: 'Media',
      resolve: async (_, __, ctx: Context) => {
        return ctx.prisma.media.findMany();
      },
    });
    t.field('getMediaByURL', {
      type: 'Media',
      args: { data: nonNull(arg({ type: GetMediaInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.media.findUnique({
          where: {
            url: data.mediaURL,
          },
        });
      },
    });
    t.list.field('getMediasByURLs', {
      type: 'Media',
      args: { data: nonNull(arg({ type: GetMediasInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.media.findMany({
          where: {
            url: {
              in: data.mediaURLs,
            },
          },
        });
      },
    });
  },
});

export const GetMediaInput = inputObjectType({
  name: 'GetMediaInput',
  definition (t) {
    t.nonNull.string('mediaURL');
  },
});

export const GetMediasInput = inputObjectType({
  name: 'GetMediasInput',
  definition (t) {
    t.list.nonNull.string('mediaURLs');
  },
});
