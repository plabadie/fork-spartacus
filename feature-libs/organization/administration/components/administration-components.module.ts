import { NgModule } from '@angular/core';
import { AccountSummaryComponentsModule } from './account-summary/account-summary-components.module';
import { BudgetComponentsModule } from './budget/budget-components.module';
import { CostCenterComponentsModule } from './cost-center/cost-center-components.module';
import { PermissionComponentsModule } from './permission/permission-components.module';
import { UnitsComponentsModule } from './unit/units-components.module';
import { UserGroupComponentsModule } from './user-group/user-group-components.module';
import { UserComponentsModule } from './user/user-components.module';

@NgModule({
  imports: [
    AccountSummaryComponentsModule,
    BudgetComponentsModule,
    CostCenterComponentsModule,
    UnitsComponentsModule,
    UserGroupComponentsModule,
    UserComponentsModule,
    PermissionComponentsModule,
  ],
})
export class AdministrationComponentsModule {}
