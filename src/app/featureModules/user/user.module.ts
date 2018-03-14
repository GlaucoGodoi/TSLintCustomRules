import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@featureModules/user/login/login.component';
import { RegisterComponent } from '@featureModules/user/register/register.component';
import { UserLocalService } from '@featureModules/user/user-local.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent, RegisterComponent],
  providers: [UserLocalService]
})
export class UserModule { }
