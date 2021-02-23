import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'shev-content-image-card',
  templateUrl: './content-image-card.component.html',
  styles: []
})
export class ContentImageCardComponent implements OnInit {

  list: any = [];
  imgPickerType: any = "image/png,image/jpeg,image/gif,image/bmp";

  @Input() value: any = [];
  @Output() private outer = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    if (this.value && this.value.length) {
      this.list = this.value
    }
  }


  //新增
  add() {
    if (this.list && this.list.length == 0) {
      this.list.push({ seq: 0, content: null, resourceList: [] })
    } else {
      if (this.list[this.list.length - 1].content || this.list[this.list.length - 1].resourceList.length > 0) {
        this.list.push({ seq: this.list.length, content: null, resourceList: [] })
      }
    }
    this.outer.emit(JSON.stringify(this.list))
  }


  imgDataChange(list, index) {
    this.list[index].resourceList = JSON.parse(list);
    this.outer.emit(JSON.stringify(this.list))
  }

  //设置content
  setValue(value, index) {
    this.list[index].content = value;
    this.outer.emit(JSON.stringify(this.list))
  }

  //删除
  deleteItem(index) {
    this.list = this.list.filter((item) => item != this.list[index]);
    this.list.forEach((element, i) => {
      element.seq = i
    });
    this.outer.emit(JSON.stringify(this.list))
  }

  //排序
  dataChange(data) {
    data.forEach((element, i) => {
      element.seq = i
    });
    this.list = data;
    this.outer.emit(JSON.stringify(this.list))
  }
}
