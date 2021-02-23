import { Component, OnInit, Input, TemplateRef, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'shev-ngx-dnd-content',
  templateUrl: './ngx-dnd-content.component.html',
  styles: []
})
export class NgxDndContentComponent implements OnInit {
  @ViewChild('box', { static: true }) box: ElementRef;
  @Input() data: any;
  @Input() block: boolean = false;
  @Input() renderItem: TemplateRef<void>;
  @Output() private outer = new EventEmitter<string>();

  public options: any;
  index:any;

  constructor() {
    this.options = {
      onUpdate: (event: any) => {
        this.outer.emit(this.data);
      }
    };
  }

  ngOnInit() {

  }

}
