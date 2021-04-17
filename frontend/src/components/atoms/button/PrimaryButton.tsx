import { Button } from "@chakra-ui/button"
import { ReactNode, VFC } from "react"

type Props = {
    children: ReactNode;
}

export const PrimaryButton: VFC<Props> = (props) => {
    const { children } = props
    return (
        <Button bg="gray.500">{children}</Button>
    )
}
