import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpService } from '../../services/http.service';
import { throwError } from 'rxjs';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@Component({
  selector: 'shev-cover-upload',
  templateUrl: './cover-upload.component.html',
  styles: [
    `
      :host ::ng-deep .clearfix .ant-upload-list-item {
        width: 300px !important;
        height: 500px !important;
        overflow: hidden;
      }

      :host ::ng-deep .clearfix .ant-upload-select {
        width: 300px !important;
        height: 500px !important;
        overflow: hidden;
      }
    `,
  ],
})
export class CoverUploadComponent implements OnInit {
  @Output() outer = new EventEmitter();
  @Input() fileList: any;
  // fileList: UploadFile[] = [];
  previewVisible = false;
  previewImage: string | undefined = '';
  constructor(private request: HttpService) {}

  ngOnInit() {}

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };
  //上传文件改变时的状态
  handleChange(info: any) {
    this.fileList = info.fileList;
    this.outer.emit(this.fileList);
  }

  handleUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    this.fileList = this.fileList.slice(length - 1);
    this.outer.emit(this.fileList);
    return true;
  };
}
