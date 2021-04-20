import { ReactNode, VFC } from "react"
import styled from "styled-components"

type Props = {
    children: ReactNode
}

export const CalendarSecondTh: VFC<Props> = (props) => {
    const { children } = props

    return <STh>{children}</STh>
}

const STh = styled.th`
    padding-left: 5px;
`