import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CalenderModel } from './../models/calender';
import { QuarterlyModel } from '../models/quarterlyModel';

@Component({
  selector: 'app-halfyearly',
  templateUrl: './halfyearly.component.html',
  styleUrls: ['./halfyearly.component.css']
})
export class HalfyearlyComponent implements OnInit {
  selectedCheckBox = 0;
  firstCheckBox = true;
  secondCheckBox = true;
  selectOption: any[] = [
    { id: 1, name: 'First', value: '1', checked: false },
    { id: 2, name: 'Second', value: '2', checked: false }
  ];

  public janDate: Date;
  public febDate: Date;
  public marchDate: Date;
  public aprDate: Date;
  public mayDate: Date;
  public juneDate: Date;
  public julDate: Date;
  public augDate: Date;
  public sepDate: Date;
  public octDate: Date;
  public novDate: Date;
  public decDate: Date;

  public selectYear: any;
  public startYearHalf: string;
  public yearHalf: string;
  public mainErrorMsg = '';
  public dateValidationFlagHalf = false;
  quarterlyModelArray: QuarterlyModel = <QuarterlyModel>{};
  firstHalfyearly: Array<CalenderModel> = [];
  secondHalfyearly: Array<CalenderModel> = [];
  @Output() public dateChanged = new EventEmitter();
  @Input() public halfYearlyCalendarInput: any;
  public startAt = null;
  public min = null;
  public max = null;

  constructor(public datePipe: DatePipe) {
    this.quarterlyModelArray.quarterlyModel = [];
  }

