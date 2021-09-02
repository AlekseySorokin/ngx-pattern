import { NgModule } from '@angular/core';
import { NgxPatternDirective } from './ngx-pattern.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NgxPatternDirective],
  imports: [
    FormsModule
  ],
  exports: [
    NgxPatternDirective
  ]
})
export class NgxPatternModule {
}
