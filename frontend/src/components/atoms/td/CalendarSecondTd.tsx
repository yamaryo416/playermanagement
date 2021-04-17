import { ReactNode, VFC } from "react"
import styled from "styled-components"

type Props = {
    children: ReactNode
}

export const CalendarSecondTd: VFC<Props> = (props) => {
    const { children } = props

    return <STd>{children}</STd>
}

const STd = styled.th`
    min-width: 30px;
`