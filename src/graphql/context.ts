import { DataSourceConfig } from 'apollo-datasource';
import { PrismaClient, User } from '@prisma/client';

import express from 'express';
import prisma from '../prisma-client';
import { ApolloDataSources } from '../datasource';
import { UsersAPI } from '../datasource/users';
import { LoggerAPI, ILogger } from '../datasource/logger';

export interface InitialContext {
	prisma: PrismaClient;
	user: User | null;
	response: express.Response;
  logger: ILogger | null;
}

export interface Context extends InitialContext {
	dataSources: ApolloDataSources;
}

export default async ({ req, connection, res }: { req: express.Request; connection: any, res: express.Response }): Promise<InitialContext> => {
  const context: InitialContext = {
    prisma,
    response: res,
    user: null,
    logger: null,
  };

  const loggerAPI = new LoggerAPI();

  try {
    loggerAPI.initialize();
  } catch (error) {
    loggerAPI.error(`LoggerAPI error: ${error}`);
  }

  const usersAPI = new UsersAPI();

  usersAPI.initialize({ context } as DataSourceConfig<Context>);

  const authorization = req ? req?.headers?.authorization : connection?.context?.authorization;

  if (authorization) {
    const user = await usersAPI.findUserByToken(authorization);

    context.user = user;
  }

  return context;
};
