import { ReactNode, VFC } from "react"
import styled from "styled-components"

type Props = {
    children: ReactNode
}

export const TrainingSecondTh: VFC<Props> = (props) => {
    const { children } = props

    return <STh>{children}</STh>
}

const STh = styled.th`
    width: 40px;
    padding-right: 20px;
`