import { Box, Link, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import moment, { Moment } from "moment";
import { useEffect, useState, VFC } from "react";
import { TODAY } from "../../../constants";
import { useCalendar } from "../../../hooks/useCalendar";
import { ScheduleType } from "../../../types/queriesType";
import { CustomTable } from "../../atoms/table/CustomTable";
import { CustomTbody } from "../../atoms/tbody/CustomTbody";
import { CalendarFirstTd } from "../../atoms/td/CalendarFirstTd";
import { CalendarSecondTd } from "../../atoms/td/CalendarSecondTd";
import { CalendarFirstTh } from "../../atoms/th/CalendarFirstTh";
import { CalendarSecondTh } from "../../atoms/th/CalendarSecondTh";
import { CustomThead } from "../../atoms/thead/CustomThead";
import { CalendarTr } from "../../atoms/tr/CalendarTr";
import { TrainingIcon } from "../../molecules/TrainingIcon";
import { SectionCard } from "../layout/SectionCard";


type Maybe<T> = T | null;

type Props = {
    schedules: {
        edges: Maybe<ScheduleType[]>
    } | undefined;
}


export const Calendar: VFC<Props> = (props) => {
    const { schedules } = props
    const { firstDate, setOneDay } = useCalendar()

    const [isIconMode, setIsIconMode] = useState(true)
    const [datesOfWeek, setDatesOfWeek] = useState<Moment[]>([])

    const weekSchedules = (d: moment.Moment) => 
        schedules?.edges?.
        filter(sche => sche.node.date === d.format("YYYY-MM-DD").toString()).
        map((sche) => (
        <WrapItem>
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

    const onChangeIsIconMode = () => setIsIconMode(!isIconMode)

    useEffect(() => {
        const dates: Moment[] = []
        let addDate = 0;
        while (addDate < 7) {
            const date = moment(firstDate).add(addDate, 'd')
            dates.push(date)
            addDate++
        }
        setDatesOfWeek(dates)
    }, [firstDate])

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
                    {datesOfWeek.map((d) => (
                        <CalendarTr 
                            isToday={d.format("YYYY-MM-DD") === TODAY}
                            onClick={() => {
                            setOneDay(d.format("YYYY-MM-DD"))
                        }}>
                            <CalendarFirstTd isToday={d.format("YYYY-MM-DD") === TODAY}>
                                {moment(firstDate).get("M") + 1 === d.get("M") ? d.format("M月D日") : d.format("D日")}
                            </CalendarFirstTd>
                            <CalendarSecondTd>
                                <Wrap>
                                    {weekSchedules(d)}
                                </Wrap>
                            </CalendarSecondTd>
                        </CalendarTr>
                    ))}
                </CustomTbody>
            </CustomTable>
        </Box>
    )
}