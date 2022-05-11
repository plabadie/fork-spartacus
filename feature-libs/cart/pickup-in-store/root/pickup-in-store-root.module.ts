import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CART_PICKUP_IN_STORE_FEATURE } from './feature-name';

@NgModule({
  providers: [
    provideDefaultConfig({
      featureModules: {
        [CART_PICKUP_IN_STORE_FEATURE]: {
          cmsComponents: ['PickupInStoreDeliveryOptionsComponent'],
        },
      },
    }),
  ],
})
export class PickupInStoreRootModule {}
