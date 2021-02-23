import { Component, OnInit } from '@angular/core';
import { ZCOptions } from 'shev-common'

@Component({
  selector: 'app-search-test',
  templateUrl: './search-test.component.html',
  styleUrls: ['./search-test.component.less']
})
export class SearchTestComponent implements OnInit {
  options: ZCOptions = {
    // bordered: true,
    title: '卡片名称',
  }


  teacherData: any = [
    {
      checked: false,
      name: "4.1班主任",
      url: "http://api.jxgy.tunnel.eduapps.cn/manager/account/avatar/show/764249898488012800?1603790250227",
      userId: "764249898488012800",
    },
    {
      checked: false,
      name: "schooladmi",
      url: "http://api.jxgy.tunnel.eduapps.cn/manager/account/avatar/show/egxwshd1b5vgz1kmzd3z?1603790250227",
      userId: "egxwshd1b5vgz1kmzd3z"
    }
  ]
  checkData: any = []
  avatarDataChange(list) {
    var array: any = [];
    JSON.parse(list).forEach(element => {
      if (element.checked) {
        array.push(element);
      }
    });
    this.checkData = array;
  }

  search(event: any): void {
    console.log(event)
    var val = event ? event.replace(/\s+/g, "") : null
    console.log("val:" + val)
    console.log(this.teacherData)
    if (val) {
      this.teacherData.forEach(element => {
        if (!new RegExp(val, 'i').test(element.name)) {
          element.isHidden = true
        } else {
          element.isHidden = false
        }
      });
    } else {
      this.teacherData.forEach(element => {
        element.isHidden = false
      });
    }
  }



  constructor() { }

  ngOnInit(): void {
  }

}
