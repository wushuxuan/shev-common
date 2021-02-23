import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { getData, toBool, dataURLtoFile } from '../../utils/util';
import { deepGet } from '@delon/util';
import { of } from 'rxjs';
import * as Cropper from 'cropperjs/dist/cropper.js';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { ControlWidget, SFValue } from '@delon/form';
import * as _ from 'lodash'

@Component({
  selector: 'app-sfuploads',
  templateUrl: './sfuploads.component.html',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
})
export class SfuploadsWidget extends ControlWidget implements OnInit {
  croppers: Cropper;
  cropperUrl: any;
  cropperType: any = 'square';
  cropperVisible: boolean = false;
  cropperIndex: any;
  imgUrl: any;
  image: any;
  args: NzUploadChangeParam;
  update: boolean = true;

  i: any;
  fileList: NzUploadFile[] = [];
  btnType = '';
  _ratio: any = '3'

  ngOnInit(): void {
    const {
      type,
      text,
      action,
      accept,
      limit,
      filter,
      fileSize,
      fileType,
      listType,
      limitLength,
      multiple,
      name,
      showUploadList,
      withCredentials,
      resReName,
      urlReName,
      beforeUpload,
      customRequest,
      directory,
      openFileDialogOnClick,
      cropper,
    } = this.ui;
    this.i = {
      cropper: cropper || false,
      type: type || 'select',
      text: text || '点击上传',
      action: action || '',
      accept: accept || '',
      directory: toBool(directory, false),
      openFileDialogOnClick: toBool(openFileDialogOnClick, true),
      limit: limit == null ? 0 : +limit,
      filter: filter == null ? [] : filter,
      size: fileSize == null ? 0 : +fileSize,
      fileType: fileType || '',
      listType: listType || 'picture-card',
      limitLength: limitLength || 9999,
      multiple: toBool(multiple, false),
      name: name || 'file',
      showUploadList: toBool(showUploadList, true),
      withCredentials: toBool(withCredentials, false),
      resReName: (resReName || '').split('.'),
      urlReName: (urlReName || '').split('.'),
      beforeUpload: typeof beforeUpload === 'function' ? beforeUpload : null,
      customRequest: typeof customRequest === 'function' ? customRequest : null,
    };
    if (this.i.listType === 'picture-card') {
      this.btnType = 'plus';
    }
    if (this.i.type === 'drag') {
      this.i.listType = null;
      this.btnType = 'drag';
      this.i.text = this.ui.text || `单击或拖动文件到该区域上传`;
      this.i.hint = this.ui.hint || `支持单个或批量，严禁上传公司数据或其他安全文件`;
    }
  }

  change(args: NzUploadChangeParam) {
    this.args = args
    if (!this.disabled) {
      if (this.ui.change) this.ui.change(args);
      args.fileList.forEach((element:any) => {
        element.status = 'success'
      });
      this._setValue(args.fileList);
    }
  }

  reset(_value: SFValue) {
    const { fileList } = this.ui;
    (fileList ? of(fileList) : getData(this.schema, this.ui, this.formProperty.formData)).subscribe(list => {
      list = this.formProperty.value;
      this.fileList = list as NzUploadFile[];
      this.detectChanges();
    });
  }

  private _getValue(file: NzUploadFile) {
    return deepGet(file.response, this.i.resReName, file.response);
  }

  private _setValue(fileList: NzUploadFile[]) {
    fileList
      .filter(file => !file.url)
      .forEach(file => {
        file.url = deepGet(file.response, this.i.urlReName);
      });
    this.setValue(fileList);
  }


  //移除
  handleRemove = () => {
    if (!this.disabled) {
      this._setValue(this.fileList);
      return true;
    }
  };

  //预览
  handlePreview = (file: NzUploadFile) => {
    if (this.ui.preview) {
      this.ui.preview(file);
      return;
    }
    const _url = file.thumbUrl || file.url;
    if (!_url) {
      return;
    }
    if (file.type && (file.type == 'image' || file.type.split('/')[0] == 'image')) {
      if (this.i.cropper) {
        // this.CropperImg();
        this.cropperVisible = true;
        this.imgUrl = _url;
        this.cropperIndex = _.indexOf(this.fileList, file)
      } else {
        this.injector.get<NzModalService>(NzModalService).create({
          nzContent: `<img src="${_url}" class="img-fluid" />`,
          nzFooter: null,
        });
      }
    } else if (file.type && (file.type == 'video' || file.type.split('/')[0] == 'video')) {
      this.injector.get<NzModalService>(NzModalService).create({
        nzContent: `<video src="${file.videoUrl}" controls="controls" class="img-fluid" >您的浏览器不支持视频播放</video>`,
        nzFooter: null,
      });
    } else {
      // this.injector.get<NzModalService>(NzModalService).create({
      //   nzContent: `<p class="text-center" >暂时无法查看实时文件</p>`,
      //   nzFooter: null,
      // });
      window.open(file.url)
    }
  };


  CropperImg() {
    this.cropperUrl = this.fileList[this.cropperIndex].thumbUrl ? this.fileList[this.cropperIndex].thumbUrl : this.fileList[this.cropperIndex].url;
    setTimeout(() => {
      this.image = document.getElementById('image');
      this.croppers = new Cropper(this.image, {
        aspectRatio: 16 / 9,
        dragMode: 'move',
        crop(event) {
        },
      });
    }, 500)
  }

  changeCircleCropper() {
    this.cropperType = 'circle';
    this.croppers.setAspectRatio(1)
  }

  changeSquareCropper() {
    this.cropperType = 'square';
    this.croppers.setAspectRatio(16 / 9)
  }

  changeCropperRatio() {
    this.cropperType = 'square';
    this.croppers.setAspectRatio(this._ratio == '1' ? 1 / 1 : (this._ratio == '2' ? 4 / 3 : 16 / 9))
  }

  handleCancel() {
    this.cropperVisible = false;
    this.cropperUrl = null;
    // this.cropperType = 'square';
    // this.croppers.setAspectRatio(16 / 9)
  }

  handleOk() {
    if (this.cropperUrl) {
      this.update = false;
      const dataURL = this.image.cropper['getCroppedCanvas']('', { width: 200, height: 200 });
      this.cropperVisible = false;
      this.cropperUrl = null;
      this.fileList[this.cropperIndex].originFileObj = dataURLtoFile(dataURL.toDataURL('image/png'), this.fileList[this.cropperIndex].name == "xxx.png" ? 'cropper.png' : this.fileList[this.cropperIndex].name);
      this.fileList[this.cropperIndex].thumbUrl = dataURL.toDataURL('image/png');
      this.fileList[this.cropperIndex].url = dataURL.toDataURL('image/png');
      this.fileList[this.cropperIndex].name = this.fileList[this.cropperIndex].name == "xxx.png" ? 'cropper.png' : this.fileList[this.cropperIndex].name
      this.detectChanges();
      setTimeout(() => {
        this.update = true;
        const file: any = { file: this.fileList[this.cropperIndex], fileList: this.fileList }
        this.args = file;
        this.change(this.args)
      }, 500)
    } else {
      this.handleCancel()
    }
  }
}
