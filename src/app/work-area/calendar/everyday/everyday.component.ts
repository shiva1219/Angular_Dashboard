import { Moment } from 'moment';
import { CalenderModel } from './../models/calender';
import { Utils } from './../custom/Utils';
//import { EveryDayModel } from '../models/everyDayModel';
import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
const moment = (_moment as any).default ? (_moment as any).default : _moment;


@Component({
  selector: 'app-everyday',
  templateUrl: './everyday.component.html',
  styleUrls: ['./everyday.component.css']
})
export class EverydayComponent implements OnInit {

  public startDateValidation = true;
  public startDate: Date;
  public endDate: Date;
  public weeksDays = false;
  public govHolyDays = false;
  public utilsObj: Utils = new Utils(this.datePipe);
  public weeksDaysCount = 'Except Weekends';
  public govtHolidaysCount = 'Except Government Holidays ';
  //public everDayModel: EveryDayModel = <EveryDayModel>{};
  public everyDayCalendarObj: Array<CalenderModel>;
  public startDateFlag = false;
  public endDateFlag = true;

  public everyValidationFlag = false;
  public mainErrorMsg: String = '';


  everyTimeCalendarObj: any;
  selectedMoment: any;

  //   Static Goverment Holiday
  public govtHolidaysArrayObj: any = [
    { id: 1, holiday: '15-10-2018' },
    { id: 2, holiday: '22-10-2018' }
  ];

