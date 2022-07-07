import { Injectable } from '@angular/core';

import { OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';

import { UnitItemService } from '../../unit/services/unit-item.service';
import { UnitTreeService } from '../../unit/services/unit-tree.service';
import {UnitListService} from "../../unit";

/**
 * Service to populate Unit data to `Table` data. Unit
 * data is driven by the table configuration, using the `OrganizationTables.UNIT`.
 */
@Injectable({
  providedIn: 'root',
})
export class AccountSummaryListService extends UnitListService {
  constructor(
    protected tableService: TableService,
    protected unitService: OrgUnitService,
    protected unitItemService: UnitItemService,
    protected unitTreeService: UnitTreeService
  ) {
    super(tableService, unitService, unitItemService, unitTreeService);
  }
}

