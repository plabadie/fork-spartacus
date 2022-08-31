import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, TranslationService } from '@spartacus/core';
import {
  CustomerTicketingFacade,
  TicketDetails,
} from '@spartacus/customer-ticketing/root';
import { Card, CardModule } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CustomerTicketingDetailsComponent } from './customer-ticketing-details.component';
import createSpy = jasmine.createSpy;

const mockTicketId = '1';
const mockTicketDetails: TicketDetails = {
  id: mockTicketId,
  subject: 'mockTicket',
  status: { id: 'OPEN', name: 'Open' },
};

class MockTranslationService {
  translate(text: string): Observable<string> {
    return of(text);
  }
}

class MockCustomerTicketingFacade implements Partial<CustomerTicketingFacade> {
  getTicket = createSpy().and.returnValue(of(mockTicketDetails));
}

describe('CustomerTicketingDetailsComponent', () => {
  let component: CustomerTicketingDetailsComponent;
  let fixture: ComponentFixture<CustomerTicketingDetailsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, CardModule],
      declarations: [CustomerTicketingDetailsComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: CustomerTicketingFacade,
          useClass: MockCustomerTicketingFacade,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prepare content for card', (done) => {
    const mockCardContent: Card = {
      text: ['1'],
      title: 'ID',
      customClass: '',
    };
    component
      .prepareCardContent(mockTicketId, 'ID')
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(mockCardContent);
        done();
      });
  });

  describe('getStatusClass', () => {
    function assertStatusClassByStatusId(
      expectedClass: string,
      statusId: string | undefined
    ) {
      const result = component.getStatusClass(statusId);
      expect(result).toEqual(expectedClass);
    }

    it('should return open class when the status is open', () => {
      assertStatusClassByStatusId('cx-text-green', 'OPEN');
    });

    it('should return close class when the status is close', () => {
      assertStatusClassByStatusId('cx-text-gray', 'CLOSE');
    });

    it('should return empty if the id is not passed', () => {
      assertStatusClassByStatusId('', '');
    });

    it('should return empty if the id is undefined', () => {
      assertStatusClassByStatusId('', undefined);
    });
  });
});