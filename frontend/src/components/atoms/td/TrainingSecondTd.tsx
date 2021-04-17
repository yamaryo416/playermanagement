import { ReactNode, VFC } from "react"
import styled from "styled-components"

type Props = {
    children: ReactNode;
}

export const TrainingSecondTd: VFC<Props> = (props) => {
    const { children } = props

    return <STd>{children}</STd>
}

const STd = styled.td `
    display: flex;
    padding-left: 5px;
    width: 68px;
`;