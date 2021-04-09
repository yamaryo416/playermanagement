import moment from "moment";

export const TODAY = moment().format("YYYY-MM-DD")

export const STARTDATE = moment().startOf("week")

let addDate = 0;

export const DATES_OF_WEEK: moment.Moment[] = []

while (addDate < 7) {
    const date = moment(STARTDATE).add(addDate, 'd')
    DATES_OF_WEEK.push(date)
    addDate++
}


export const DAY_OF_WEEK = ["月", "火", "水", "木", "金", "土", "日"]