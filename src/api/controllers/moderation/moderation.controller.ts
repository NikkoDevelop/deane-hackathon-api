/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/no-identical-functions */
import { extendType, nonNull, arg, inputObjectType } from 'nexus';
import { Context } from '../../../graphql/context';
import { sendEmailModerationVerdict } from '../../../integrations/mail/sendEmail';

export const ModerationMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('moderateEntity', {
      type: 'String',
      args: { data: nonNull(arg({ type: verdictModerationInput })) },
      // eslint-disable-next-line sonarjs/cognitive-complexity
      resolve: async (_, { data }, ctx: Context) => {
        if (data.entityType !== undefined) {
          switch (data.entityType) {
            case 'CaseModeration': {
              const caseData = await ctx.prisma.case.findUnique({
                where: {
                  id: data.entityId,
                },
                include: {
                  exhibitor: true,
                },
              });

              if (data.verdict === true) {
                await ctx.prisma.case.update({
                  where: {
                    id: data.entityId,
                  },
                  data: {
                    is_moderate: true,
                    moderate_verdict: data.verdict,
                    moderate_message: data.verdict_message ? data.verdict_message : `Ваш кейс: ${caseData.createdAt} - ${caseData.video_url} Принят модератором`,
                  },
                });

                return 'Success';
              }
              await ctx.prisma.case.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  is_moderate: true,
                  moderate_verdict: data.verdict,
                  moderate_message: data.verdict_message ? data.verdict_message : `Ваш кейс: ${caseData.createdAt} - ${caseData.video_url} Не принят модератором. Вердикт: ${data.verdict_message}`,
                },
              });

              await sendEmailModerationVerdict({
                email: caseData.exhibitor.notification_email,
                entity: data.entityType,
                verdict: (data.verdict).toString(),
                verdictMessage: data.verdict_message,
              });
              return 'Success';
            }
            case 'CatalogModeration': {
              const catalogData = await ctx.prisma.catalog.findUnique({
                where: {
                  id: data.entityId,
                },
                include: {
                  author: true,
                },
              });

              if (data.verdict === true) {
                await ctx.prisma.catalog.update({
                  where: {
                    id: data.entityId,
                  },
                  data: {
                    is_moderate: true,
                    moderate_verdict: data.verdict,
                    moderate_message: data.verdict_message ? data.verdict_message : `Ваш каталог: ${catalogData.id} Принят модератором`,
                  },
                });
                return 'Success';
              }
              await ctx.prisma.catalog.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  is_moderate: true,
                  moderate_verdict: data.verdict,
                  moderate_message: data.verdict_message ? data.verdict_message : `Ваш каталог: ${catalogData.id} Не принят модератором. Вердикт: ${data.verdict_message}`,
                },
              });

              await sendEmailModerationVerdict({
                email: catalogData.author.notification_email,
                entity: data.entityType,
                verdict: (data.verdict).toString(),
                verdictMessage: data.verdict_message,
              });

              return 'Success';
            }
            case 'CategoryModeration': {
              const categoryData = await ctx.prisma.category.findUnique({
                where: {
                  id: data.entityId,
                },
                include: {
                  exhibitor: true,
                },
              });

              if (data.verdict === true) {
                await ctx.prisma.category.update({
                  where: {
                    id: data.entityId,
                  },
                  data: {
                    is_moderate: true,
                    moderate_verdict: data.verdict,
                    moderate_message: data.verdict_message ? data.verdict_message : `Ваша категория: ${categoryData.createdAt} - ${categoryData.name} Принят модератором`,
                  },
                });
                return 'Success';
              }
              await ctx.prisma.category.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  is_moderate: true,
                  moderate_verdict: data.verdict,
                  moderate_message: data.verdict_message ? data.verdict_message : `Ваша категория: ${categoryData.createdAt} - ${categoryData.name} Не принят модератором. Вердикт: ${data.verdict_message}`,
                },
              });

              await sendEmailModerationVerdict({
                email: categoryData.exhibitor.notification_email,
                entity: data.entityType,
                verdict: (data.verdict).toString(),
                verdictMessage: data.verdict_message,
              });

              return 'Success';
            }
            case 'ExhibidorModeration': {
              const exhibitorData = await ctx.prisma.exhibitor.findUnique({
                where: {
                  id: data.entityId,
                },
              });

              if (data.verdict === true) {
                await ctx.prisma.exhibitor.update({
                  where: {
                    id: data.entityId,
                  },
                  data: {
                    is_moderate: true,
                    moderate_verdict: data.verdict,
                    moderate_message: data.verdict_message ? data.verdict_message : `Ваш экспонент: ${exhibitorData.email} - ${exhibitorData.name} Принят модератором`,
                  },
                });
                return 'Success';
              }
              await ctx.prisma.exhibitor.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  is_moderate: true,
                  moderate_verdict: data.verdict,
                  moderate_message: data.verdict_message ? data.verdict_message : `Ваш экспонент: ${exhibitorData.email} - ${exhibitorData.name} Не принят модератором. Вердикт: ${data.verdict_message}`,
                },
              });

              await sendEmailModerationVerdict({
                email: exhibitorData.notification_email,
                entity: data.entityType,
                verdict: (data.verdict).toString(),
                verdictMessage: data.verdict_message,
              });

              return 'Success';
            }
            case 'FeedbackModeration': {
              const feedbackData = await ctx.prisma.feedback.findUnique({
                where: {
                  id: data.entityId,
                },
                include: {
                  author: true,
                },
              });

              if (data.verdict === true) {
                await ctx.prisma.feedback.update({
                  where: {
                    id: data.entityId,
                  },
                  data: {
                    is_moderate: true,
                    moderate_verdict: data.verdict,
                    moderate_message: data.verdict_message ? data.verdict_message : `Ваш отзыв: ${feedbackData.createdAt} - ${feedbackData.text} Принят модератором`,
                  },
                });
                return 'Success';
              }
              await ctx.prisma.feedback.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  is_moderate: true,
                  moderate_verdict: data.verdict,
                  moderate_message: data.verdict_message ? data.verdict_message : `Ваш отзыв: ${feedbackData.createdAt} - ${feedbackData.text} Не принят модератором. Вердикт: ${data.verdict_message}`,
                },
              });

              await sendEmailModerationVerdict({
                email: feedbackData.author.notification_email,
                entity: data.entityType,
                verdict: (data.verdict).toString(),
                verdictMessage: data.verdict_message,
              });

              return 'Success';
            }
            case 'LocationModeration': {
              const locationData = await ctx.prisma.location.findUnique({
                where: {
                  id: data.entityId,
                },
                include: {
                  exhibitor: true,
                },
              });

              if (data.verdict === true) {
                await ctx.prisma.location.update({
                  where: {
                    id: data.entityId,
                  },
                  data: {
                    is_moderate: true,
                    moderate_verdict: data.verdict,
                    moderate_message: data.verdict_message ? data.verdict_message : `Ваша локация: ${locationData.adress} - ${locationData.name} Принят модератором`,
                  },
                });
                return 'Success';
              }
              await ctx.prisma.location.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  is_moderate: true,
                  moderate_verdict: data.verdict,
                  moderate_message: data.verdict_message ? data.verdict_message : `Ваша локация: ${locationData.adress} - ${locationData.name} Не принят модератором. Вердикт: ${data.verdict_message}`,
                },
              });

              await sendEmailModerationVerdict({
                email: locationData.exhibitor.notification_email,
                entity: data.entityType,
                verdict: (data.verdict).toString(),
                verdictMessage: data.verdict_message,
              });

              return 'Success';
            }
            case 'MediaModeration': {
              const mediaData = await ctx.prisma.media.findUnique({
                where: {
                  id: data.entityId,
                },
                include: {
                  exhibitor_for_logo: true,
                },
              });

              if (data.verdict === true) {
                await ctx.prisma.media.update({
                  where: {
                    id: data.entityId,
                  },
                  data: {
                    is_moderate: true,
                    moderate_verdict: data.verdict,
                    moderate_message: data.verdict_message ? data.verdict_message : `Ваш медиа файл: ${mediaData.createdAt} - ${mediaData.url} Принят модератором`,
                  },
                });
                return 'Success';
              }
              await ctx.prisma.media.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  is_moderate: true,
                  moderate_verdict: data.verdict,
                  moderate_message: data.verdict_message ? data.verdict_message : `Ваш медиа файл: ${mediaData.createdAt} - ${mediaData.url} Не принят модератором. Вердикт: ${data.verdict_message}`,
                },
              });

              await sendEmailModerationVerdict({
                email: mediaData.exhibitor_for_logo[0].notification_email,
                entity: data.entityType,
                verdict: (data.verdict).toString(),
                verdictMessage: data.verdict_message,
              });

              return 'Success';
            }
            case 'PartnerModeration': {
              const partnerData = await ctx.prisma.partner.findUnique({
                where: {
                  id: data.entityId,
                },
                include: {
                  exhibitor: true,
                },
              });

              if (data.verdict === true) {
                await ctx.prisma.partner.update({
                  where: {
                    id: data.entityId,
                  },
                  data: {
                    is_moderate: true,
                    moderate_verdict: data.verdict,
                    moderate_message: data.verdict_message ? data.verdict_message : `Ваш партнер: ${partnerData.id} - ${partnerData.name} Принят модератором`,
                  },
                });
                return 'Success';
              }
              await ctx.prisma.partner.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  is_moderate: true,
                  moderate_verdict: data.verdict,
                  moderate_message: data.verdict_message ? data.verdict_message : `Ваш партнер: ${partnerData.id} - ${partnerData.name} Не принят модератором. Вердикт: ${data.verdict_message}`,
                },
              });

              await sendEmailModerationVerdict({
                email: partnerData.exhibitor.notification_email,
                entity: data.entityType,
                verdict: (data.verdict).toString(),
                verdictMessage: data.verdict_message,
              });

              return 'Success';
            }
            case 'ProductModeration': {
              const productData = await ctx.prisma.product.findUnique({
                where: {
                  id: data.entityId,
                },
                include: {
                  exhibitor: true,
                },
              });

              if (data.verdict === true) {
                await ctx.prisma.product.update({
                  where: {
                    id: data.entityId,
                  },
                  data: {
                    is_moderate: true,
                    moderate_verdict: data.verdict,
                    moderate_message: data.verdict_message ? data.verdict_message : `Ваш продукт: ${productData.createdAt} - ${productData.name} Принят модератором`,
                  },
                });
                return 'Success';
              }
              await ctx.prisma.product.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  is_moderate: true,
                  moderate_verdict: data.verdict,
                  moderate_message: data.verdict_message ? data.verdict_message : `Ваш продукт: ${productData.createdAt} - ${productData.name} Не принят модератором. Вердикт: ${data.verdict_message}`,
                },
              });

              await sendEmailModerationVerdict({
                email: productData.exhibitor.notification_email,
                entity: data.entityType,
                verdict: (data.verdict).toString(),
                verdictMessage: data.verdict_message,
              });

              return 'Success';
            }
            default: {
              return 'Success';
            }
          }
        }
        return 'Success';
      },
    });
  },
});

export const verdictModerationInput = inputObjectType({
  name: 'verdictModerationInput',
  definition (t) {
    t.nonNull.int('entityId');
    t.nonNull.boolean('verdict');
    t.string('verdict_message');
    t.nonNull.field('entityType', {
      type: 'EntityModerationEnum',
    });
  },
});
