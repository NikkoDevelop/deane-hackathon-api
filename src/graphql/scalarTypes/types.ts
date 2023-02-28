import { GraphQLDate } from 'graphql-iso-date';
import { asNexusMethod } from '@nexus/schema';

export const GQLDate = asNexusMethod(GraphQLDate, 'dateTime');
