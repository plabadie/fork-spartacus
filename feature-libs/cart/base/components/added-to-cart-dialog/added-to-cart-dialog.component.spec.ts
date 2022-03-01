import {
  Component,
  DebugElement,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartFacade,
  Cart,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import {
  FeaturesConfig,
  FeaturesConfigModule,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import {
  ICON_TYPE,
  ModalDirective,
  PromotionsModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { cold } from 'jasmine-marbles';
import { ModalService } from 'projects/storefrontlib/shared/components/modal/modal.service';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { AddedToCartDialogComponent } from './added-to-cart-dialog.component';
@Directive({
  selector: '[cxModal]',
})
class MockModalDirective implements Partial<ModalDirective> {
  @Input() cxModal;
}

class MockActiveCartService implements Partial<ActiveCartFacade> {
  updateEntry(_entryNumber: number, _quantity: number): void {}

  getEntries(): Observable<OrderEntry[]> {
    return of([]);
  }

  getActive(): Observable<Cart> {
    return of({});
  }
  getLastEntry(_productCode: string): Observable<OrderEntry | undefined> {
    return of({});
  }
  isStable(): Observable<boolean> {
    return of(true);
  }
  getEntry(_productCode: string): Observable<OrderEntry | undefined> {
    return of({});
  }
}

const mockOrderEntries: OrderEntry[] = [
  {
    quantity: 1,
    entryNumber: 1,
    product: {
      code: 'CODE1111',
    },
  },
  {
    quantity: 2,
    entryNumber: 1,
    product: {
      code: 'CODE1111',
    },
  },
];

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockModalService {
  dismissActiveModal(): void {}
}

class MockRoutingService implements Partial<RoutingService> {
  getRouterState = () => of({ nextState: undefined } as RouterState);
}

@Component({
  selector: 'cx-cart-item',
  template: '',
})
class MockCartItemComponent {
  @Input() compact = false;
  @Input() item: Observable<OrderEntry>;
  @Input() readonly = false;
  @Input() quantityControl: FormControl;
  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('AddedToCartDialogComponent', () => {
  let component: AddedToCartDialogComponent;
  let fixture: ComponentFixture<AddedToCartDialogComponent>;
  let el: DebugElement;
  let activeCartFacade: ActiveCartFacade;
  let mockModalService: MockModalService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          RouterTestingModule,
          SpinnerModule,
          I18nTestingModule,
          PromotionsModule,
          FeaturesConfigModule,
        ],
        declarations: [
          AddedToCartDialogComponent,
          MockCartItemComponent,
          MockUrlPipe,
          MockCxIconComponent,
          MockModalDirective,
        ],
        providers: [
          {
            provide: ModalService,
            useClass: MockModalService,
          },
          {
            provide: ActiveCartFacade,
            useClass: MockActiveCartService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: FeaturesConfig,
            useValue: {
              features: { level: '1.3' },
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedToCartDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    mockModalService = TestBed.inject(ModalService);

    spyOn(activeCartFacade, 'updateEntry').and.callThrough();
    spyOn(mockModalService, 'dismissActiveModal').and.callThrough();
    component.entry$ = of(mockOrderEntries[0]);
    component.loaded$ = of(true);
    component.addedEntryWasMerged$ = of(false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('init()', () => {
    it('should init the component', () => {
      component.quantity = -1;
      component.entry$ = EMPTY;
      component.addedEntryWasMerged$ = EMPTY;

      spyOn(activeCartFacade, 'getLastEntry').and.returnValue(
        cold('a', { a: mockOrderEntries[0] })
      );

      spyOn(component as any, 'getAddedEntryWasMerged').and.stub();
      component.init('productCode', 3, 2);

      expect(component.quantity).toEqual(3);
      expect((component as any)['getAddedEntryWasMerged']).toHaveBeenCalledWith(
        2
      );
      expect(component.entry$).toBeObservable(
        cold('r', { r: mockOrderEntries[0] })
      );
    });
  });

  describe('getAddedEntryWasMerged()', () => {
    it('should return observable<true> when entry was merged.', () => {
      spyOn(activeCartFacade, 'getEntries').and.returnValue(
        cold('a', { a: mockOrderEntries })
      );
      component.loaded$ = cold('t', { t: true });
      expect(component['getAddedEntryWasMerged'](2)).toBeObservable(
        cold('t', { t: true })
      );
    });
    it('should return observable<false> when a new entry is added.', () => {
      spyOn(activeCartFacade, 'getEntries').and.returnValue(
        cold('a', { a: mockOrderEntries })
      );
      component.loaded$ = cold('t', { t: true });
      expect(component['getAddedEntryWasMerged'](3)).toBeObservable(
        cold('f', { f: false })
      );
    });
  });

  it('should display loading placeholder', () => {
    component.loaded$ = of(false);
    fixture.detectChanges();
    expect(
      el.query(By.css('.cx-dialog-title')).nativeElement.textContent.trim()
    ).toEqual('addToCart.updatingCart');
    expect(el.query(By.css('cx-spinner')).nativeElement).toBeDefined();
  });

  it('should display quantity', () => {
    fixture.detectChanges();
    expect(
      el.query(By.css('.cx-dialog-title')).nativeElement.textContent.trim()
    ).toEqual('addToCart.itemsAddedToYourCart');
  });

  it('should display cart item', () => {
    fixture.detectChanges();
    expect(el.query(By.css('cx-cart-item'))).toBeDefined();
  });

  it('should display cart total', () => {
    component.cart$ = of({
      deliveryItemsQuantity: 1,
      totalPrice: {
        formattedValue: '$100.00',
      },
      subTotal: {
        formattedValue: '$100.00',
      },
    });
    fixture.detectChanges();
    const cartTotalEl = el.query(By.css('.cx-dialog-total')).nativeElement;
    expect(cartTotalEl.children[0].textContent).toEqual(
      ' cartItems.cartTotal count:1 '
    );
    expect(cartTotalEl.children[1].textContent).toEqual('$100.00');
  });

  it('should return formControl with order entry quantity', (done) => {
    component.entry$ = of({
      quantity: 5,
      entryNumber: 0,
    } as OrderEntry);

    component
      .getQuantityControl()
      .pipe(take(1))
      .subscribe((control) => {
        expect(control.value).toEqual(5);
        done();
      });
  });

  it('should return formControl with updated order entry quantity', (done) => {
    const entry$ = new BehaviorSubject<any>({
      quantity: 5,
      entryNumber: 0,
    });

    component.entry$ = entry$;
    component
      .getQuantityControl()
      .pipe(skip(1))
      .subscribe((control) => {
        expect(control.value).toEqual(50);
        done();
      });

    entry$.next({
      quantity: 50,
      entryNumber: 0,
    });
  });

  it('should show added dialog title message in case new entry appears in cart', () => {
    component.entry$ = of(mockOrderEntries[0]);
    component.loaded$ = of(true);
    spyOn(activeCartFacade, 'getEntries').and.returnValue(of(mockOrderEntries));
    fixture.detectChanges();
    const dialogTitleEl = el.query(By.css('.cx-dialog-title')).nativeElement;
    expect(dialogTitleEl.textContent).toEqual(
      ' addToCart.itemsAddedToYourCart '
    );
  });

  it('should show increment dialog title message in case no new entry appears in cart', () => {
    component.entry$ = of(mockOrderEntries[0]);
    component.loaded$ = of(true);
    component.addedEntryWasMerged$ = of(true);
    spyOn(activeCartFacade, 'getEntries').and.returnValue(of(mockOrderEntries));
    fixture.detectChanges();
    const dialogTitleEl = el.query(By.css('.cx-dialog-title')).nativeElement;
    expect(dialogTitleEl.textContent).toEqual(
      ' addToCart.itemsIncrementedInYourCart '
    );
  });

  it('should not show cart entry', () => {
    component.loaded$ = of(false);
    component.modalIsOpen = false;
    expect(el.query(By.css('cx-cart-item'))).toBeNull();
  });

  it('should show cart entry', () => {
    fixture.detectChanges();
    component.loaded$ = of(true);
    component.modalIsOpen = false;
    expect(el.query(By.css('cx-cart-item'))).toBeDefined();

    component.loaded$ = of(true);
    component.modalIsOpen = true;
    expect(el.query(By.css('cx-cart-item'))).toBeDefined();

    component.loaded$ = of(false);
    component.modalIsOpen = true;
    expect(el.query(By.css('cx-cart-item'))).toBeDefined();
  });

  it('should close modal after removing cart item', (done) => {
    fixture.detectChanges();
    component
      .getQuantityControl()
      .pipe(take(1))
      .subscribe((control) => {
        control.setValue(0);
        expect(mockModalService.dismissActiveModal).toHaveBeenCalled();
        done();
      });
  });
});
