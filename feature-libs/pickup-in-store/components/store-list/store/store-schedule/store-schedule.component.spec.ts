import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, PointOfService } from '@spartacus/core';
import { IconTestingModule } from '@spartacus/storefront';
import { StoreScheduleComponent } from './store-schedule.component';

describe('StoreScheduleComponent', () => {
  let component: StoreScheduleComponent;
  let fixture: ComponentFixture<StoreScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, IconTestingModule],
      declarations: [StoreScheduleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should fail gracefully when storeDetails input is undefined', () => {
    const storeDetails: PointOfService = undefined as unknown as PointOfService;
    component.storeDetails = storeDetails;
    component.ngOnInit();
    expect(component.openingTimes).toEqual([]);
  });

  it('should fail gracefully when storeDetails input is an empty Object', () => {
    const storeDetails: PointOfService = {};
    component.storeDetails = storeDetails;
    component.ngOnInit();
    expect(component.openingTimes).toEqual([]);
  });

  it('should fail gracefully when openingHours input is an empty Object', () => {
    const storeDetails: PointOfService = {
      openingHours: {},
    };
    component.storeDetails = storeDetails;
    component.ngOnInit();
    expect(component.openingTimes).toEqual([]);
  });

  it('should create an openingTimes array from storeDetails input', () => {
    const storeDetails: PointOfService = {
      openingHours: {
        weekDayOpeningList: [
          {
            weekDay: 'Mon',
            closed: false,
            closingTime: { formattedHour: '18:30' },
            openingTime: { formattedHour: '09:00' },
          },
          {
            closed: false,
          },
        ],
      },
    };
    component.storeDetails = storeDetails;
    component.ngOnInit();
    expect(component.openingTimes).toEqual([
      { weekDay: 'Mon', closed: false, openingHours: '09:00 - 18:30' },
      { weekDay: '', closed: false, openingHours: ' - ' },
    ]);
  });
});