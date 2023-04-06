import { DatePipe } from "@angular/common";

export class Utils {
    constructor(public datePipe: DatePipe) {

    }



    public formatDate(value, format): any {
        return this.datePipe.transform(value, format);
    }

    public getDates(startDate, endDate, isExceptWeekDays, selectedWeekDay): any {
        var day = startDate;
        let dates = [],
            currentDate = startDate,
            addDays = function (days) {
                let date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);

                return date;
            };
        while (currentDate <= endDate) {
            var d = currentDate.getDay();
            if (isExceptWeekDays) {
                if (d == 0 || d == 6) {

                } else {
                    dates.push(currentDate);
                }
            } else {

                if (d == selectedWeekDay) {
                    dates.push(currentDate);
                }
                else {

                    dates.push(currentDate);
                }
            }

            currentDate = addDays.call(currentDate, 1);
        }

        return dates;

    }

    public getMultipleWeekDates(startDate, endDate, isExceptWeekDays, selectedWeekDay): any {

        var day = startDate;
        var selectedWeekDays = selectedWeekDay;
        let dates = [],
            currentDate = startDate,
            addDays = function (days) {
                let date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);

                return date;
            };
        while (currentDate <= endDate) {

            var d = currentDate.getDay();
            if (isExceptWeekDays) {
                if (d == 0 || d == 6) {

                } else {
                    dates.push(currentDate);
                }
            } else {
                for (var i = 0; i < selectedWeekDays.length; i++) {
                    if (d == selectedWeekDays[i]) {
                        dates.push(currentDate);
                    }
                }

            }

            currentDate = addDays.call(currentDate, 1);
        }

        return dates;

    }


    public getBiWeekDates(startDate, endDate, selectedWeekDay): any {
        let day = startDate;
        let selectedWeekDays = selectedWeekDay;
        let ctr = 0;
        let dates = [],
            currentDate = startDate,
            addDays = function (days) {
                let date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);

                return date;
            };
        while (currentDate <= endDate) {
            var d = currentDate.getDay();
            if (selectedWeekDays.length > 0) {

                for (var i = 0; i < selectedWeekDays.length; i++) {
                    let ctr = 0;
                    // console.log("date with day", currentDate + "day" + d + "-->" + selectedWeekDays[i]);
                    if (d == selectedWeekDays[i]) {
                        dates.push(currentDate);
                    }
                }

            }

            currentDate = addDays.call(currentDate, 1);
        }

        return dates;

    }

}