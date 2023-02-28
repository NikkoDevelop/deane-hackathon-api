import { objectType } from 'nexus';

export * from '../controllers/partner/partner.mutation.controller';
export * from '../controllers/partner/partner.query.controller';

export const Partner = objectType({
  name: 'Partner',
  definition (t) {
    t.int('id');
    t.string('name');
    t.field('logo', {
      type: 'Media',
    });
    t.int('display_order');
    t.boolean('is_published');
    t.field('exhibitor', {
      type: 'Exhibitor',
    });
    t.boolean('is_moderate');
    t.boolean('moderate_verdict');
    t.string('moderate_message');
  },
});
