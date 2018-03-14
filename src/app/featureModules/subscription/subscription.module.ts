import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollComponent } from '@featureModules/subscription/enroll/enroll.component';
import { SuspendComponent } from '@featureModules/subscription/suspend/suspend.component';
import { ViewConsumpptionComponent } from '@featureModules/subscription/view-consumpption/view-consumpption.component';
import { SubscriptionLocalService } from '@featureModules/subscription/subscription-local.service';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EnrollComponent, SuspendComponent, ViewConsumpptionComponent],
  providers: [SubscriptionLocalService]
})
export class SubscriptionModule { }
