import { objectType } from 'nexus';

export const MutationReturnedType = objectType({
  name: 'MutationReturnedType',
  definition (t) {
    t.int('statusCode');
    t.string('message');
    t.string('error');
  },
});
