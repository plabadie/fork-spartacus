import { NgModule } from '@angular/core';
import { BundleRootModule, BUNDLE_FEATURE } from '@spartacus/cart/bundle/root';
import { provideConfig } from '@spartacus/core';

@NgModule({
  imports: [BundleRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [BUNDLE_FEATURE]: {
          module: () =>
            import('@spartacus/cart/bundle').then((m) => m.BundleModule),
        },
      },
    }),
  ],
})
export class BundleFeatureModule {}
