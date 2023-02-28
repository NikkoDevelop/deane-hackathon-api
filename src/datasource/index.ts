import { DataSources } from 'apollo-server-core/dist/graphqlOptions';

import { UsersAPI } from './users';
import { LoggerAPI } from './logger';

const getDataSources = () => ({
  usersAPI: new UsersAPI(),
  logger: new LoggerAPI(),
});

export interface ApolloDataSources extends DataSources<any> {
	usersAPI: UsersAPI;
	loggerAPI: LoggerAPI;
}

export default getDataSources;
