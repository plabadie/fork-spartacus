import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import { PickupLocationsSearchFacade } from '@spartacus/pickup-in-store/root';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OutletContextData,
} from '@spartacus/storefront';
import { MockPreferredStoreService } from 'feature-libs/pickup-in-store/core/services/preferred-store.service.spec';
import { Observable, of } from 'rxjs';
import { CartPickupOptionsContainerComponent } from './cart-pickup-options-container.component';
import { MockPickupLocationsSearchService } from 'feature-libs/pickup-in-store/core/facade/pickup-locations-search.service.spec';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { MockLaunchDialogService } from '../pickup-delivery-option-dialog/pickup-delivery-option-dialog.component.spec';
class MockPickupLocationsSearchFacade
  implements Partial<MockPickupLocationsSearchService>
{
  getStoreDetails = () =>
    of({
      displayName: 'London School',
    });
  setPickupOptionDelivery(
    _cartId: string,
    _entryNumber: number,
    _userId: string,
    _name: string,
    _productCode: string,
    _quantity: number
  ): void {}
}

const mockActiveCart: Cart = {
  name: 'test-active-cart',
  code: 'test-active-cart-code',
  guid: 'cartGuid',
  user: {
    uid: 'test-user-id',
  },
  entries: [
    { entryNumber: 0, product: { name: 'test-product' } },
    { entryNumber: 1, product: { name: 'test-product1' } },
    { entryNumber: 2, product: { name: 'test-product1' } },
  ],
};

const activeCart$ = of(mockActiveCart);

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActive(): Observable<Cart> {
    return activeCart$;
  }
}

const mockOutletContextWithProductCode = {
  product: {
    code: 'productCode',
    availableForPickup: true,
  },
  entryNumber: 1,
  quantity: 1,
  deliveryPointOfService: {
    name: 'London School',
  },
};

const context$ = of(mockOutletContextWithProductCode);

describe('Cart PickupOptionsComponent', () => {
  let component: CartPickupOptionsContainerComponent;
  let fixture: ComponentFixture<CartPickupOptionsContainerComponent>;
  let activeCartService: ActiveCartFacade;
  let launchDialogService: LaunchDialogService;

  const configureTestingModule = () =>
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule, ReactiveFormsModule],
      providers: [
        CartPickupOptionsContainerComponent,
        {
          provide: OutletContextData,
          useValue: { context$ },
        },
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartFacade,
        },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
        {
          provide: PreferredStoreService,
          useClass: MockPreferredStoreService,
        },
        {
          provide: PickupLocationsSearchFacade,
          useClass: MockPickupLocationsSearchFacade,
        },
      ],
      declarations: [CartPickupOptionsContainerComponent],
    });

  const stubServiceAndCreateComponent = () => {
    fixture = TestBed.createComponent(CartPickupOptionsContainerComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    activeCartService = TestBed.inject(ActiveCartFacade);

    spyOn(launchDialogService, 'openDialog').and.callThrough();

    fixture.detectChanges();
  };

  describe('with item data in context', () => {
    beforeEach(() => {
      configureTestingModule().compileComponents();
      stubServiceAndCreateComponent();
    });

    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should trigger and open dialog', () => {
      component.openDialog();
      expect(launchDialogService.openDialog).toHaveBeenCalledWith(
        LAUNCH_CALLER.PICKUP_IN_STORE,
        component.element,
        component['vcr'],
        { productCode: 'productCode' }
      );
    });

    it('should openDialog if display name is not set', () => {
      spyOn(component, 'openDialog');
      component['displayNameIsSet'] = false;
      component.onPickupOptionChange('delivery');
      expect(component.openDialog).toHaveBeenCalled();
    });

    it('should set cartId to active cart id', () => {
      spyOn(activeCartService, 'getActive').and.callThrough();
      component.ngOnInit();
      expect(component['cartId']).toBe('cartGuid');
    });
  });

  describe('without item data in context', () => {
    beforeEach(() => {
      configureTestingModule().overrideProvider(OutletContextData, {
        useValue: {
          context$: of({
            product: {
              availableForPickup: true,
            },
          }),
        },
      });
      TestBed.compileComponents();
      stubServiceAndCreateComponent();
    });

    it('should not set product Code if it doesnt exists on context', () => {
      component.ngOnInit();
      expect(component['productCode']).toBe('');
    });
    it('should set cartId to BLANK', () => {
      spyOn(activeCartService, 'getActive').and.returnValue(of({}));
      component.ngOnInit();
      expect(component['cartId']).toBe('');
    });
    it('should set userId to BLANK', () => {
      spyOn(activeCartService, 'getActive').and.returnValue(of({}));
      component.ngOnInit();
      expect(component['userId']).toBe('');
    });
  });

  describe('without outlet Context', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CommonModule, I18nTestingModule, ReactiveFormsModule],
        providers: [
          CartPickupOptionsContainerComponent,
          {
            provide: ActiveCartFacade,
            useClass: MockActiveCartFacade,
          },
          {
            provide: LaunchDialogService,
            useClass: MockLaunchDialogService,
          },
          {
            provide: PreferredStoreService,
            useClass: MockPreferredStoreService,
          },
          {
            provide: PickupLocationsSearchFacade,
            useClass: MockPickupLocationsSearchFacade,
          },
        ],
        declarations: [CartPickupOptionsContainerComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(CartPickupOptionsContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should not set product Code if outlet is not provided', () => {
      component.ngOnInit();
      expect(component['productCode']).toBe(undefined);
    });
  });
});