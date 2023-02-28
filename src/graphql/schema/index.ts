import { makeSchema } from 'nexus';
// import { applyMiddleware } from 'graphql-middleware';
import path from 'path';

// import * as middlewares from '../middlewares';
import { GQLDate } from '../scalarTypes/types';
import * as models from './models';

const rawSchema = makeSchema({
  types: [models, GQLDate],
  outputs: {
    typegen: path.join(__dirname, '../../generated/typings.ts'),
    schema: path.join(__dirname, '../../generated/schema.graphql'),
  },
});

// const schema = applyMiddleware(rawSchema, middlewares.shield);

export default rawSchema;
