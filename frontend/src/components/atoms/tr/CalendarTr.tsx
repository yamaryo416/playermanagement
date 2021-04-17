import { ReactNode, VFC } from "react"
import styled from "styled-components"

type Props = {
    isToday: boolean;
    children: ReactNode;
    onClick: () => void;
}

export const CalendarTr: VFC<Props> = (props) => {
    const { isToday, onClick, children } = props

    if (isToday) return <TodayTr onClick={onClick}>{children}</TodayTr>
    else return <NotTodayTr onClick={onClick}>{children}</NotTodayTr>
}

const TodayTr = styled.tr`
    border-bottom: solid 1px #ecc94b;
    display: block;
    padding-top: 10px;
    padding-bottom: 10px;
`

const NotTodayTr = styled.tr`
    border-bottom: solid 1px #718096;
    display: block;
    padding-top: 10px;
    padding-bottom: 10px;
`