  ngOnInit() {
    this.startAt = new Date();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.halfYearlyCalendarInput && changes.halfYearlyCalendarInput.currentValue) {
      console.log("halfyearly calendar days", JSON.stringify(changes.halfYearlyCalendarInput));
      this.setHalfYearlyCalendarDays(changes.halfYearlyCalendarInput.currentValue);
    }
  }
  setHalfYearlyCalendarDays(data: any): any {
    if (data.length > 0) {
      this.selectYear = data[0].start_date.split('-')[0];
      console.log("days length-->", JSON.stringify(data.length));

      for (var i = 0; i < data.length; i++) {
        console.log("days-->", JSON.stringify(data[i].start_date.split('-')[1]));

        if ((data[i].start_date.split('-')[1] == "01") || (data[i].start_date.split('-')[1] == "02")
          || (data[i].start_date.split('-')[1] == "03") || (data[i].start_date.split('-')[1] == "04")
          || (data[i].start_date.split('-')[1] == "05") || (data[i].start_date.split('-')[1] == "06")) {
          this.selectOption[0].checked = true;
          this.firstCheckBox = false;
          this.janDate = null;
          this.febDate = null;
          this.marchDate = null;
          this.aprDate = null;
          this.mayDate = null;
          this.juneDate = null;
          if (data[i].start_date.split('-')[1] == "01") {
            this.janDate = data[i].start_date;
          } else if (data[i].start_date.split('-')[1] == "02") {
            this.janDate = null;
            this.febDate = data[i].start_date;
          } else if (data[i].start_date.split('-')[1] == "03") {
            this.marchDate = data[i].start_date;
          } else if (data[i].start_date.split('-')[1] == "04") {
            this.aprDate = data[i].start_date;
          } else if (data[i].start_date.split('-')[1] == "05") {
            this.mayDate = data[i].start_date;
          } else if (data[i].start_date.split('-')[1] == "06") {
            this.juneDate = data[i].start_date;
          }

          this.firstHalfyearly = [];
          let calenderModel1 = new CalenderModel();
          let dateObj = this.datePipe.transform(data[i].start_date, 'yyyy-MM-dd');
          calenderModel1.start_date = dateObj;
          calenderModel1.end_date = dateObj;
          this.firstHalfyearly.push(calenderModel1);
          this.prepareQuaterlyObj(event);
        }

        if ((data[i].start_date.split('-')[1] == 7) || (data[i].start_date.split('-')[1] == 8)
          || (data[i].start_date.split('-')[1] == 9) || (data[i].start_date.split('-')[1] == 10)
          || (data[i].start_date.split('-')[1] == 11) || (data[i].start_date.split('-')[1] == 12)) {
          this.selectOption[1].checked = true;
          this.secondCheckBox = false;
          this.julDate = null;
          this.augDate = null;
          this.sepDate = null;
          this.octDate = null;
          this.novDate = null;
          this.decDate = null;

          if (data[i].start_date.split('-')[1] == "07") {
            this.julDate = data[i].start_date;
          } else if (data[i].start_date.split('-')[1] == "08") {
            this.augDate = data[i].start_date;
          } else if (data[i].start_date.split('-')[1] == "09") {
            this.sepDate = data[i].start_date;
          } else if (data[i].start_date.split('-')[1] == "10") {
            this.octDate = data[i].start_date;
          } else if (data[i].start_date.split('-')[1] == "11") {
            this.novDate = data[i].start_date;
          } else if (data[i].start_date.split('-')[1] == "12") {
            this.decDate = data[i].start_date;
          }

          this.secondHalfyearly = [];
          let calenderModel1 = new CalenderModel();
          let dateObj = this.datePipe.transform(data[i].start_date, 'yyyy-MM-dd');
          calenderModel1.start_date = dateObj;
          calenderModel1.end_date = dateObj;
          this.secondHalfyearly.push(calenderModel1);
          this.prepareQuaterlyObj(event);
        }
      }
    }
    this.prepareQuaterlyObj("");
  }

  checkBoxChangeEvent(event) {
    if (this.startYearHalf === undefined) {
      this.mainErrorMsg = 'Please select Year';
      this.dateValidationFlagHalf = true;
    } else {
      //
      this.dateValidationFlagHalf = false;
    }

    let val = event.target.value;
    let index = this.selectOption.findIndex((ds: any) => {
      return ds.id + '' === event.target.id;
    });
    this.selectedCheckBox = index;
    if (val === '1' && event.target.checked) {
      this.firstCheckBox = false;
      if (this.dateValidationFlagHalf) {
        event.target.checked = false;
        this.firstCheckBox = true;
      }

    } else if (val === '1' && !event.target.checked) {
      this.firstCheckBox = true;
      this.firstHalfyearly = [];
      this.janDate = null;
      this.febDate = null;
      this.marchDate = null;
      this.aprDate = null;
      this.mayDate = null;
      this.juneDate = null;
    }

    if (val === '2' && event.target.checked) {
      this.secondCheckBox = false;
      if (this.dateValidationFlagHalf) {
        event.target.checked = false;
        this.secondCheckBox = true;
      }

    } else if (val === '2' && !event.target.checked) {
      this.secondCheckBox = true;
      this.secondHalfyearly = [];
      this.julDate = null;
      this.augDate = null;
      this.sepDate = null;
      this.novDate = null;
      this.octDate = null;
      this.decDate = null;

    }
    this.prepareQuaterlyObj(event);
  }

  selectedOptions() {
    return this.selectOption
      .filter(opt => opt.checked)
      .map(opt => opt.value)
  }

  public getMonthFirstLastDay(year, month): any {
    let monthStartDay = new Date(year, month, 1);
    let monthEndDay = new Date(year, month + 1, 0);
    let min = this.datePipe.transform(monthStartDay, 'dd');
    let max = this.datePipe.transform(monthEndDay, 'dd');

    this.min = new Date(this.selectYear, month, Number.parseInt(min));
    this.max = new Date(this.selectYear, month, Number.parseInt(max));
  }

  getDateTimeEvent(val) {
    this.getMonthFirstLastDay(this.selectYear, val);
  }

  handleChange(event) {
    this.dateChanged.emit(this.quarterlyModelArray);
  }

  prepareQuaterlyObj(event) {
    this.quarterlyModelArray.quarterlyModel = [];
    if (this.firstHalfyearly.length > 0) {
      this.quarterlyModelArray.quarterlyModel.push(this.firstHalfyearly[0]);
    }
    if (this.secondHalfyearly.length > 0) {
      this.quarterlyModelArray.quarterlyModel.push(this.secondHalfyearly[0]);
    }
    this.handleChange(event);
  }


  handleSelectYearHalf(year: string) {
    this.yearHalf = year;
    this.selectYear = year;
    this.startYearHalf = year;
    this.dateValidationFlagHalf = false;
    if (this.yearHalf === "0") {
      for (var i = 0; i < this.selectOption.length; i++) {
        this.selectOption[i].checked = false;
      }
      this.firstCheckBox = true;
      this.secondCheckBox = true;
    }
  }



  clickMonthEvent(event, val) {
    if (val === 0) {
      this.getDateTimeEvent(val);
      this.febDate = null;
      this.marchDate = null;
      this.aprDate = null;
      this.mayDate = null;
      this.juneDate = null;

      this.firstHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.janDate, 'yyyy-MMM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj(event);

    } else if (val === 1) {
      this.getDateTimeEvent(val);
      this.janDate = null;
      this.marchDate = null;
      this.aprDate = null;
      this.mayDate = null;
      this.juneDate = null;

      this.firstHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.febDate, 'yyyy-MMM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj(event);

    } else if (val === 2) {
      this.getDateTimeEvent(val);
      this.janDate = null;
      this.febDate = null;
      this.aprDate = null;
      this.mayDate = null;
      this.juneDate = null;

      this.firstHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.marchDate, 'yyyy-MMM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj(event);

    } else if (val === 3) {
      this.getDateTimeEvent(val);
      this.janDate = null;
      this.febDate = null;
      this.marchDate = null;
      this.mayDate = null;
      this.juneDate = null;

      this.firstHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.aprDate, 'yyyy-MMM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj(event);

    } else if (val === 4) {
      this.getDateTimeEvent(val);
      this.janDate = null;
      this.febDate = null;
      this.marchDate = null;
      this.aprDate = null;
      this.juneDate = null;

      this.firstHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.mayDate, 'yyyy-MMM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj(event);

    } else if (val === 5) {
      this.getDateTimeEvent(val);
      this.janDate = null;
      this.febDate = null;
      this.marchDate = null;
      this.aprDate = null;
      this.mayDate = null;

      this.firstHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.juneDate, 'yyyy-MMM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj(event);

    } else if (val === 6) {
      this.getDateTimeEvent(val);
      this.augDate = null;
      this.sepDate = null;
      this.octDate = null;
      this.novDate = null;
      this.decDate = null;

      this.secondHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.julDate, 'yyyy-MMM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.secondHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj(event);

    } else if (val === 7) {
      this.getDateTimeEvent(val);
      this.julDate = null;
      this.sepDate = null;
      this.novDate = null;
      this.octDate = null;
      this.decDate = null;

      this.secondHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.augDate, 'yyyy-MMM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.secondHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj(event);

    } else if (val === 8) {
      this.getDateTimeEvent(val);
      this.julDate = null;
      this.augDate = null;
      this.novDate = null;
      this.octDate = null;
      this.decDate = null;

      this.secondHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.sepDate, 'yyyy-MMM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.secondHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj(event);

    } else if (val === 9) {
      this.getDateTimeEvent(val);
      this.julDate = null;
      this.augDate = null;
      this.sepDate = null;
      this.novDate = null;
      this.decDate = null;

      this.secondHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.octDate, 'yyyy-MMM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.secondHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj(event);

    } else if (val === 10) {
      this.getDateTimeEvent(val);
      this.julDate = null;
      this.augDate = null;
      this.sepDate = null;
      this.octDate = null;
      this.decDate = null;

      this.secondHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.novDate, 'yyyy-MMM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.secondHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj(event);

    } else if (val === 11) {
      this.getDateTimeEvent(val);
      this.julDate = null;
      this.augDate = null;
      this.sepDate = null;
      this.novDate = null;
      this.octDate = null;

      this.secondHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.decDate, 'yyyy-MMM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.secondHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj(event);

    }
  }
}
