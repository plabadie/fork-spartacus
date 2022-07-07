import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import {
  LoadStatus,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { of } from 'rxjs';
import { AccountSummaryFormService } from '../form/account-summary-form.service';
import { CurrentAccountSummaryService } from './current-account-summary.service';
import { AccountSummaryItemService } from './account-summary-item.service';
import createSpy = jasmine.createSpy;

const mockCode = 'u1';
class MockRoutingService {
  go() {}
}

const form = new FormGroup({});
form.addControl('name', new FormControl('foo bar'));
form.addControl('uid', new FormControl('unitUid'));

const mockItemStatus = of({ status: LoadStatus.SUCCESS, item: {} });

class MockUnitService {
  get() {
    return of();
  }
  load() {}
  update() {}
  create() {}
  getLoadingStatus() {
    return mockItemStatus;
  }
}

class MockUnitFormService {}

class MockCurrentUnitService {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(of());
  error$ = of(false);
}

describe('AccountSummaryItemService', () => {
  let service: AccountSummaryItemService;
  let unitService: OrgUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountSummaryItemService,
        { provide: CurrentAccountSummaryService, useClass: MockCurrentUnitService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: AccountSummaryFormService, useClass: MockUnitFormService },
        { provide: OrgUnitService, useClass: MockUnitService },
      ],
    });

    service = TestBed.inject(AccountSummaryItemService);
    unitService = TestBed.inject(OrgUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load unit', () => {
    spyOn(unitService, 'get').and.callThrough();
    service.load('123').subscribe();
    expect(unitService.get).toHaveBeenCalledWith('123');
  });

  it('should get unit from facade', () => {
    spyOn(unitService, 'get').and.callThrough();
    service.load('123').subscribe();
    expect(unitService.get).toHaveBeenCalledWith('123');
  });

  it('should load unit on each request', () => {
    spyOn(unitService, 'load').and.callThrough();
    service.load('123').subscribe();
    expect(unitService.load).toHaveBeenCalledWith('123');
  });

  it('should update existing unit', () => {
    spyOn(unitService, 'update').and.callThrough();
    spyOn(unitService, 'getLoadingStatus').and.callThrough();

    expect(service.save(form, 'existingCode')).toEqual(mockItemStatus);
    expect(unitService.update).toHaveBeenCalledWith('existingCode', {
      name: 'foo bar',
      uid: 'unitUid',
    });
    expect(unitService.getLoadingStatus).toHaveBeenCalledWith('unitUid');
  });

  it('should create new unit', () => {
    spyOn(unitService, 'create').and.callThrough();
    spyOn(unitService, 'getLoadingStatus').and.callThrough();

    expect(service.save(form)).toEqual(mockItemStatus);
    expect(unitService.create).toHaveBeenCalledWith({
      name: 'foo bar',
      uid: 'unitUid',
    });
    expect(unitService.getLoadingStatus).toHaveBeenCalledWith('unitUid');
  });

  it('should launch unit detail route', () => {
    const routingService = TestBed.inject(RoutingService);
    spyOn(routingService, 'go').and.callThrough();
    service.launchDetails({ name: 'foo bar' });
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orgUnitDetails',
      params: { name: 'foo bar' },
    });
  });
});
