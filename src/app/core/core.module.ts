import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserHandlerService } from '@coreServices/user-handler.service';
import { DataServiceService } from '@coreServices/data-service.service';
import { ErrorLoggerService } from '@coreServices/error-logger.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [UserHandlerService, DataServiceService, ErrorLoggerService]
})
export class CoreModule { }
