import { ReactNode, VFC } from "react"
import styled from "styled-components"

type Props = {
    children: ReactNode;
}

export const TrainingThirdTd: VFC<Props> = (props) => {
    const { children } = props

    return <STd>{children}</STd>
}

const STd = styled.td `
    padding-left: 5px;
    width: 90px;
`;