import { objectType } from 'nexus';

export * from '../controllers/location/location.mutation.controller';
export * from '../controllers/location/location.query.controller';

export const Location = objectType({
  name: 'Location',
  definition (t) {
    t.int('id');
    t.string('adress');
    t.string('gps_coords');
    t.string('name');
    t.string('cooperation_type');
    t.string('partner_site_url');
    t.boolean('is_visible');
    t.field('exhibitor', {
      type: 'Exhibitor',
    });
    t.boolean('is_moderate');
    t.boolean('moderate_verdict');
    t.string('moderate_message');
  },
});
