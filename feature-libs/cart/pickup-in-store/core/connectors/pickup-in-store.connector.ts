import { Injectable } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { PickupInStoreAdapter } from './pickup-in-store.adapter';

@Injectable()
export class PickupInStoreConnector {
  constructor(protected adapter: PickupInStoreAdapter) {}

  get(userId: string, cartId: string): Observable<Cart> {
    return this.adapter.load(userId, cartId);
  }

  getList(userId: string): Observable<Cart[]> {
    return this.adapter.loadList(userId);
  }

  //   restorePickupInStore(userId: string, casing): Observable<Cart> {
  //     return this.adapter.restorePickupInStore(userId, cartId);
  //   }

  //   saveCart(
  //     userId: string,
  //     cartId: string,
  //     saveCartName?: string,
  //     saveCartDescription?: string
  //   ): Observable<Cart> {
  //     return this.adapter.saveCart(
  //       userId,
  //       cartId,
  //       saveCartName,
  //       saveCartDescription
  //     );
  //   }

  //   clonePickupInStore(userId: string, cartId: string): Observable<Cart> {
  //     return this.adapter.clonePickupInStore(userId, cartId);
  //   }
}
