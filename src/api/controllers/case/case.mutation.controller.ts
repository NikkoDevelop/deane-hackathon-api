import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../../graphql/context';

export const CaseMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('CreateOneCase', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'CreateOneCaseInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          const exhibitor = await ctx.prisma.exhibitor.findFirst({
            where: {
              owner: {
                id: ctx.user.id,
              },
            },
          });

          await ctx.prisma.case.create({
            data: {
              partner_site_url: data.partner_site_url ? data.partner_site_url : null,
              content_type: data.content_type,
              html_content: data.html_content ? data.html_content : null,
              video_url: data.video_url,
              is_import_substitution: data.is_import_substitution,
              exhibitor: {
                connect: {
                  id: exhibitor.id,
                },
              },
            },
          });
          return {
            statusCode: 200,
            message: 'Case was created',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Create case has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Case created has error: ${error}`,
          };
        }
      },
    });

    t.field('UpdateOneCase', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'UpdateOneCaseInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          const oldCaseData = await ctx.prisma.case.findUnique({
            where: {
              id: data.id,
            },
          });

          await ctx.prisma.case.update({
            where: {
              id: data.id,
            },
            data: {
              partner_site_url: data.partner_site_url ? data.partner_site_url : oldCaseData.partner_site_url,
              content_type: data.content_type ? data.connection_type : oldCaseData.content_type,
              html_content: data.html_content ? data.html_content : oldCaseData.html_content,
              video_url: data.video_url ? data.video_url : oldCaseData.video_url,
              is_import_substitution: data.is_import_substitution ? data.is_import_substitution : oldCaseData.is_import_substitution,
            },
          });
          return {
            statusCode: 200,
            message: 'Case was updated',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Update case has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Case updated has error: ${error}`,
          };
        }
      },
    });

    t.field('DeleteOneCase', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'DeleteOneCaseInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          await ctx.prisma.case.delete({
            where: {
              id: data.id,
            },
          });
          return {
            statusCode: 200,
            message: 'Case was deleted',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Delete case has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Case delete has error: ${error}`,
          };
        }
      },
    });
  },
});

export const CreateOneCaseInput = inputObjectType({
  name: 'CreateOneCaseInput',
  definition (t) {
    t.nonNull.boolean('is_visible_cost');
  },
});

export const UpdateOneCaseInput = inputObjectType({
  name: 'UpdateOneCaseInput',
  definition (t) {
    t.nonNull.int('id');
    t.boolean('is_visible_cost');
  },
});

export const DeleteOneCaseInput = inputObjectType({
  name: 'DeleteOneCaseInput',
  definition (t) {
    t.nonNull.int('id');
  },
});

