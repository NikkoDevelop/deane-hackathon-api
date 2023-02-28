import { objectType } from 'nexus';
import { Context } from '../../graphql/context';
import * as awsS3API from '../../integrations/aws/s3';

export * from '../controllers/media/media.mutation.controller';
export * from '../controllers/media/media.query.controller';

export const Media = objectType({
  name: 'Media',
  definition (t) {
    t.int('id');
    t.field('createdAt', {
      type: 'Date',
    });
    t.string('url');
    t.field('link', {
      type: 'String',
      resolve: async (parent: any, { }, ctx: Context) => {
        if (parent.isApproved === false) {
          const fileName = `${parent?.url.split('/')[3]}/${parent?.url.split('/')[3]}.${parent?.url.split('.')[5]}`;
          const exist = !!await awsS3API.objectExist({ fileName });

          if (exist) {
            await ctx.prisma.media.update({
              where: {
                id: parent.id,
              },
              data: {
                isApproved: true,
              },
            });

            return parent.url;
          }
          await ctx.prisma.media.delete({
            where: {
              id: parent.id,
            },
          });

          return 'Object doesn\'t exist';
        }

        return parent.url;
      },
    });

    t.field('type', {
      type: 'MediaTypeEnum',
    });
    t.boolean('isApproved');
    t.list.field('exhibitor_for_logo', {
      type: 'Exhibitor',
    });
    t.list.field('exhibitor_for_main_logo', {
      type: 'Exhibitor',
    });
    t.list.field('partner', {
      type: 'Partner',
    });
    t.list.field('feedback', {
      type: 'Feedback',
    });
    t.list.field('product_logo', {
      type: 'Product',
    });
    t.list.field('product_medias', {
      type: 'Product',
    });
    t.boolean('is_moderate');
    t.boolean('moderate_verdict');
    t.string('moderate_message');
  },
});

export const SignUrlResponse = objectType({
  name: 'SignUrlResponse',
  definition (t) {
    t.string('signedURL');
    t.string('fileName');
    t.int('mediaId');
    t.string('mediaURL');
  },
});
