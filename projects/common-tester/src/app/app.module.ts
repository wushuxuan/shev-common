import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShevCommonModule,JsonSchemaModule } from 'shev-common'
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SearchTestComponent } from './tests/search-test/search-test.component';
import { CardTestComponent } from './tests/card-test/card-test.component'

@NgModule({
  declarations: [
    AppComponent,
    SearchTestComponent,
    CardTestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ShevCommonModule,
    JsonSchemaModule,
    NzSelectModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
