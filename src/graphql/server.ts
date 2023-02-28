import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import dataSources from '../datasource';
import schema from './schema';
import context from './context';

const config = {
  schema,
  context,
  dataSources,
  tracing: true,
  csrfPrevention: true,
  introspection: process.env.ENV_NAME !== 'production',
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
};

const apolloServer = new ApolloServer(config);

export default apolloServer;
