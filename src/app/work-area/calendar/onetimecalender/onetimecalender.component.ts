import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-onetimecalender',
  templateUrl: './onetimecalender.component.html',
  styleUrls: ['./onetimecalender.component.css']
})
export class OnetimecalenderComponent implements OnInit {

  selectedMoment: any;
  oneTimeCalendarObj: any;


  @Input() public oneTimeCaledar: any;
  @Output() public dateChanged = new EventEmitter();
  constructor() { }


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log("ontime calendar---->", changes);
    if (changes.oneTimeCaledar && changes.oneTimeCaledar.currentValue) {
      this.oneTimeCalendarObj = changes.oneTimeCaledar.currentValue;
      // console.log("ontime calendar---->", this.oneTimeCalendarObj);
      setTimeout(() => {
        this.setDate(this.oneTimeCalendarObj[0].start_date, true);
      }, 200);
    }

    //console.log("One time---->", changes); // logs undefined
  }

  private setDate(dateString: string, isStartDate: boolean) {
    // start_date: "2019-01-02"
    var reqDate: string[] = dateString.split('-');
    console.log("hello--->", reqDate);
    if (isStartDate) {
      var year: number = parseInt(reqDate[0]);
      var month: number = parseInt(reqDate[1]);
      var day: number = parseInt(reqDate[2]);

      this.selectedMoment = new Date(year, month - 1, day);
      console.log("hello--->", this.selectedMoment);
      this.dateChanged.emit(this.selectedMoment);
    }
  }



  handleChange(event) {
    this.dateChanged.emit(this.selectedMoment);
  }


}
