import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shev-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  @Input() placeholder: string = "请输入关键字";
  @Output() private outer = new EventEmitter<string>();

  name: any;
  constructor() { }

  ngOnInit() {
  }

  search() {
    this.outer.emit(this.name)
  }

}
