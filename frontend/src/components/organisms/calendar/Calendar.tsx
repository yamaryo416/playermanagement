import { memo, useCallback, useEffect, useState, VFC } from "react";
import { Box, Link, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import moment, { Moment } from "moment";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { TODAY } from "../../../constants";
import { scheduleOneDayState } from "../../../store/scheduleOneDayState";
import { Maybe, ScheduleType } from "../../../types/queriesType";
import { CustomTable } from "../../atoms/table/CustomTable";
import { CustomTbody } from "../../atoms/tbody/CustomTbody";
import { CalendarFirstTd } from "../../atoms/td/CalendarFirstTd";
import { CalendarSecondTd } from "../../atoms/td/CalendarSecondTd";
import { CalendarFirstTh } from "../../atoms/th/CalendarFirstTh";
import { CalendarSecondTh } from "../../atoms/th/CalendarSecondTh";
import { CustomThead } from "../../atoms/thead/CustomThead";
import { CalendarTr } from "../../atoms/tr/CalendarTr";
import { TrainingIcon } from "../../molecules/TrainingIcon";
import { calendarDateState } from "../../../store/calendarDateState";

type Props = {
    schedules: {
        edges: Maybe<ScheduleType[]>
    } | undefined;
}

export const Calendar: VFC<Props> = memo((props) => {
    const { schedules } = props

    const calendarDate = useRecoilValue(calendarDateState)
    const setOneDay = useSetRecoilState(scheduleOneDayState)

    const [isIconMode, setIsIconMode] = useState(true)
    const [datesOfWeek, setDatesOfWeek] = useState<Moment[]>([])

    const onChangeIsIconMode = useCallback(() => setIsIconMode(!isIconMode), [isIconMode])

    const weekSchedules = (d: moment.Moment) => 
        schedules?.edges?.
        filter(sche => sche.node.date === d.format("YYYY-MM-DD").toString()).
        map((sche) => (
        <WrapItem key={sche.node.id}>
            {isIconMode ? (
                <TrainingIcon iconNumber={sche.node.trainingSchedule.iconNumber} color="white" size="50px" />
            ): (
                <Text
                    maxW="130px"
                    pr={5} 
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    color="white"
                >
                    {sche.node.trainingSchedule.title}
                </Text>
            )}
        </WrapItem>
        )
    )

    useEffect(() => {
        const dates: Moment[] = []
        let addDate = 0;
        while (addDate < 7) {
            const date = moment(calendarDate.firstDate).add(addDate, 'd')
            dates.push(date)
            addDate++
        }
        setDatesOfWeek(dates)
    }, [calendarDate.firstDate])

    return (
        <Box pt={3}>
            <Box pb={3}>
                <Link onClick={onChangeIsIconMode} color="orange.500">
                    {isIconMode ? "予定を文字表記にする" : "予定をアイコン表記にする" }
                </Link>
            </Box>
            <CustomTable>
                <CustomThead>
                    <tr> 
                        <CalendarFirstTh>日付</CalendarFirstTh>
                        <CalendarSecondTh>予定</CalendarSecondTh>
                    </tr>
                </CustomThead>
                <CustomTbody>
                    {datesOfWeek.map((d, i) => (
                        <div key={d.format("YYYY-MM-DD")}>
                            <CalendarTr 
                                isToday={d.format("YYYY-MM-DD") === TODAY}
                                onClick={() => {
                                setOneDay(d.format("YYYY-MM-DD"))
                            }}>
                                <CalendarFirstTd isToday={d.format("YYYY-MM-DD") === TODAY}>
                                    {moment(calendarDate.firstDate).get("M") + 1 === d.get("M") ? d.format("M月D日") : d.format("D日")}
                                </CalendarFirstTd>
                                <CalendarSecondTd>
                                    <Wrap>
                                        {weekSchedules(d)}
                                    </Wrap>
                                </CalendarSecondTd>
                            </CalendarTr>
                        </div>
                    ))}
                </CustomTbody>
            </CustomTable>
        </Box>
    )
})