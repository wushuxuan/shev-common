import { Component, OnInit, Input, ElementRef, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { RequestService } from './../../services/request.service'
import { HttpService } from './../../services/http.service'
import { STColumn, STData, STChange, STPage, STReqReNameType } from '@delon/abc';

const setTop = 'assets/icon/setTop.png'

@Component({
  selector: 'shev-table',
  templateUrl: './table.component.html',
  styles: []
})

export class TableComponent implements OnInit {

  setTop: any = setTop;

  @Input() showChild: ElementRef;
  @Input() checkChild: ElementRef;
  @Input() url: string;
  @Input() countUrl: string;
  @Input() params: any;
  @Input() countParams: FormData;
  @Input() columns: any;
  @Input() ListChange: any;
  @Input() type: string = 'get';
  @Input() data: any = [];
  //是否需要自己判断
  @Input() judge: boolean = false;

  @Output() private outer = new EventEmitter<string>();

  // "api/gensci/bonus/getWebApiData";
  loading: boolean = true;
  rows: any = 10;
  offset: any = 1;
  total: any = 0;
  reName: STReqReNameType = { pi: 'offset', ps: 'rows', };
  pageConfig: STPage = {
    //分页器中每页显示条目数下拉框值
    pageSizes: [10, 30, 50, 100],
    //是否显示分页器中改变页数
    showSize: true,
    //是否显示总数据量
    total: true,
    front: false,
    //是否显示分页器中快速跳转
    showQuickJumper: true,
  };


  checkBoxList: any = [];
  // mock

  constructor(
    private requestService: RequestService,
    private http:HttpService,
  ) {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getData();
  }



  getCountData() {
    this.loading = true;
    this.requestService.request(this.countUrl, this.countParams, this.type, {
      clientId: this.http.getConfig().clientId,
      clientSecret: this.http.getConfig().clientSecret
    }, false).then((res: any) => {
      this.loading = false;
      this.total = res.data.data;
      this.getData();
    }).catch(() => { this.loading = false; })
  }



  getData() {
    if (this.countUrl) {
      this.loading = true;
      this.requestService.request(this.countUrl, this.countParams, this.type, {
        clientId: this.http.getConfig().clientId,
        clientSecret: this.http.getConfig().clientSecret
      }, false).then((res: any) => {
        this.loading = false;
        this.total = res.data.data;
        this.outer.emit(
          JSON.stringify(
            {
              value: [],
              type: 'checkbox',
            }
          )
        )
        if (this.countUrl) {
          if (res.data.data > (this.offset - 1) * this.rows) {
            this.params.offset = (this.offset - 1) * this.rows;
            this.params.rows = this.rows;
          } else {
            this.offset = 1
            this.params.offset = 0;
            this.params.rows = this.rows;
          }
        } else {
          this.params.offset = 0;
          this.params.rows = 9999;
          this.pageConfig.front = true;
        }
        this.requestService.request(this.url, this.params, this.type, {
          clientId: this.http.getConfig().clientId,
          clientSecret: this.http.getConfig().clientSecret
        }, false).then((res: any) => {
          this.loading = false;
          if (res.status == 200) {
            if (!this.countUrl) {
              this.total = res.data.data.length;
            }
            this.data = res.data.data;
            this.outer.emit(
              JSON.stringify(
                {
                  value: res.data.data,
                  type: 'dataChange',
                }
              ))
            this.checkBoxList = [];
          }
        }).catch(() => { this.loading = false; })
      }).catch(() => { this.loading = false; })
    } else {
      this.outer.emit(
        JSON.stringify(
          {
            value: [],
            type: 'checkbox',
          }
        )
      )
      if (this.countUrl) {
        this.params.offset = (this.offset - 1) * this.rows;
        this.params.rows = this.rows;
      } else {
        this.params.offset = 0;
        this.params.rows = 9999;
        this.pageConfig.front = true;
      }
      this.requestService.request(this.url, this.params, this.type, {
        clientId: this.http.getConfig().clientId,
        clientSecret: this.http.getConfig().clientSecret
      }, false).then((res: any) => {
        this.loading = false;
        if (res.status == 200) {
          if (!this.countUrl) {
            this.total = res.data.data.length;
          }
          this.data = res.data.data;
          this.outer.emit(
            JSON.stringify(
              {
                value: res.data.data,
                type: 'dataChange',
              }
            ))
          this.checkBoxList = [];
        }
      }).catch(() => { this.loading = false; })
    }
  }

  change(e: STChange) {
    if (e.type == 'checkbox') {
      this.checkBoxList = e.checkbox;
      this.outer.emit(
        JSON.stringify(
          {
            value: e.checkbox,
            type: 'checkbox',
          }
        )
      )
    }

    if (e.type == "click") {
      this.outer.emit(
        JSON.stringify(
          {
            value: e.click.item,
            type: 'click',
          }
        )
      )
    }

    if (e.type == 'pi') {
      this.offset = e.pi;
      this.rows = e.ps;
      this.getData();
    }

    if (e.type == 'ps') {
      this.offset = 1;
      this.rows = e.ps;
      this.getData();
    }
  }

  resetOffset() {
    this.offset = 1;
  }

  setData(list) {
    this.data = list
  }


}
