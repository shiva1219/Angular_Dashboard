import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import * as _moment from 'moment';
import { CalenderModel } from '../models/calender';

const moment = (_moment as any).default ? (_moment as any).default : _moment;

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthlyComponent implements OnInit {

  public dateTimeRange: Date[];
  public noOfDays = 0;
  public monthlyCalendarObj: Array<CalenderModel>;
  public validationFlag = true;

  @Output() public monthlyCalendarChanged = new EventEmitter();
  @Input() public monthlyCalendarInput: any;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.monthlyCalendarInput && changes.monthlyCalendarInput.currentValue) {
      // setTimeout(() => {
      console.log("monthly calendar dateTimeRange", JSON.stringify(changes.monthlyCalendarInput));
      this.setMonthlyCalendarDays(changes.monthlyCalendarInput.currentValue);
      //}, 1000);
    }
  }
  setMonthlyCalendarDays(days: any) {
    console.log("monthly calendar dateTimeRange", JSON.stringify(days));
    this.noOfDays = days.length;
    let startYear = moment(new Date(days[0].start_date));
    let endYear = moment(new Date(days[days.length - 1].start_date));
    this.validationFlag = false;
    this.dateTimeRange = [];
    this.dateTimeRange.push(startYear._d);
    this.dateTimeRange.push(endYear._d);

    //console.log("monthly calendar dateTimeRange", JSON.stringify(this.dateTimeRange));


  }

  handleChange(event) {
    console.log("date range--->" + JSON.stringify(this.dateTimeRange));
    let now = moment(this.dateTimeRange[0]).format("YYYY-MMM-DD ");
    this.monthlyCalendarObj = [];
    let dateArray = [];
    let currentDate: Date;

    if (this.dateTimeRange[0] !== null) {
      currentDate = new Date(this.dateTimeRange[0]);
      for (var i = 0; i < this.noOfDays; i++) {

        var calDate = currentDate;
        var year = calDate.getFullYear();
        var month = calDate.getMonth();
        var date = calDate.getDate();
        if (i !== 0) {
          date = date + 1;
        }
        var nextDay = new Date(year, month, date);
        currentDate = nextDay;
        var dayObj = moment(currentDate).format("YYYY-MMM-DD ");
        dateArray.push(dayObj);

        let calenderModel = new CalenderModel();
        calenderModel.start_date = dayObj;
        calenderModel.end_date = dayObj;
        this.monthlyCalendarObj.push(calenderModel);
        if (i == this.noOfDays - 1) {

          this.dateTimeRange.push(nextDay);
          for (var j = 0; j < this.dateTimeRange.length; j++) {
            if (this.dateTimeRange[j] === null) {
              this.dateTimeRange.splice(j, 1);
            }

            if (j == this.dateTimeRange.length - 1) {
            }
          }
          let fromDate = moment(dateArray[0]);
          let toDate = moment(dateArray[this.noOfDays - 1]);


          this.dateTimeRange = [];
          this.dateTimeRange.push(fromDate._d);
          this.dateTimeRange.push(toDate._d);



        }
      }
    }

    console.log("date range--->" + JSON.stringify(this.dateTimeRange));
    this.monthlyCalendarChanged.emit(this.monthlyCalendarObj)
  }
  public numberOfDays(event) {
    console.log("numberOfDays");

    if (this.noOfDays == undefined || this.noOfDays == 0) {
      this.validationFlag = true;
    } else {
      this.validationFlag = false;
    }

  }

}
