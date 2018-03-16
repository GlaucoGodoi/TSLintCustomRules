import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollComponent } from '@featureModules/subscription/enroll/enroll.component';
import { SuspendComponent } from '@featureModules/subscription/suspend/suspend.component';
import { ViewConsumptionComponent } from '@featureModules/subscription/view-consumption/view-consumption.component';
import { SubscriptionLocalService } from '@featureModules/subscription/subscription-local.service';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EnrollComponent, SuspendComponent, ViewConsumptionComponent],
  providers: [SubscriptionLocalService]
})
export class SubscriptionModule { }
