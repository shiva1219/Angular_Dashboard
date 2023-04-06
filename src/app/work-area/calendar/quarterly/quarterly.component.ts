import { ValidationModel } from './validationModel';
import { Utils } from './../custom/Utils';
import { QuarterlyModel } from '../models/quarterlyModel';
import { CalenderModel } from './../models/calender';
import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-quarterly',
  templateUrl: './quarterly.component.html',
  styleUrls: ['./quarterly.component.css']
})
export class QuarterlyComponent implements OnInit {
  selectedCheckBox = 0;
  firstCheckBox = true;
  secondCheckBox = true;
  thirdCheckBox = true;
  fourCheckBox = true;
  quarterlyModelArray: QuarterlyModel = <QuarterlyModel>{};


  @Output() public dateChanged = new EventEmitter();
  @Input() public quarterlyCalendarInput: any;
  selectOption: any[] = [
    { id: 1, name: 'First', value: '1', checked: false },
    { id: 2, name: 'Second', value: '2', checked: false },
    { id: 3, name: 'Third', value: '3', checked: false },
    { id: 4, name: 'Fourth', value: '4', checked: false }
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
  public startYear: string;
  public year: string;
  public mainErrorMsg = '';
  public dateValidationFlag = false;

  firstQuart: Array<CalenderModel> = [];
  secondQuart: Array<CalenderModel> = [];
  thirdQuart: Array<CalenderModel> = [];
  fourthQuart: Array<CalenderModel> = [];

  validationModel: ValidationModel = new ValidationModel();

  utilsObj: Utils = new Utils(this.datePipe);
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
    if (changes.quarterlyCalendarInput && changes.quarterlyCalendarInput.currentValue) {
      console.log("quaterly calendar days", JSON.stringify(changes.quarterlyCalendarInput));
      this.setQuaterlyCalendarDays(changes.quarterlyCalendarInput.currentValue);
    }
  }
  setQuaterlyCalendarDays(data: any): any {
    if (data.length > 0) {
      this.selectYear = data[0].start_date.split('-')[0];
      this.startYear = this.selectYear;
      this.year = this.selectYear;
      this.dateValidationFlag = false;

      for (var i = 0; i < data.length; i++) {
        console.log("days-->", JSON.stringify(data[i].start_date.split('-')[1]));
        if ((data[i].start_date.split('-')[1] == "01") || (data[i].start_date.split('-')[1] == "02")
          || (data[i].start_date.split('-')[1] == "03")) {
          this.firstCheckBox = false;
          this.selectOption[0].checked = true;
          this.janDate = null;
          this.febDate = null;
          this.marchDate = null;
          if ((data[i].start_date.split('-')[1] == "01")) {
            this.janDate = data[i].start_date;
          } else if ((data[i].start_date.split('-')[1] == "02")) {
            this.febDate = data[i].start_date;
          } else if ((data[i].start_date.split('-')[1] == "03")) {
            this.marchDate = data[i].start_date;
          }

          this.firstQuart = [];
          let calenderModel1 = new CalenderModel();
          let dateObj = this.datePipe.transform(data[i].start_date, 'yyyy-MM-dd');
          calenderModel1.start_date = dateObj;
          calenderModel1.end_date = dateObj;
          this.firstQuart.push(calenderModel1);
          this.prepareQuaterlyObj(event);

        }
        if ((data[i].start_date.split('-')[1] == "04") || (data[i].start_date.split('-')[1] == "05")
          || (data[i].start_date.split('-')[1] == "06")) {
          this.secondCheckBox = false;
          this.selectOption[1].checked = true;
          this.aprDate = null;
          this.mayDate = null;
          this.juneDate = null;
          if ((data[i].start_date.split('-')[1] == "04")) {
            this.aprDate = data[i].start_date;
          } else if ((data[i].start_date.split('-')[1] == "05")) {
            this.mayDate = data[i].start_date;
          } else if ((data[i].start_date.split('-')[1] == "06")) {
            this.juneDate = data[i].start_date;
          }
          this.secondQuart = [];
          let calenderModel1 = new CalenderModel();
          let dateObj = this.datePipe.transform(data[i].start_date, 'yyyy-MM-dd');
          calenderModel1.start_date = dateObj;
          calenderModel1.end_date = dateObj;
          this.secondQuart.push(calenderModel1);
          this.prepareQuaterlyObj(event);
        }
        if ((data[i].start_date.split('-')[1] == "07") || (data[i].start_date.split('-')[1] == "08")
          || (data[i].start_date.split('-')[1] == "09")) {
          this.thirdCheckBox = false;
          this.selectOption[2].checked = true;
          this.julDate = null;
          this.augDate = null;
          this.sepDate = null;
          if ((data[i].start_date.split('-')[1] == "07")) {
            this.julDate = data[i].start_date;
          } else if ((data[i].start_date.split('-')[1] == "08")) {
            this.augDate = data[i].start_date;
          } else if ((data[i].start_date.split('-')[1] == "09")) {
            this.sepDate = data[i].start_date;
          }
          this.thirdQuart = [];
          let calenderModel1 = new CalenderModel();
          let dateObj = this.datePipe.transform(data[i].start_date, 'yyyy-MM-dd');
          calenderModel1.start_date = dateObj;
          calenderModel1.end_date = dateObj;
          this.thirdQuart.push(calenderModel1);
          this.prepareQuaterlyObj(event);
        }
        if ((data[i].start_date.split('-')[1] == "10") || (data[i].start_date.split('-')[1] == "11")
          || (data[i].start_date.split('-')[1] == "12")) {
          this.fourCheckBox = false;
          this.selectOption[3].checked = true;
          this.octDate = null;
          this.novDate = null;
          this.decDate = null;
          if ((data[i].start_date.split('-')[1] == "10")) {
            this.octDate = data[i].start_date;
          } else if ((data[i].start_date.split('-')[1] == "11")) {
            this.novDate = data[i].start_date;
          } else if ((data[i].start_date.split('-')[1] == "12")) {
            this.decDate = data[i].start_date;
          }
          this.fourthQuart = [];
          let calenderModel1 = new CalenderModel();
          let dateObj = this.datePipe.transform(data[i].start_date, 'yyyy-MM-dd');
          calenderModel1.start_date = dateObj;
          calenderModel1.end_date = dateObj;
          this.fourthQuart.push(calenderModel1);
          this.prepareQuaterlyObj(event);
        }
      }
    }
    this.prepareQuaterlyObj("");
  }

