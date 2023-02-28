import { objectType } from 'nexus';

export * from '../controllers/feedback/feedback.mutation.controller';
export * from '../controllers/feedback/feedback.query.controller';

export const Feedback = objectType({
  name: 'Feedback',
  definition (t) {
    t.int('id');
    t.field('createdAt', {
      type: 'Date',
    });
    t.field('updatedAt', {
      type: 'Date',
    });
    t.string('text');
    t.int('rate');
    t.field('author', {
      type: 'Exhibitor',
    });
    t.field('company', {
      type: 'Exhibitor',
    });
    t.list.field('medias', {
      type: 'Media',
    });
    t.boolean('is_published');
    t.boolean('is_moderate');
    t.boolean('moderate_verdict');
    t.string('moderate_message');
  },
});
