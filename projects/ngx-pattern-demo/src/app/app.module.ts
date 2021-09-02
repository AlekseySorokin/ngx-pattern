import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { ForkMeRibbonComponent } from './shared/fork-me-ribbon/fork-me-ribbon.component';
import { TerminalComponent } from './shared/terminal/terminal.component';
import { CardComponent } from './shared/card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPatternModule } from 'ngx-pattern';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ForkMeRibbonComponent,
    TerminalComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPatternModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