  @Output() public dateChanged = new EventEmitter();
  @Input() public everyTimeCaledar: any;
  handleEndDateChange(event) {
    if (this.startDate == null) {
      this.startDateValidation = false;
    }
  }
  constructor(public datePipe: DatePipe) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.everyTimeCaledar && changes.everyTimeCaledar.currentValue) {
      this.everyTimeCalendarObj = changes.everyTimeCaledar.currentValue;
      console.log("everytime calendar" + JSON.stringify(changes.everyTimeCaledar));
      setTimeout(() => {
        this.setOneTimeCalendarDays(changes.everyTimeCaledar.currentValue);
      }, 200);
    }

    //console.log("One time---->", changes); // logs undefined
  }
  private setOneTimeCalendarDays(days: any) {
    if (days.length > 0) {
      console.log("days values ", days.length);
      for (var i = 0; i < days.length; i++) {

      }

      console.log("first day", JSON.stringify(days[0].start_date));
      console.log("last day", JSON.stringify(days[days.length - 1].start_date));
      var reqDate: string[] = days[0].start_date.split('-');
      var reqDate1: string[] = days[days.length - 1].start_date.split('-');

      var year: number = parseInt(reqDate[0]);
      var month: number = parseInt(reqDate[1]);
      var day: number = parseInt(reqDate[2]);

      var year1: number = parseInt(reqDate1[0]);
      var month1: number = parseInt(reqDate1[1]);
      var day1: number = parseInt(reqDate1[2]);

      this.selectedMoment = new Date(year, month - 1, day);
      this.endDate = new Date(year1, month1 - 1, day1);
      this.startDate = new Date(year, month - 1, day);
      this.endDateFlag = false;
      this.handleChange("");
    }

  }
  private setDate(dateString: string, dateString1: string, isStartDate: boolean) {
    console.log("dateString" + JSON.stringify(dateString));
    console.log("dateString1" + JSON.stringify(dateString));
    // start_date: "2019-01-02"
    var reqDate: string[] = dateString.split('-');
    var reqDate1: string[] = dateString1.split('-');

    if (isStartDate) {
      var year: number = parseInt(reqDate[0]);
      var month: number = parseInt(reqDate[1]);
      var day: number = parseInt(reqDate[2]);

      var year1: number = parseInt(reqDate1[0]);
      var month1: number = parseInt(reqDate1[1]);
      var day1: number = parseInt(reqDate1[2]);

      this.selectedMoment = new Date(year, month - 1, day);
      this.endDate = new Date(year1, month1 - 1, day1);
      this.startDate = new Date(year, month - 1, day);

    }
  }
  public startDateEventHandler(event) {
    if (this.startDate === undefined || this.startDate.toString() === '') {
      this.endDateFlag = true;
    } else {
      if (this.endDate !== undefined) {
        let startD = new Date(moment(this.startDate).format('YYYY-MM-DD')).getTime();
        let endD = new Date(moment(this.endDate).format('YYYY-MM-DD')).getTime();

        if (startD > endD) {
          this.mainErrorMsg = 'Start date is greater that end date !';
          this.everyValidationFlag = true;
        } else {
          this.everyValidationFlag = false;
          this.handleChange(event);
        }
      } else {
        this.endDateFlag = false;
      }

    }

  }

  public endDateEventHandler(event) {
    if (this.startDate === undefined || this.startDate.toString() === '') {
      this.endDateFlag = true;
    } else {
      let startD = new Date(moment(this.startDate).format('YYYY-MM-DD')).getTime();
      let endD = new Date(moment(this.endDate).format('YYYY-MM-DD')).getTime();

      if (startD > endD) {
        this.mainErrorMsg = 'Start Date is greater that endDate !';
        this.everyValidationFlag = true;
      } else {
        this.everyValidationFlag = false;
        this.handleChange(event);
      }
    }

  }

  private handleChange(event) {
    if (this.startDate !== undefined && this.endDate !== undefined) {
      this.everyDayCalendarObj = [];

      let startTime = this.startDate;
      let endTime = this.endDate;

      let calDate = new Date(startTime);
      let year = calDate.getFullYear();
      let month = calDate.getMonth() + 1;
      let date = calDate.getDate();
      let eCalDate = new Date(endTime);
      let eYear = eCalDate.getFullYear();
      let eMonth = eCalDate.getMonth();
      let eDate = eCalDate.getDate();

      if (this.startDate !== undefined && this.endDate !== undefined) {
        if (date > eDate) {
          this.endDate = null;
        }
      }

      let totalDates = this.utilsObj.getDates(new Date(year, month - 1, date),
        new Date(eYear, eMonth, eDate),
        false, -1);

      let dates = this.utilsObj.getDates(new Date(year, month - 1, date),
        new Date(eYear, eMonth, eDate),
        this.weeksDays, 0);


      for (let j = 0; j < dates.length; j++) {
        if (dates[j] === null) {
          dates.splice(j, 1);
        }
      }

      if (this.weeksDays) {
        let weekDaysCount = totalDates.length - dates.length;
        this.weeksDaysCount = 'Except Weekends ( ' + (weekDaysCount) + ' days)';
      } else {
        this.weeksDaysCount = 'Except Weekends ';
      }

      let calArr = [];
      let pipe = new DatePipe('en-US');
      dates.forEach(function (date) {

        let calenderModel = new CalenderModel();
        calenderModel.start_date = pipe.transform(date, 'dd-MMM-yyyy');
        calenderModel.end_date = pipe.transform(date, 'dd-MMM-yyyy');
        calArr.push(calenderModel);
      });


      let govtCount = 0;
      if (this.govHolyDays) {
        for (let j = 0; j < calArr.length; j++) {
          let calenderModel = new CalenderModel();
          calenderModel = calArr[j];
          for (let i = 0; i < this.govtHolidaysArrayObj.length; i++) {
            if (calenderModel.start_date == this.govtHolidaysArrayObj[i].holiday) {
              delete calArr[j];
              govtCount++;
            }
          }

        }
        if (govtCount > 0) {
          this.govtHolidaysCount = 'Except Government Holidays (' + govtCount + ' days)';
        } else {
          this.govtHolidaysCount = 'Except Government Holidays ';
        }
      } else {
        this.govtHolidaysCount = 'Except Government Holidays ';
      }
      this.everyDayCalendarObj = calArr;
      this.dateChanged.emit(this.everyDayCalendarObj);
    }
  }

  public onWeekdaysChange(event) {
    if (this.weeksDays === true) {
      this.weeksDays = true;
    } else {
      this.weeksDays = false;
    }
    this.handleChange(event);
  }
  public onGovHolidaysChange(event) {
    if (this.weeksDays === true) {
      this.weeksDays = true;
    } else {
      this.weeksDays = false;
    }
    this.handleChange(event);
  }

}
