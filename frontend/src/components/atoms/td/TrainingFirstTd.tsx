import { ReactNode, VFC } from "react"
import styled from "styled-components"

type Props = {
    onClick: () => void;
    children: ReactNode;
}

export const TrainingFirstTd: VFC<Props> = (props) => {
    const { onClick, children } = props

    return <STd onClick={onClick}>{children}</STd>
}

const STd = styled.td `
    display: block;
    width: 130px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;