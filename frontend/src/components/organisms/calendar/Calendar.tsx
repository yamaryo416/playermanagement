import { useEffect, useState, VFC } from "react"
import { Box, Link, Text, Wrap, WrapItem } from "@chakra-ui/layout"
import { Image, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import moment, { Moment } from "moment"
import { useCalendar } from "../../../hooks/useCalendar"
import { MyAllSchedulesType } from "../../../types/queriesType"
import { CustomTable } from "../../atoms/table/CustomTable"
import { CustomThead } from "../../atoms/thead/CustomThead"
import { CustomSecondTh } from "../../atoms/th/CustomSecondTh"
import { CustomTbody } from "../../atoms/tbody/CustomTbody"
import { CalendarSecondTd } from "../../atoms/td/CalendarSecondTd"
import { CalendarTr } from "../../atoms/tr/CalendarTr"
import { TODAY } from "../../../constants"
import { CalendarFirstTd } from "../../atoms/td/CalendarFirstTd"
import { CalendarFirstTh } from "../../atoms/th/CalendarFirstTh"
import { TrainingIcon } from "../../molecules/TrainingIcon"
import { WhiteSquatIcon } from "../../atoms/image/WhiteSquatIcon"

 type Props = {
    dataAllSchedules: MyAllSchedulesType | undefined;
}

export const Calendar: VFC<Props> = (props) => {
    const { dataAllSchedules } = props;
    const { firstDate, onChangeOneDaySchedules } = useCalendar()


    const [isIconMode, setIsIconMode] = useState(true)
    const [datesOfWeek, setDatesOfWeek] = useState<Moment[]>([])

    const weekSchedules = (d: moment.Moment) => 
        dataAllSchedules?.myAllSchedules.edges?.
        filter(sche => sche.node.date === d.format("YYYY-MM-DD").toString()).
        map((sche) => (
        <WrapItem>
            {isIconMode ? (
            
                <TrainingIcon iconNumber={sche.node.trainingSchedule.iconNumber} size="50px" />
            ): (
                <Text
                    maxW="130px"
                    pr={5} 
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    color="orange.500"
                >{sche.node.trainingSchedule.title}</Text>
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
                        <CustomSecondTh>予定</CustomSecondTh>
                    </tr>
                </CustomThead>
                <CustomTbody>
                    {datesOfWeek.map((d) => (
                        <CalendarTr 
                            isToday={d.format("YYYY-MM-DD") === TODAY}
                            onClick={() => {
                                onChangeOneDaySchedules(d)
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

