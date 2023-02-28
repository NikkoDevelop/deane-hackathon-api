import { objectType } from 'nexus';

export * from '../controllers/exhibitor/exhibitor.mutation.controller';
export * from '../controllers/exhibitor/exhibitor.query.controller';

export const Exhibitor = objectType({
  name: 'Exhibitor',
  definition (t) {
    t.int('id');
    t.string('name');
    t.string('description');
    t.list.field('meta_tags', {
      type: 'MetaTagsEnum',
    });
    t.string('company_description');
    t.string('logo');
    t.string('main_media');
    t.field('category', {
      type: 'ExhibitorCategoryEnum',
    });
    t.string('site_url');
    t.string('login');
    t.string('password');
    t.list.string('email');
    t.string('notification_email');
    t.string('phone');
    t.string('contact_person');
    t.string('inn');
    t.string('legal_adress');
    t.string('factory_adress');
    t.string('location_table');
    t.string('partners_table');
    t.string('clients');
    t.field('catalog', {
      type: 'Catalog',
    });
    t.string('portfolio');
    t.string('import_substitution');
    t.boolean('is_import_substitution');
    t.list.field('our_feedback', {
      type: 'Feedback',
    });
    t.list.field('us_feedback', {
      type: 'Feedback',
    });
    t.list.field('products', {
      type: 'Feedback',
    });
    t.list.field('locations', {
      type: 'Feedback',
    });
    t.list.field('partners', {
      type: 'Feedback',
    });
    t.list.field('cases', {
      type: 'Feedback',
    });
    t.boolean('is_moderate');
    t.boolean('moderate_verdict');
    t.string('moderate_message');
  },
});
