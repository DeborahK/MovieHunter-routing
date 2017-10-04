import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StarComponent } from './star.component';
import { RangeValidatorDirective } from './range.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StarComponent,
    RangeValidatorDirective
  ],
  exports: [
    StarComponent,
    CommonModule,
    FormsModule,
    RangeValidatorDirective
  ]
})
export class SharedModule { }
