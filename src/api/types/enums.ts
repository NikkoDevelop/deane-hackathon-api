import { enumType } from 'nexus';

export const EntityModerationEnum = enumType({
  name: 'EntityModerationEnum',
  members: [
    'CaseModeration',
    'CatalogModeration',
    'CategoryModeration',
    'ExhibidorModeration',
    'FeedbackModeration',
    'LocationModeration',
    'MediaModeration',
    'PartnerModeration',
    'ProductModeration',
  ],
});

export const EntityTypeEnum = enumType({
  name: 'EntityTypeEnum',
  members: ['ProductMedia',
    'ExhibitorLogo',
    'ExhibitorMainMedia',
    'PartnerMedia',
    'FeedbackMedia',
    'ProductVideo'],
});

export const MetaTagsEnum = enumType({
  name: 'MetaTagsEnum',
  members: ['Robots',
    'Viewport',
    'Charset',
    'Content_type',
    'Refresh',
    'Author',
    'Copyright',
    'Title',
    'Description',
    'Keywords'],
});

export const ExhibitorCategoryEnum = enumType({
  name: 'ExhibitorCategoryEnum',
  members: ['business',
    'development',
    'design',
    'management',
    'analytic',
    'education',
    'content',
    'IT'],
});

export const MediaTypeEnum = enumType({
  name: 'MediaTypeEnum',
  members: ['image',
    'video'],
});

export const VisibleCostEnum = enumType({
  name: 'VisibleCostEnum',
  members: ['yes',
    'no',
    'text_only'],
});

export const ConnectionTypeEnum = enumType({
  name: 'ConnectionTypeEnum',
  members: ['parent',
    'child'],
});

export const ProductTypeEnum = enumType({
  name: 'ProductTypeEnum',
  members: ['product',
    'service'],
});

export const PossibilityOfPurchaseEnum = enumType({
  name: 'PossibilityOfPurchaseEnum',
  members: ['wholesale',
    'retail'],
});

export const PaymentMethodEnum = enumType({
  name: 'PaymentMethodEnum',
  members: ['cash',
    'non_cash'],
});

export const DeliveryMethodEnum = enumType({
  name: 'DeliveryMethodEnum',
  members: ['courier',
    'fast_courier',
    'mail',
    'cdek'],
});

export const StandardEnum = enumType({
  name: 'StandardEnum',
  members: ['gost',
    'iso'],
});
