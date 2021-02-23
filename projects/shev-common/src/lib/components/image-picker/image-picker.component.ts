import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import axios from 'axios';
import * as _ from 'lodash'

@Component({
  selector: 'shev-image-picker',
  templateUrl: './image-picker.component.html'
})
export class ImagePickerComponent {
  //数量限制
  @Input() total: number = 9999;
  //类型限制
  @Input() type: string = "";

  @Input() fileList: any = [];

  private  _value:any = []

  @Input() 
  set value(value: any) {
    this._value = [...value]
  }

  get value(): any {
    return this._value;
  }


  @Input() dataChange: any;

  @Input() content: any;

  @Input() disabled: boolean = false;

  @Input() drag: boolean = false;

  @Output() private outer = new EventEmitter<string>();


  previewFile: NzUploadFile;
  previewImage: string | undefined = '';
  previewVisible = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this._value && this._value.length > 0) {
      var list = [];
      this._value.forEach(element => {
        element.message = "上传成功"
        list.push(element)
      });
      this.fileList = list;
    }
  }


  beforeUpload = (file): boolean => {
    let reader = new FileReader();
    reader.onloadend = (e: any) => {
      file.thumbUrl = e.target.result;
      var params = new FormData();
      params.append("file", file)
      axios({
        url: '/storage/cloudservice/content/file/upload?responseType=json',
        method: 'post',
        data: params,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        withCredentials: true,
      }).then((res: any) => {
        if (res.status == 200) {
          file.uid = res.data.data.id;
          file.fileName = res.data.data.name;
          file.thumbUrl = res.data.data.downloadUrl;
          file.url = res.data.data.downloadUrl;
          this.outer.emit(JSON.stringify(this.fileList.concat(file)))
          this.fileList = this.fileList.concat(file);
        }
      })
      // this.outer.emit(JSON.stringify(this.fileList.concat(file)))
      // this.fileList = this.fileList.concat(file);
    }
    reader.readAsDataURL(file);
    return false;
  };


  handlePreview = (file: NzUploadFile) => {
    this.previewFile = file;
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  delItem(item) {
    this.fileList = _.without(this.fileList, item)
    this.outer.emit(JSON.stringify(this.fileList));
  }

  //移除
  handleRemove = () => {
    if (!this.disabled) {
      return true;
    } else {
      return false;
    }
  };

  handleChange({ file, fileList }: { [key: string]: any }): void {
    if (!this.disabled) {
      this.fileList = fileList
      this.outer.emit(JSON.stringify(fileList));
    }
  }

  //排序
  sortChange(data) {
    data.forEach((element, i) => {
      element.seq = i
    });
    this.fileList = data;
    this.outer.emit(JSON.stringify(this.fileList))
  }

}