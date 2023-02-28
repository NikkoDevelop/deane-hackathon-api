import { objectType } from 'nexus';

export * from '../controllers/category/category.mutation.controller';
export * from '../controllers/category/category.query.controller';

export const Category = objectType({
  name: 'Category',
  definition (t) {
    t.int('id');
    t.field('createdAt', {
      type: 'Date',
    });
    t.field('updatedAt', {
      type: 'Date',
    });
    t.string('name');
    t.field('connection_type', {
      type: 'ConnectionTypeEnum',
    });
    t.int('sub_category');
    t.boolean('is_published');
    t.field('catalog', {
      type: 'Catalog',
    });
    t.field('product', {
      type: 'Product',
    });
    t.boolean('is_moderate');
    t.boolean('moderate_verdict');
    t.string('moderate_message');
  },
});
