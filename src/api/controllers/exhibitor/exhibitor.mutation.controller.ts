/* eslint-disable no-magic-numbers */
import { extendType, arg, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../../graphql/context';

export const ExhibitorMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('CreateOneExhibitor', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'CreateOneExhibitorInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          await ctx.prisma.exhibitor.create({
            data: {
              name: data.name,
              description: data.description ? data.description : null,
              meta_tags: data.meta_tags,
              owner: {
                connect: {
                  id: ctx.user.id,
                },
              },
              login: (Math.random() + 1).toString(36).substring(7),
              password: (Math.random() + 1).toString(36).substring(7),
              company_description: data.company_description ? data.company_description : null,
              category: data.category,
              site_url: data.site_url ? data.site_url : null,
              notification_email: data.notification_email ? data.notification_email : null,
              phone: data.phone ? data.phone : null,
              contact_person: data.contact_person ? data.contact_person : null,
              inn: data.inn,
              legal_adress: data.legal_adress ? data.legal_adress : null,
              factory_adress: data.factory_adress ? data.factory_adress : null,
              import_substitution: data.import_substitution ? data.import_substitution : null,
              is_import_substitution: data.is_import_substitution ? data.is_import_substitution : null,
            },
          });
          return {
            statusCode: 200,
            message: 'Exhibitor was created',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Create exhibitor has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Exhibitor created has error: ${error}`,
          };
        }
      },
    });

    t.field('UpdateOneExhibitor', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'UpdateOneExhibitorInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          const oldExhebitorData = await ctx.prisma.exhibitor.findUnique({
            where: {
              id: data.id,
            },
          });

          await ctx.prisma.exhibitor.update({
            where: {
              id: data.id,
            },
            data: {
              name: data.name ? data.name : oldExhebitorData.name,
              description: data.description ? data.description : oldExhebitorData.description,
              meta_tags: data.meta_tags ? data.meta_tags : oldExhebitorData.meta_tags,
              company_description: data.company_description ? data.company_description : oldExhebitorData.company_description,
              category: data.category ? data.category : oldExhebitorData.category,
              site_url: data.site_url ? data.site_url : oldExhebitorData.site_url,
              notification_email: data.notification_email ? data.notification_email : oldExhebitorData.notification_email,
              phone: data.phone ? data.phone : oldExhebitorData.phone,
              contact_person: data.contact_person ? data.contact_person : oldExhebitorData.contact_person,
              inn: data.inn ? data.inn : oldExhebitorData.inn,
              legal_adress: data.legal_adress ? data.legal_adress : oldExhebitorData.legal_adress,
              factory_adress: data.factory_adress ? data.factory_adress : oldExhebitorData.factory_adress,
              import_substitution: data.import_substitution ? data.import_substitution : oldExhebitorData.import_substitution,
              is_import_substitution: data.is_import_substitution ? data.is_import_substitution : oldExhebitorData.is_import_substitution,
            },
          });

          return {
            statusCode: 200,
            message: 'Exhibitor was updated',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Update exhibitor has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Exhibitor update has error: ${error}`,
          };
        };
      },
    });

    t.field('DeleteOneExhibitor', {
      type: 'MutationReturnedType',
      args: { data: nonNull(arg({ type: 'DeleteOneExhibitorInput' })) },
      resolve: async (_, { data }, ctx: Context) => {
        try {
          await ctx.prisma.exhibitor.delete({
            where: {
              id: data.id,
            },
          });
          return {
            statusCode: 200,
            message: 'Exhibitor was deleted',
            error: undefined,
          };
        } catch (error) {
          ctx.logger.error(`${(new Date()).toString()} Delete exhibitor has error: ${error}`);
          return {
            statusCode: 400,
            message: undefined,
            error: `Exhibitor delete has error: ${error}`,
          };
        };
      },
    });
  },
});

export const CreateOneExhibitorInput = inputObjectType({
  name: 'CreateOneExhibitorInput',
  definition (t) {
    t.nonNull.string('name');
    t.nonNull.string('inn');
    t.nonNull.field('category', {
      type: 'ExhibitorCategoryEnum',
    });
    t.nonNull.list.field('meta_tags', {
      type: 'MetaTagsEnum',
    });
  },
});

export const UpdateOneExhibitorInput = inputObjectType({
  name: 'UpdateOneExhibitorInput',
  definition (t) {
    t.nonNull.int('id');
    t.string('name');
    t.string('description');
    t.list.field('meta_tags', {
      type: 'MetaTagsEnum',
    });
    t.string('company_description');
    t.field('category', {
      type: 'ExhibitorCategoryEnum',
    });
    t.string('site_url');
    t.string('notification_email');
    t.string('phone');
    t.string('contact_person');
    t.string('inn');
    t.string('legal_adress');
    t.string('factory_adress');
    t.string('import_substitution');
    t.boolean('is_import_substitution');
  },
});

export const DeleteOneExhibitorInput = inputObjectType({
  name: 'DeleteOneExhibitorInput',
  definition (t) {
    t.nonNull.int('id');
  },
});
