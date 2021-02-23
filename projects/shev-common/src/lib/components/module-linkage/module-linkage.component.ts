import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shev-module-linkage',
  templateUrl: './module-linkage.component.html',
  styles: [],
})
export class ModuleLinkageComponent implements OnInit {
  @Input() subAppModuleList: any;

  key: any;
  nameVisible: any = false;
  showName: any;
  renameId: any;
  item: any;
  constructor() {}

  ngOnInit() {}

  handleOk(): void {
    this.nameVisible = false;
    this.subAppModuleList[this.key].appModuleName = this.showName;
    // this.subAppModuleList[this.key].status = this.status;
  }

  handleCancel(): void {
    this.nameVisible = false;
    this.showName = null;
    this.subAppModuleList = null;
  }
  rename(item, key) {
    //关闭弹窗，将新的数据赋值给item
    this.key = key;
    this.nameVisible = true;
    this.showName = item.appModuleName;
    this.renameId = item.appModuleId;
  }
  statusChange(status, item) {
    item.status = status;
  }
}
