import { NgModule, } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DelonFormModule, WidgetRegistry,NzWidgetRegistry } from '@delon/form';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { TranslateModule } from '@ngx-translate/core';

import { DelonACLModule } from '@delon/acl';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker'
import {NzModalModule} from 'ng-zorro-antd/modal'
import {NzUploadModule} from 'ng-zorro-antd/upload'
import {QuillModule} from 'ngx-quill'

import { SfuploadsWidget } from './widgets/sfuploads/sfuploads.component';
import { DateRangWidget } from './widgets/date-rang/date-rang.component';
// import { BTinymceWidget } from './widgets/tinymce/tinymce.component';


export const SCHEMA_THIRDS_COMPONENTS = [
  DateRangWidget,
  SfuploadsWidget,
  // BTinymceWidget,
];

@NgModule({
  declarations: SCHEMA_THIRDS_COMPONENTS,
  entryComponents: SCHEMA_THIRDS_COMPONENTS,
  imports: [
    CommonModule,
    NzI18nModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    FormsModule,
    QuillModule,
    NzDatePickerModule,
    NzModalModule,
    NzUploadModule,
    TranslateModule,
    DelonACLModule,
    DelonFormModule
  ],
  providers: [
    {provide: WidgetRegistry, useClass: NzWidgetRegistry}
  ],
  exports: [
    ...SCHEMA_THIRDS_COMPONENTS
  ]
})
export class JsonSchemaModule {
  constructor(widgetRegistry: WidgetRegistry) {
    widgetRegistry.register('dateRang', DateRangWidget);
    widgetRegistry.register('uploads', SfuploadsWidget);
  }
}
