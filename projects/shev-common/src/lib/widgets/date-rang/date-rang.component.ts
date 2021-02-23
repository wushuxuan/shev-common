import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlWidget, SFValue } from '@delon/form';
import { toBool } from '../../utils/util';
import { format } from 'date-fns';

@Component({
  selector: 'app-date-rang',
  templateUrl: './date-rang.component.html',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
})
export class DateRangWidget extends ControlWidget implements OnInit {
  mode: string;
  term: boolean = false;
  startTermDate: any = new Date().getTime();
  endTermDate: any = new Date().getTime();
  holidayList: any = [];
  displayValue: Date | Date[] | null = null;
  startValue: Date | null = null;
  endValue: Date | null = null;
  displayFormat: string;
  format: string;
  i: any;
  flatRange = false;
  endOpen = false;

  ngOnInit(): void {
    const ui = this.ui;
    this.mode = ui.mode || 'date';
    this.term = ui.term;
    this.startTermDate = ui.startTermDate;
    this.endTermDate = ui.endTermDate;
    this.holidayList = ui.holidayList;
    this.flatRange = ui.end != null;
    if (this.flatRange) {
      this.mode = 'range';
    }
    if (!ui.displayFormat) {
      switch (this.mode) {
        case 'year':
          this.displayFormat = `yyyy`;
          break;
        case 'month':
          this.displayFormat = `yyyy-MM`;
          break;
        case 'week':
          this.displayFormat = `yyyy-ww`;
          break;
      }
    } else {
      this.displayFormat = ui.displayFormat;
    }
    // 构建属性对象时会对默认值进行校验，因此可以直接使用 format 作为格式化属性
    this.format = ui.format;
    // 公共API
    this.i = {
      allowClear: toBool(ui.allowClear, true),
      // nz-date-picker
      showToday: toBool(ui.showToday, true),
    };
  }

  private compCd() {
    var list: any = this.displayValue;
    if (list && list.length == 2) {
      var start: any = new Date(list[0]).getTime();
      this.startValue = start;
      var end: any = new Date(list[1]).getTime();
      this.endValue = end;
    }
    // TODO: removed after nz-datepick support OnPush mode
    setTimeout(() => this.detectChanges());
  }

  reset(value: SFValue) {
    value = this.toDate(value);
    if (this.flatRange) {
      this.displayValue = value == null ? [] : [value, this.toDate(this.endProperty.formData)];
    } else {
      this.displayValue = value;
    }
    this.compCd();
  }

  onStartChange(value: Date | null): void {
    this.startValue = value;
    if (this.displayFormat == 'YYYY-MM-DD HH:mm:ss' || this.displayFormat == 'YYYY-MM-DD HH:mm') {
      this.setValue([this.startValue, this.endValue]);
    } else {
      this.setValue([new Date(format(this.startValue, "YYYY-MM-DD") + " 00:00:00"), new Date(format(this.endValue, "YYYY-MM-DD") + " 23:59:59"),]);
    }
  }

  onEndChange(value: Date | null): void {
    this.endValue = value;
    if (this.displayFormat == 'YYYY-MM-DD HH:mm:ss' || this.displayFormat == 'YYYY-MM-DD HH:mm') {
      this.setValue([this.startValue, this.endValue]);
    } else {
      this.setValue([new Date(format(this.startValue, "YYYY-MM-DD") + " 00:00:00"), new Date(format(this.endValue, "YYYY-MM-DD") + " 23:59:59"),]);
    }
  }

  _change(value: Date | Date[] | null) {
    if (value == null) {
      this.setValue(null);
      this.setEnd(null);
      return;
    }

    const res = Array.isArray(value) ? value.map(d => format(d, this.format)) : format(value, this.format);
    if (this.flatRange) {
      this.setEnd(res[1]);
      this.setValue(res[0]);
    } else {
      this.setValue(res);
    }
  }

  _openChange(status: boolean) {
    if (this.ui.onOpenChange) this.ui.onOpenChange(status);
  }

  _ok(value: any) {
    if (this.ui.onOk) this.ui.onOk(value);
  }

  private get endProperty() {
    return this.formProperty.parent!.properties![this.ui.end];
  }

  private setEnd(value: string | null) {
    if (this.flatRange) {
      this.endProperty.setValue(value, true);
    }
  }

  private toDate(value: SFValue) {
    if (typeof value === 'number' || (typeof value === 'string' && !isNaN(+value))) {
      value = new Date(+value);
    }
    return value;
  }



  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }
  }

  handleEndOpenChange(open: boolean): void {
    this.endOpen = open;
  }


  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      if (this.term) {
        return new Date(format(startValue.getTime(), 'YYYY-MM-DD 00:00:00')).getTime() > this.endTermDate || new Date(format(startValue.getTime(), 'YYYY-MM-DD 00:00:00')).getTime() < this.startTermDate || this.holidayList.indexOf(new Date(format(startValue.getTime(), 'YYYY-MM-DD 00:00:00')).getTime()) > -1;
      } else {
        return false;
      }
    }
    if (this.displayFormat == 'YYYY-MM-DD HH:mm:ss' || this.displayFormat == 'YYYY-MM-DD HH:mm') {
      if (this.term) {
        return startValue.getTime() > this.endTermDate || startValue.getTime() < this.startTermDate || this.holidayList.indexOf(new Date(format(startValue.getTime(), 'YYYY-MM-DD 00:00:00')).getTime()) > -1;
      } else {
        return startValue.getTime() >= new Date(this.endValue).getTime();
      }
    } else {
      if (this.term) {
        return startValue.getTime() > this.endTermDate || startValue.getTime() < this.startTermDate || this.holidayList.indexOf(new Date(format(startValue.getTime(), 'YYYY-MM-DD 00:00:00')).getTime()) > -1;
      } else {
        return startValue.getTime() > new Date(this.endValue).getTime();
      }
    }
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      if (this.term) {
        return endValue.getTime() > this.endTermDate || endValue.getTime() < this.startTermDate || this.holidayList.indexOf(new Date(format(endValue.getTime(), 'YYYY-MM-DD 00:00:00')).getTime()) > -1;
      } else {
        return false;
      }
    }
    if (this.displayFormat == 'YYYY-MM-DD HH:mm:ss' || this.displayFormat == 'YYYY-MM-DD HH:mm') {
      if (this.term) {
        return endValue.getTime() > this.endTermDate || endValue.getTime() < this.startTermDate || this.holidayList.indexOf(new Date(format(endValue.getTime(), 'YYYY-MM-DD 00:00:00')).getTime()) > -1;
      } else {
        return endValue.getTime() < new Date(format(this.startValue, 'YYYY-MM-DD 00:00:00')).getTime();
      }
    } else {
      if (this.term) {
        return endValue.getTime() > this.endTermDate || endValue.getTime() < this.startTermDate || this.holidayList.indexOf(new Date(format(endValue.getTime(), 'YYYY-MM-DD 00:00:00')).getTime()) > -1;
      } else {
        return endValue.getTime() < new Date(format(this.startValue, 'YYYY-MM-DD 00:00:00')).getTime();
      }
    }
  };

}
