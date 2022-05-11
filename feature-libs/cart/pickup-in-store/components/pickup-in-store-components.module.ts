import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { PickupDeliveryOptionsComponent } from './pickup-delivery-options/pickup-delivery-options.component';

@NgModule({
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        PickupInStoreDeliveryOptionsComponent: {
          component: PickupDeliveryOptionsComponent,
        },
      },
    }),
  ],
  declarations: [PickupDeliveryOptionsComponent],
  exports: [PickupDeliveryOptionsComponent],
})
export class PickupInStoreComponentModule {}
