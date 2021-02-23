import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NzI18nModule } from 'ng-zorro-antd/i18n';


import { ShevCommonComponent } from './shev-common.component';

//按需引入所需组件
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

import { NzListModule, } from 'ng-zorro-antd/list';
import { NzDatePickerModule, } from 'ng-zorro-antd/date-picker';
import { NzCalendarModule, } from 'ng-zorro-antd/calendar';
import { NzTreeModule, } from 'ng-zorro-antd/tree';
import { NzStepsModule, } from 'ng-zorro-antd/steps';
import { NzTypographyModule, } from 'ng-zorro-antd/typography';
import { NzTimePickerModule, } from 'ng-zorro-antd/time-picker';
import { NzDescriptionsModule, } from 'ng-zorro-antd/descriptions';

import { AlainThemeModule } from '@delon/theme';
import { STModule } from '@delon/abc/st';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';

import { TranslateModule } from '@ngx-translate/core';
import { SortablejsModule } from 'ngx-sortablejs';
import { CountdownModule } from 'ngx-countdown';
import { NgxTinymceModule } from 'ngx-tinymce';
import { QuillModule } from 'ngx-quill';

//pipe
import { EmptyCharacterPipe } from './pipe/empty-character/empty-character.pipe';

const PIPEMODULES = [EmptyCharacterPipe];

import { EllipsisModule } from '@delon/abc/ellipsis';

const THIRDMODULES = [
  //按需引入所需组件
  NzButtonModule,
  NzIconModule,
  NzUploadModule,
  NzAvatarModule,
  NzBadgeModule,
  NzTableModule,
  NzModalModule,
  NzDrawerModule,
  NzDividerModule,
  NzSwitchModule,
  NzMenuModule,
  NzAlertModule,
  NzTabsModule,
  NzSliderModule,
  NzInputNumberModule,
  NzSelectModule,
  NzSpinModule,
  NzDropDownModule,
  NzCardModule,
  NzGridModule,
  NzMessageModule,
  NzPageHeaderModule,
  NzTagModule,
  NzBreadCrumbModule,
  NzEmptyModule,
  NzListModule,
  NzDatePickerModule,
  NzCalendarModule,
  NzTreeModule,
  NzStepsModule,
  NzTypographyModule,
  NzTimePickerModule,
  NzDescriptionsModule,
  NzInputModule,
  NzFormModule,
  NzCheckboxModule,
  NzPaginationModule,
  NzToolTipModule,
  NzRadioModule,
  CountdownModule,
  //富文本
  NgxTinymceModule,
  QuillModule,
  TranslateModule,
  EllipsisModule,
];

//module
import { JsonSchemaModule } from './json-schema.module'

// import {
//   NzDateCellDirective,
//   NzDateFullCellDirective,
//   NzMonthCellDirective,
//   NzMonthFullCellDirective,
// } from './components/calendar/nz-calendar-cells';

//公用组件
import { AvatarComponent } from './components/avatar/avatar.component'
import { TableComponent } from './components/table/table.component';
import { ImagePickerComponent } from './components/image-picker/image-picker.component';
import { NgxDndContentComponent } from './components/ngx-dnd-content/ngx-dnd-content.component';
// import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { SearchComponent } from './components/search/search.component';
// import { CalendarComponent } from './components/calendar/calendar.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { ContentImageCardComponent } from './components/content-image-card/content-image-card.component';
import { CoverUploadComponent } from './components/cover-upload/cover-upload.component';
import { ModuleLinkageComponent } from './components/module-linkage/module-linkage.component';
import { CardComponent } from './components/card/card.component';
// #引入自定义组件
const COMPONENTS = [
  SearchComponent,
  TableComponent,
  AvatarComponent,
  DynamicFormComponent,
  // ChatBoxComponent,
  // CalendarComponent,
  ImagePickerComponent,
  NgxDndContentComponent,
  ContentImageCardComponent,
  CardComponent,
  CoverUploadComponent,
  ModuleLinkageComponent,
  // NzDateCellDirective,
  // NzDateFullCellDirective,
  // NzMonthCellDirective,
  // NzMonthFullCellDirective,
];


//国际化
// #region i18n
import { default as ngLang } from '@angular/common/locales/zh';
import { NZ_I18N, zh_CN as zorroLang } from 'ng-zorro-antd/i18n';
import { DELON_LOCALE, zh_CN as delonLang } from '@delon/theme';
const LANG = {
  abbr: 'zh',
  ng: ngLang,
  zorro: zorroLang,
  delon: delonLang,
};
// register angular
import { registerLocaleData } from '@angular/common';
registerLocaleData(LANG.ng, LANG.abbr);
const LANG_PROVIDES = [
  { provide: LOCALE_ID, useValue: LANG.abbr },
  { provide: NZ_I18N, useValue: LANG.zorro },
  { provide: DELON_LOCALE, useValue: LANG.delon },
];
// #endregion


@NgModule({
  declarations: [ShevCommonComponent, ...COMPONENTS, ...PIPEMODULES,],
  imports: [
    CommonModule,
    NzI18nModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    FormsModule,
    AlainThemeModule,
    STModule,
    DelonACLModule,
    DelonFormModule,
    JsonSchemaModule,
    SortablejsModule,
    ...THIRDMODULES,
  ],
  providers: [...LANG_PROVIDES],
  exports: [ShevCommonComponent, JsonSchemaModule, ...COMPONENTS, ...PIPEMODULES,]
})
export class ShevCommonModule { }