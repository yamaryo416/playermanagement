import { VFC } from "react"
import { Button } from "@chakra-ui/button"
import { Box, Flex, HStack, Text } from "@chakra-ui/layout"
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/table"
import moment from "moment"
import { useSetRecoilState } from "recoil"
import { useCalendar } from "../../../hooks/useCalendar"
import { scheduleOneDayState } from "../../../store/scheduleOneDayState"
import { MyAllSchedulesType } from "../../../types/queriesType"

 type Props = {
    dataAllSchedules: MyAllSchedulesType | undefined;
}

export const Calendar: VFC<Props> = (props) => {
    const { dataAllSchedules } = props;

    const {
        datesOfWeek,
        onClickLastWeek,
        onClickThisWeek,
        onClickNextWeek,
    } = useCalendar()

    const setOneDay = useSetRecoilState(scheduleOneDayState)

    const weekSchedules = (d: moment.Moment) => 
        dataAllSchedules?.myAllSchedules.edges?.
        filter(sche => sche.node.date === d.format("YYYY-MM-DD").toString()).
        map((sche) => <Text maxW="100px" pr={5} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" >{sche.node.trainingSchedule.title}</Text>
    )

    const onChangeOneDaySchedules = (d: moment.Moment) => {
        setOneDay(d.format("YYYY-MM-DD"))
    }

    return (
        <Box>
            <Box textAlign="center">
                <Button onClick={() => onClickLastWeek()} m={3}>先週</Button>
                <Button onClick={() => onClickThisWeek()} m={3}>今週</Button>
                <Button onClick={() => onClickNextWeek()} m={3}>次週</Button>
            </Box>
            <Table variant="striped" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th w="100px">日付</Th>
                        <Th>予定</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {datesOfWeek.map((d) => (
                        <Tr onClick={() => {
                            onChangeOneDaySchedules(d)
                            }}>
                            <Th w="100px">{d.format("M月D日")}</Th>
                            <Th>
                                <Flex>
                                    {weekSchedules(d)}
                                </Flex>
                            </Th>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    )
}

