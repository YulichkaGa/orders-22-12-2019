import 'devextreme-intl';

import { DxDataGridModule, DxTemplateModule } from 'devextreme-angular';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule } from 'devextreme-angular';
import { MatTableModule } from '@angular/material' ;
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@NgModule({
  imports: [
      BrowserModule,
      DxDataGridModule,
      DxTemplateModule,
      MatTableModule,
      DxButtonModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

