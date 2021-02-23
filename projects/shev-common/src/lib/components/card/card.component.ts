import { Component, OnInit, Input, SimpleChanges,EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ZCOptions } from './card.interface';

@Component({
  selector: 'shev-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {

  @Input() options: ZCOptions;
  @Input() loading: boolean = false;
  @Output() private onSelectChange = new EventEmitter<string>();
  
  public _selectedIndex = 0;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  _getExtraLink(link: string) {
    if (link == 'back') {
      history.go(-1)
    } else {
      this.router.navigateByUrl(link)
    }
  }


  _selectChange(args: any[]): void {
    this._selectedIndex = args[0].index;
    this.onSelectChange.emit(args[0].index)
  }
}
