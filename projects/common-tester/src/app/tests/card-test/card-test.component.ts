import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { HttpService, ZCOptions } from 'shev-common'

@Component({
  selector: 'app-card-test',
  templateUrl: './card-test.component.html',
  styleUrls: ['./card-test.component.less']
})
export class CardTestComponent implements OnInit {

   loading: boolean = false;
  options: ZCOptions = {
    bordered: true,
    title:'卡片名称',
    extra:{
      buttons:[
        {text:'新增',type:'primary',click:()=>this.delete('新增')},
        {text:'链接',type:'default',link:'upload'},
        {text:'返回',type:'default',link:'back'},
        {text:'导入文件',type:'upload',click:(event)=>{
          console.log(event)
        }},
        {text:'删除',danger:true,link:'drop',click:()=>this.delete('删除')},
        {text:'删除',danger:true,diabled:true,link:'drop',},
      ],
      type:'button'
    }
  }
  delete(type){
    console.log("type:"+type)
  }

  constructor() { }
  
  @ViewChild('content1', { static: true, read: TemplateRef }) content1: TemplateRef<any>
  @ViewChild('content2', { static: true, read: TemplateRef }) content2: TemplateRef<any>
  @ViewChild('content3', { static: true, read: TemplateRef }) content3: TemplateRef<any>
  @ViewChild('shevCard', { static: true }) shevCard;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.options.tabs = {
      size: 'large',
      values: [
        { title: 'tab1', component: this.content1 },
        { title: 'tab2', component: this.content2 },
        { title: 'tab3', component: this.content3 },
      ]
    }
    setTimeout(() => {
      console.log('shevCard:')
      console.log(this.shevCard)
      console.log(this.shevCard._selectedIndex)
    }, 2000)
  }


  onSelectChange(index){
    console.log("index:")
    console.log(index)
  }
}
