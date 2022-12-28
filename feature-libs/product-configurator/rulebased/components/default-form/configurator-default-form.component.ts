/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { LanguageService } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { ConfigFormUpdateEvent } from './configurator-default-form.event';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';

@Component({
  selector: 'cx-configurator-default-form',
  templateUrl: './configurator-default-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorDefaultFormComponent implements OnInit {
  @Input() group: Configurator.Group;
  @Input() owner: CommonConfigurator.Owner;

  activeLanguage$: Observable<string> = this.languageService.getActive();
  uiType = Configurator.UiType;

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected languageService: LanguageService,
    protected configUtils: ConfiguratorStorefrontUtilsService,
    protected configExpertModeService: ConfiguratorExpertModeService
  ) {}

  ngOnInit(): void {
    this.configRouterExtractorService
      .extractRouterData()
      .pipe(take(1))
      .subscribe((routingData) => {
        //In case of resolving issues, check if the configuration contains conflicts,
        //if not, check if the configuration contains missing mandatory fields and show the group
        if (routingData.resolveIssues) {
          this.configuratorCommonsService
            .hasConflicts(routingData.owner)
            .pipe(take(1))
            .subscribe((hasConflicts) => {
              if (hasConflicts && !routingData.skipConflicts) {
                this.configuratorGroupsService.navigateToConflictSolver(
                  routingData.owner
                );

                //Only check for Incomplete group when there are no conflicts or conflicts should be skipped
              } else {
                this.configuratorGroupsService.navigateToFirstIncompleteGroup(
                  routingData.owner
                );
              }
            });
        }
        if (routingData.expMode) {
          this.configExpertModeService?.setExpModeRequested(
            routingData.expMode
          );
        }
      });
  }

  updateConfiguration(event: ConfigFormUpdateEvent): void {
    this.configuratorCommonsService.updateConfiguration(
      event.ownerKey,
      event.changedAttribute,
      event.updateType
    );
  }

  isConflictGroupType(groupType: Configurator.GroupType | undefined): boolean {
    return groupType
      ? this.configuratorGroupsService.isConflictGroupType(groupType)
      : false;
  }

  /**
   * Display group description box only for conflict groups with a given group name (i.e. a conflict description)
   * @param group
   * @returns true if conflict description box should be displayed
   */
  displayConflictDescription(group: Configurator.Group): boolean {
    return (
      group.groupType !== undefined &&
      this.configuratorGroupsService.isConflictGroupType(group.groupType) &&
      group.name !== ''
    );
  }

  /**
   * Generates a group ID.
   *
   * @param {string} groupId - group ID
   * @returns {string | undefined} - generated group ID
   */
  createGroupId(groupId?: string): string | undefined {
    return this.configUtils.createGroupId(groupId);
  }

  get expMode(): Observable<boolean> | undefined {
    return this.configExpertModeService?.getExpModeActive();
  }
}