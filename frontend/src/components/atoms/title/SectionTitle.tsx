import { Heading } from "@chakra-ui/layout"
import { ReactNode, VFC } from "react"

type Props = {
    children: ReactNode
}

export const SectionTitle: VFC<Props> = (props) => {
    const { children } = props
    return (
        <Heading as="h3" fontSize="20px" pb={10} color="rgb(66, 203, 237)" textAlign="center">
            {children}
        </Heading>
    )
}