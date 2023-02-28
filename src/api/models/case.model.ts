import { objectType } from 'nexus';

export * from '../controllers/case/case.mutation.controller';
export * from '../controllers/case/case.query.controller';

export const Case = objectType({
  name: 'Case',
  definition (t) {
    t.int('id');
    t.field('createdAt', {
      type: 'Date',
    });
    t.field('updatedAt', {
      type: 'Date',
    });
    t.string('partner_site_url');
    t.field('content_type', {
      type: 'MediaTypeEnum',
    });
    t.string('html_content');
    t.string('video_url');
    t.boolean('is_published');
    t.boolean('is_import_substitution');
    t.field('exhibitor', {
      type: 'Exhibitor',
    });
    t.boolean('is_moderate');
    t.boolean('moderate_verdict');
    t.string('moderate_message');
  },
});
