import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { ACCOUNT_SUMMARY_NORMALIZER } from '@spartacus/organization/administration/core';
import { OccAccountSummaryAdapter } from './occ-account-summary.adapter';
import createSpy = jasmine.createSpy;

const userId = 'userId';
const accountSummary = {
  id: '123'
};

class MockOccEndpointsService {
  buildUrl = createSpy('MockOccEndpointsService.buildUrl').and.callFake(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    url => url);
}

describe('OccAccountSummaryAdapter', () => {
  let service: OccAccountSummaryAdapter;
  let httpMock: HttpTestingController;

  let converterService: ConverterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccAccountSummaryAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });
    converterService = TestBed.inject(ConverterService);
    service = TestBed.inject(OccAccountSummaryAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(converterService, 'convert').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load accountSummary details', () => {
    it('should load accountSummary details', () => {
      service.load(userId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'accountSummary'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(accountSummary);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        ACCOUNT_SUMMARY_NORMALIZER
      );
    });
  });
});
