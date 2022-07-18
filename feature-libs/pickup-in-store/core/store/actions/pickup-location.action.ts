import { createAction, props } from '@ngrx/store';
import { PointOfService } from '@spartacus/core';

export const ADD_LOCATION = '[Pickup Locations] Add Location';
export const REMOVE_LOCATION = '[Pickup Locations] Remove Location';

export type AddLocationProps = {
  payload: {
    productCode: string;
    location: PointOfService;
  };
};

/**
 * Add a proposed pickup location for a product code.
 */
export const AddLocation = createAction(
  ADD_LOCATION,
  props<AddLocationProps>()
);

/**
 * Remove a proposed pickup location for a product code.
 */
export const RemoveLocation = createAction(
  REMOVE_LOCATION,
  props<{ payload: string }>()
);