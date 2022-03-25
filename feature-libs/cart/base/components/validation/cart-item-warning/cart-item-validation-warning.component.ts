import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CartValidationFacade } from '@spartacus/cart/base/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { CartValidationStatusCode } from 'feature-libs/cart/base/root';
import { of } from 'rxjs';

@Component({
  selector: 'cx-cart-item-validation-warning',
  templateUrl: './cart-item-validation-warning.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemValidationWarningComponent {
  @Input()
  code: string;

  iconTypes = ICON_TYPE;
  isVisible = true;

  cartModification$ = of({
    statusCode: CartValidationStatusCode.LOW_STOCK,
    entry: {
      product: {
        code: 'productCode2',
      },
    },
    quantityAdded: 1,
  });

  constructor(protected cartValidationFacade: CartValidationFacade) {}
}
