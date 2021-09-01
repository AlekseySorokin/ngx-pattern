import { NgModule } from '@angular/core';
import { NgxPatternDirective } from './ngx-pattern.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NgxPatternDirective],
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NgxPatternDirective
  ]
})
export class NgxPatternModule {
}
