import { objectType } from 'nexus';

export * from '../controllers/catalog/catalog.mutation.controller';
export * from '../controllers/catalog/catalog.query.controller';

export const Catalog = objectType({
  name: 'Catalog',
  definition (t) {
    t.int('id');
    t.list.field('categories', {
      type: 'Category',
    });
    t.list.field('products', {
      type: 'Product',
    });
    t.field('is_visible_cost', {
      type: 'VisibleCostEnum',
    });
    t.list.field('Exhibitor', {
      type: 'Exhibitor',
    });
    t.boolean('is_moderate');
    t.boolean('moderate_verdict');
    t.string('moderate_message');
  },
});
