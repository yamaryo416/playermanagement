import styled from "styled-components"
import { ReactNode, VFC } from "react"

type Props = {
    children: ReactNode;
}


export const CustomTable: VFC<Props> = (props) => {
    const { children } = props
    return <STable>{children}</STable>   
}

const STable = styled.table`
    display: block;
`;