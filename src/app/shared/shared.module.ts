import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlinkWhenHoverDirective } from '@sharedDirectives/blink-when-hover.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BlinkWhenHoverDirective]
})
export class SharedModule { }
