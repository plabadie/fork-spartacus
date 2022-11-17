/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorOverviewFilterButtonComponent } from './configurator-overview-filter-button.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorOverviewFilterButton: {
          component: ConfiguratorOverviewFilterButtonComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorOverviewFilterButtonComponent],
  exports: [ConfiguratorOverviewFilterButtonComponent],
})
export class ConfiguratorOverviewFilterButtonModule {}
