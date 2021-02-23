import { Component, ViewChild } from '@angular/core';
import { HttpService, ZCOptions } from 'shev-common'
import { STColumn, STData } from '@delon/abc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'common-tester';

  
  constructor(private http: HttpService) {
    if (!this.http.getConfig()) {
      this.http.setConfig({
        //全局配置
        clientId: 'test_key',
        clientSecret: 'test_secret',
        grant_type: 'authorization_code',
        // domainName: "api.jxgy.tunnel.eduapps.cn",
        // api: "http://api.jxgy.tunnel.eduapps.cn",
        // jumpUrl: "http://sh.eduapps.cn/jxgyportal/passport/login",
        domainName: 'api.jxgy.tunnel.eduapps.cn',
        api: 'http://api.jxgy.tunnel.eduapps.cn',
        jumpUrl: 'http://localhost:4200/passport/login',
        version: 'ETS-ZHSZ-Portal_V1.0.0(20200925.03)',
        organization: [],
        electivesList: [],
        parentTotalList: [],
        fileType: '.doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.txt',
        videoAccept: '.mp4',
        imgAccept: '.jpg,.png,.bmp,.gif,.webp',
        imgType: 'image/png,image/jpeg,image/gif,image/bmp',
      })
    }
  }


}




