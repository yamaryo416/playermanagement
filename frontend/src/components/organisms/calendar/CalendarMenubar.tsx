import { Box, Flex, Heading, Link } from "@chakra-ui/layout"
import moment from "moment"
import { useState, VFC } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { STARTDATE, TODAY } from "../../../constants"
import { useCalendar } from "../../../hooks/useCalendar"
import { scheduleFirstDateState } from "../../../store/scheduleFirstDateState"
import { SecondaryButton } from "../../atoms/button/SecondaryButton"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


export const CalendarMenubar: VFC = () => {
    const {
        firstDate,
        todayDiff,
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
                    {moment(firstDate).get("M") + 1}月
                    { todayDiff < 0 ? `(${Math.abs(todayDiff).toString()}週前)` : null }
                    { todayDiff === 0 ? "(今週)" : null}
                    { todayDiff > 0 ? `(${todayDiff.toString()}週後)` : null }
                </Heading>
            </Box>
            <Box>
                <Box>
                    <Link onClick={onClickThisWeek} color="orange.300">今週</Link>
                </Box>
                <Box pt={2}>
                    <Link onClick={onClickNextWeek} >次週<ArrowForwardIosIcon /></Link>
                </Box>
            </Box>
        </Flex>
    )
}