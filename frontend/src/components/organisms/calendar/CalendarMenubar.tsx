import { memo, VFC } from "react"
import { Box, Flex, Heading, Link } from "@chakra-ui/layout"
import moment from "moment"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { useCalendar } from "../../../hooks/useCalendar"
import { useRecoilValue } from "recoil";
import { calendarDateState } from "../../../store/calendarDateState";

export const CalendarMenubar: VFC = memo(() => {
    const calendarDate = useRecoilValue(calendarDateState)

    const {
        onClickLastWeek,
        onClickThisWeek,
        onClickNextWeek
    } = useCalendar();

    return (
        <Flex justifyContent="space-between" alignItems="flex-end" mt={10}>
            <Box>
                <Link onClick={onClickLastWeek}><ArrowBackIosIcon />先週</Link>
            </Box>
            <Box>
                <Heading fontSize="20px">
                    {moment(calendarDate.firstDate).get("M") + 1}月
                    { calendarDate.todayDiff < 0 ? `(${Math.abs(calendarDate.todayDiff).toString()}週前)` : null }
                    { calendarDate.todayDiff === 0 ? "(今週)" : null}
                    { calendarDate.todayDiff > 0 ? `(${calendarDate.todayDiff.toString()}週後)` : null }
                </Heading>
            </Box>
            <Box>
                <Box>
                    <Link onClick={onClickThisWeek} color="orange.500">今週</Link>
                </Box>
                <Box pt={2}>
                    <Link onClick={onClickNextWeek} >次週<ArrowForwardIosIcon /></Link>
                </Box>
            </Box>
        </Flex>
    )
})