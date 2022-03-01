import {
  CART_EVENT_BUILDER,
  REGISTER_DELETE_CART,
  REGISTER_DELETE_SAVED_CART_EVENTS,
  SAVED_CART_EVENT_BUILDER,
  SPARTACUS_CART_SAVED_CART_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// feature-libs/cart/saved-cart/core/events/saved-cart-event.builder.ts
export const SAVED_CART_EVENT_BUILDER_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: SAVED_CART_EVENT_BUILDER,
    importPath: SPARTACUS_CART_SAVED_CART_CORE,
    deprecatedNode: REGISTER_DELETE_SAVED_CART_EVENTS,
    comment: `// ${TODO_SPARTACUS} Method '${REGISTER_DELETE_SAVED_CART_EVENTS}' was moved to '${CART_EVENT_BUILDER}', and was renamed to '${REGISTER_DELETE_CART}''.`,
  },
];
