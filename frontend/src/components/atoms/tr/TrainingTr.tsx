import { ReactNode, VFC } from "react"
import styled from "styled-components"

type Props = {
    children: ReactNode;
}

export const TrainingTr: VFC<Props> = (props) => {
    const { children } = props

    return (
        <>
            <STr>{children}</STr>
        </>
    )
}

const STr = styled.tr`
    border-bottom: solid 1px #718096;
    display: block;
    padding-top: 10px;
    padding-bottom: 10px;
`