  handleSelectYear(year: string) {
    this.year = year;
    this.startYear = year;
    this.selectYear = year;
    this.dateValidationFlag = false;
    if (this.year === "0") {
      for (var i = 0; i < this.selectOption.length; i++) {
        this.selectOption[i].checked = false;
      }
      this.firstCheckBox = true;
      this.secondCheckBox = true;
      this.thirdCheckBox = true;
      this.fourCheckBox = true;
    }
  }

  checkBoxChangeEvent(event) {

    if (this.startYear === undefined) {
      this.mainErrorMsg = 'Please select Year';
      this.dateValidationFlag = true;
    } else {
      this.dateValidationFlag = false;
    }

    let val = event.target.value;
    let index = this.selectOption.findIndex((ds: any) => {
      return ds.id + '' === event.target.id;
    });
    this.selectedCheckBox = index;
    if (val === '1' && event.target.checked) {
      this.firstCheckBox = false;
      if (this.dateValidationFlag) {
        event.target.checked = false;
        this.firstCheckBox = true;
      }
    } else if (val === '1' && !event.target.checked) {
      this.firstCheckBox = true;
      this.janDate = null;
      this.febDate = null;
      this.marchDate = null;
      this.firstQuart = [];
    }

    if (val === '2' && event.target.checked) {
      this.secondCheckBox = false;
      if (this.dateValidationFlag) {
        event.target.checked = false;
        this.secondCheckBox = true;
      }
    } else if (val === '2' && !event.target.checked) {
      this.secondCheckBox = true;
      this.aprDate = null;
      this.mayDate = null;
      this.juneDate = null;
      this.secondQuart = [];
    }

    if (val === '3' && event.target.checked) {
      this.thirdCheckBox = false;
      if (this.dateValidationFlag) {
        event.target.checked = false;
        this.thirdCheckBox = true;
      }
    } else if (val === '3' && !event.target.checked) {
      this.thirdCheckBox = true;
      this.julDate = null;
      this.augDate = null;
      this.sepDate = null;
      this.thirdQuart = [];
    }

    if (val === '4' && event.target.checked) {
      this.fourCheckBox = false;
      if (this.dateValidationFlag) {
        event.target.checked = false;
        this.fourCheckBox = true;
      }
    } else if (val === '4' && !event.target.checked) {
      this.fourCheckBox = true;
      this.octDate = null;
      this.novDate = null;
      this.decDate = null;
      this.fourthQuart = [];
    }
    //this.prepareQuaterlyObj(event);
  }
  selectedOptions() {
    return this.selectOption
      .filter(opt => opt.checked)
      .map(opt => opt.value)
  }

