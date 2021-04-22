import { ReactNode, VFC } from "react"
import styled from "styled-components"

type Props = {
    children: ReactNode
}

export const CustomTbody: VFC<Props> = (props) => {
    const { children } = props

    return (
        <>
            <STbody>{children}</STbody>
        </>
    )
}

const STbody = styled.tbody`
    display: block;
`