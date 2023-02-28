/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/no-identical-functions */
import { extendType, nonNull, arg, inputObjectType } from 'nexus';
import cuid from 'cuid';
import * as awsS3API from '../../../integrations/aws/s3';
import { Context } from '../../../graphql/context';

export const MediaMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createMedia', {
      type: 'SignUrlResponse',
      args: { data: nonNull(arg({ type: createMediaInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const fileName = await cuid();

        const result = await awsS3API.getSignedUrl({ fileName, type: data.fileType });

        const media = await ctx.prisma.media.create({
          data: {
            url: result.objectURL,
            type: data.fileType === 'video/mp4' ? 'video' : 'image',
          },
        });

        if (data.entityType !== undefined) {
          switch (data.entityType) {
            case 'ExhibitorLogo': {
              await ctx.prisma.exhibitor.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  logo: {
                    connect: {
                      url: media.url,
                    },
                  },
                },
              });
              break;
            }
            case 'ExhibitorMainMedia': {
              await ctx.prisma.exhibitor.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  main_media: {
                    connect: {
                      url: media.url,
                    },
                  },
                },
              });
              break;
            }
            case 'PartnerMedia': {
              await ctx.prisma.partner.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  logo: {
                    connect: {
                      url: media.url,
                    },
                  },
                },
              });
              break;
            }
            case 'FeedbackMedia': {
              await ctx.prisma.feedback.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  medias: {
                    connect: {
                      url: media.url,
                    },
                  },
                },
              });
              break;
            }
            case 'ProductVideo': {
              await ctx.prisma.product.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  video: {
                    connect: {
                      url: media.url,
                    },
                  },
                },
              });
              break;
            }
            case 'ProductMedia': {
              await ctx.prisma.product.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  medias: {
                    connect: {
                      url: media.url,
                    },
                  },
                },
              });
              break;
            }
            default: {
              break;
            }
          }
        }

        return {
          fileName: result.fileName,
          signedURL: result.signedURL,
          mediaId: media.id,
          mediaURL: media.url,
        };
      },
    });
  },
});

export const createMediaInput = inputObjectType({
  name: 'createMediaInput',
  definition (t) {
    t.nonNull.string('fileType');
    t.nonNull.int('entityId');
    t.nonNull.field('entityType', {
      type: 'EntityTypeEnum',
    });
  },
});
