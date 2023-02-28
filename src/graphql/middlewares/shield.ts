import { rule, shield as Shield, and, or } from 'graphql-shield';

// import { Context } from '../context';

// const isAuthenticated = rule({ cache: 'contextual' })(
// 	(parent, args, ctx: Context) => {
// 		return ctx.user !== null;
// 	},
// );

// const isCommon = rule({ cache: 'contextual' })(
// 	async (parent, args, ctx: Context) => {
// 		return ctx?.user?.role === 'common';
// 	});

// const isModerator = rule({ cache: 'contextual' })(
// 	async (parent, args, ctx: Context) => {
// 		return ctx?.user?.role === 'moderator';
// 	});

// const isEventOwner = rule({ cache: 'contextual' })(
// 	async (parent, args, ctx: Context) => {
// 		const event = await ctx.prisma.event.findUnique({
// 			where: {
// 				id: args.eventId,
// 			},
// 			include: {
// 				author: true,
// 			},
// 		});
// 		return ctx?.user?.id === event.author.id;
// 	}
// )

const permissions = {
  Query: {
    // me: isAuthenticated,
    // getUser: isAuthenticated,
    // getMyEvents: isAuthenticated,
    // getMyPlanning: isAuthenticated,
    // getMyParticipians: isAuthenticated,
    // getMyArchives: isAuthenticated,
    // getMyGuests: isAuthenticated,
    // getMyMaybeGo: isAuthenticated,
    // events: isAuthenticated,
    // getEvent: isAuthenticated,
    // getAllEvents: isAuthenticated,
    // media: isAuthenticated,
    // getEventStatistic: and(isAuthenticated, isModerator),
  },
  Mutation: {
    // updateUser: isAuthenticated,
    // createOneEvent: isAuthenticated,
    // updateOneEvent: and(isAuthenticated, or(isEventOwner, isModerator)),
    // deleteOneEvent: and(isAuthenticated, or(isEventOwner, isModerator)),
    // registerForEvent: isAuthenticated,
    // createMedia: isAuthenticated,
  },
};

export const shield = Shield(permissions, { allowExternalErrors: true });
