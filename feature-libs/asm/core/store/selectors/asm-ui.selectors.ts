import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AsmUi } from '@spartacus/asm/root';
import { AsmState, StateWithAsm } from '../asm-state';
import { getAsmState } from './feature.selector';

export const getAsmUi: MemoizedSelector<StateWithAsm, AsmUi> = createSelector(
  getAsmState,
  (state: AsmState) => state.asmUi
);
