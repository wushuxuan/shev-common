import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { STColumn, STChange, STPage } from '@delon/abc';

@Component({
  selector: 'shev-avatar',
  templateUrl: './avatar.component.html',
  styles: []
})
export class AvatarComponent implements OnInit {
  @Input() type: any;
  @Input() showSrc: boolean = false;
  @Input() data: any;
  @Input() size: any = 64;
  //是否多选
  @Input() multiple: boolean;
  @Input() max: any = 9999;
  //是否显示徽标数
  @Input() isShowDot: boolean;
  @Input() isCheck: boolean;
  @Input() dataChange: any;

  @Output() private outer = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {

  }

  onClick(e: STChange) {
    if (this.isCheck) {
      //是否可以选择
      if (this.multiple) {
        //是否多选
        var number = 0;
        this.data.forEach(element => {
          if (element.checked) {
            number++;
          }
        })
        this.data.forEach(element => {
          if (element.userId == e) {
            if (this.max > number) {
              element.checked = !element.checked;
            } else if (element.checked) {
              element.checked = !element.checked;
            }
          }
        });
      } else {
        //不可以多选
        this.data.forEach(element => {
          if (element.userId == e) {
            element.checked = !element.checked;
          } else {
            element.checked = false;
          }
        });
      }
    }
    this.outer.emit(JSON.stringify(this.data))
  }

}