  public getMonthFirstLastDay(year, month): any {
    let monthStartDay = new Date(year, month, 1);
    let monthEndDay = new Date(year, month + 1, 0);
    let min = this.utilsObj.formatDate(monthStartDay, 'dd');
    let max = this.utilsObj.formatDate(monthEndDay, 'dd');
    this.min = new Date(this.selectYear, month, Number.parseInt(min));
    this.max = new Date(this.selectYear, month, Number.parseInt(max));

  }

  getDateTimeEvent(val) {
    this.getMonthFirstLastDay(this.selectYear, val);
  }

  handleChange(event) {
    console.log("quaterly Object---->" + JSON.stringify(this.quarterlyModelArray));
    this.dateChanged.emit(this.quarterlyModelArray);
  }

  prepareQuaterlyObj(event) {
    this.quarterlyModelArray.quarterlyModel = [];
    if (this.firstQuart.length > 0) {
      this.quarterlyModelArray.quarterlyModel.push(this.firstQuart[0]);

    } if (this.secondQuart.length > 0) {
      this.quarterlyModelArray.quarterlyModel.push(this.secondQuart[0]);

    }
    if (this.thirdQuart.length > 0) {
      this.quarterlyModelArray.quarterlyModel.push(this.thirdQuart[0]);

    }
    if (this.fourthQuart.length > 0) {
      this.quarterlyModelArray.quarterlyModel.push(this.fourthQuart[0]);
    }

    this.handleChange(event);
  }

  clickMonthEvent(event, val) {
    if (val === 0) {
      this.getDateTimeEvent(val);
      this.febDate = null;
      this.marchDate = null;
      this.firstQuart = [];

      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.janDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstQuart.push(calenderModel1);
      this.prepareQuaterlyObj(event);
    } else if (val === 1) {
      this.getDateTimeEvent(val);
      this.janDate = null;
      this.marchDate = null;
      this.firstQuart = [];

      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.febDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstQuart.push(calenderModel1);
      this.prepareQuaterlyObj(event);
    } else if (val === 2) {
      this.getDateTimeEvent(val);
      this.febDate = null;
      this.janDate = null;
      this.firstQuart = [];

      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.marchDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstQuart.push(calenderModel1);
      this.prepareQuaterlyObj(event);
    } else if (val === 3) {
      this.getDateTimeEvent(val);
      this.mayDate = null;
      this.juneDate = null;
      this.secondQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.aprDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.secondQuart.push(calenderModel1);
      this.prepareQuaterlyObj(event);
    } else if (val === 4) {
      this.getDateTimeEvent(val);
      this.aprDate = null;
      this.juneDate = null;
      this.secondQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.mayDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.secondQuart.push(calenderModel1);
      this.prepareQuaterlyObj(event);
    } else if (val === 5) {
      this.getDateTimeEvent(val);
      this.mayDate = null;
      this.aprDate = null;
      this.secondQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.juneDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.secondQuart.push(calenderModel1);
      this.prepareQuaterlyObj(event);
    } else if (val === 6) {
      this.getDateTimeEvent(val);
      this.augDate = null;
      this.sepDate = null;
      this.thirdQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.julDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.thirdQuart.push(calenderModel1);
      this.prepareQuaterlyObj(event);
    } else if (val === 7) {
      this.getDateTimeEvent(val);
      this.julDate = null;
      this.sepDate = null;
      this.thirdQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.augDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.thirdQuart.push(calenderModel1);
      this.prepareQuaterlyObj(event);
    } else if (val === 8) {
      this.getDateTimeEvent(val);
      this.augDate = null;
      this.julDate = null;
      this.thirdQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.sepDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.thirdQuart.push(calenderModel1);
      this.prepareQuaterlyObj(event);
    } else if (val === 9) {
      this.getDateTimeEvent(val);
      this.decDate = null;
      this.novDate = null;
      this.fourthQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.octDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.fourthQuart.push(calenderModel1);
      this.prepareQuaterlyObj(event);
    } else if (val === 10) {
      this.getDateTimeEvent(val);
      this.octDate = null;
      this.decDate = null;
      this.fourthQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.novDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.fourthQuart.push(calenderModel1);
      this.prepareQuaterlyObj(event);
    } else if (val === 11) {
      this.getDateTimeEvent(val);
      this.novDate = null;
      this.octDate = null;
      this.fourthQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.decDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.fourthQuart.push(calenderModel1);
      this.prepareQuaterlyObj(event);
    }
  }

}
