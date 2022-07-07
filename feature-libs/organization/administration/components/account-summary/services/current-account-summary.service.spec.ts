import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import {
  OrgUnitService,
  PermissionService,
} from '@spartacus/organization/administration/core';
import { of } from 'rxjs';
import { CurrentAccountSummaryService } from './current-account-summary.service';

class MockRoutingService {
  getParams() {
    return of();
  }

  getRouterState() {
    return of();
  }
}

class MockOrgUnitService implements Partial<PermissionService> {
  get() {
    return of();
  }
}

describe('CurrentAccountSummaryService', () => {
  let service: CurrentAccountSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentAccountSummaryService,

        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    });

    service = TestBed.inject(CurrentAccountSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
