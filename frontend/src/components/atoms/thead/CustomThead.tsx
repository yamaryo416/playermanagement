import { ReactNode, VFC } from "react"
import styled from "styled-components"

type Props = {
    children: ReactNode
}

export const CustomThead: VFC<Props> = (props) => {
    const { children } = props

    return <SThead>{children}</SThead>
}

const SThead = styled.thead `
    display: block;
    border-bottom: solid 1px #718096;
    padding-bottom: 10px;
`;