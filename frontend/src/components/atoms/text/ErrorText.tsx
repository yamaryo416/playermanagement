import { Text } from "@chakra-ui/layout"
import { VFC } from "react"

type Props = {
    children: string;
}

export const ErrorText: VFC<Props> = (props) => {
    const { children } = props

    return (
       <Text
            color="red.600"
        >
                {children}
        </Text>
    )
}


