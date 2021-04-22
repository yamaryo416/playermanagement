import { ReactNode, VFC } from "react"
import styled from "styled-components"

type Props = {
    isClick: boolean;
    onClick: () => void;
    children: ReactNode;
}

export const TrainingFirstTd: VFC<Props> = (props) => {
    const { isClick, onClick, children } = props

    if (isClick) return <STd onClick={onClick}>{children}</STd>
    else return <STd>{children}</STd>

}

const STd = styled.td `
    display: block;
    width: 130px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;