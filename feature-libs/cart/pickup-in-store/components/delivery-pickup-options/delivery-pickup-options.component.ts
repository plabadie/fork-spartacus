import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  ElementRef,
  ViewChild,
  Optional,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  CurrentProductService,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { ICON_TYPE } from '@spartacus/storefront';
import { CartItemContextSource } from '@spartacus/cart/base/components';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
@Component({
  selector: 'cx-delivery-pickup-options',
  templateUrl: './delivery-pickup-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryPickupOptionsComponent implements OnInit, OnDestroy {
  @Input() availableForPickup = false;
  private subscription = new Subscription();
  orderEntry: OrderEntry;
  data = '';
  cartLocation = '';
  @ViewChild('open') element: ElementRef;
  iconTypes = ICON_TYPE;

  constructor(
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService,
    protected currentProductService: CurrentProductService,
    protected cartItemContextSource: CartItemContextSource,
    @Optional() protected cartItemContext: CartItemContext
  ) {}

  ngOnInit() {
    this.cartItemContext.item$.subscribe((item) => {
      this.orderEntry = item;
      console.log(item);
    });
    this.cartItemContextSource.location$.subscribe((location) => {
      this.cartLocation = location;
    });
  }

  openDialog(orderEntry: OrderEntry): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.PICKUP_IN_STORE,
      this.element,
      this.vcr,
      orderEntry
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
