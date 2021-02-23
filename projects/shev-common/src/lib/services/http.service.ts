import { Injectable } from '@angular/core';
import axios from 'axios'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpConfig:any;
  constructor() {

  }

  setConfig(config){
    this.httpConfig = config
  }

  getConfig(){
    return this.httpConfig ;
  }

  //上传文件
  uploadFile(list) {
    var promiseAll = list.map(function(data) {
      var params = new FormData();
      if (data.originFileObj) {
        params.append('file', data.originFileObj);
      } else {
        params.append('file', data);
      }
      return axios({
        url: '/storage/cloudservice/content/file/upload?responseType=json',
        method: 'post',
        data: params,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        withCredentials: true,
      });
    });
    return promiseAll;
  }

}
