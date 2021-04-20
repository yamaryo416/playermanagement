import { ReactNode, VFC } from "react"
import styled from "styled-components"

type Props = {
    isToday: boolean;
    children: ReactNode;
}

export const CalendarFirstTd: VFC<Props> = (props) => {
    const { isToday, children } = props

    if (isToday) return <TodayTd>{children}</TodayTd>
    return <NotTodayTd>{children}</NotTodayTd>
}

const TodayTd = styled.td `
    width: 60px;
    color: #dd6b20;
`;

const NotTodayTd = styled.td`
    width: 60px;
`