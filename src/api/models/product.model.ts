import { objectType } from 'nexus';

export * from '../controllers/product/product.mutation.controller';
export * from '../controllers/product/product.query.controller';

export const Product = objectType({
  name: 'Product',
  definition (t) {
    t.int('id');
    t.field('createdAt', {
      type: 'Date',
    });
    t.field('updatedAt', {
      type: 'Date',
    });
    t.field('type', {
      type: 'ProductTypeEnum',
    });
    t.string('manufacturer');
    t.string('brand');
    t.string('name');
    t.list.field('medias', {
      type: 'Media',
    });
    t.field('video', {
      type: 'Media',
    });
    t.string('description');
    t.float('cost');
    t.list.field('meta_tags', {
      type: 'MetaTagsEnum',
    });
    t.field('category', {
      type: 'Category',
    });
    t.field('possibility_of_purchase', {
      type: 'PossibilityOfPurchaseEnum',
    });
    t.int('min_batch');
    t.field('payment_method', {
      type: 'PaymentMethodEnum',
    });
    t.field('delivery_method', {
      type: 'DeliveryMethodEnum',
    });
    t.field('standards', {
      type: 'StandardEnum',
    });
    t.string('analogs');
    t.boolean('is_published');
    t.boolean('is_import_substitution');
    t.field('catalog', {
      type: 'Catalog',
    });
    t.field('exhibitor', {
      type: 'Exhibitor',
    });
    t.boolean('is_moderate');
    t.boolean('moderate_verdict');
    t.string('moderate_message');
  },
});
