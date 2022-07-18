import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateWithStock, StockState } from '../stock-state';
import { getStockState } from './feature.selectors';

export const getHideOutOfStockState: MemoizedSelector<
  StateWithStock,
  StockState['hideOutOfStock']
> = createSelector(getStockState, (stockState) => stockState.hideOutOfStock);