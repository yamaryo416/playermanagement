import { Button } from "@chakra-ui/button"
import { ReactNode, VFC } from "react"

type Props = {
    disabled: boolean;
    children: ReactNode;
}

export const PrimaryButton: VFC<Props> = (props) => {
    const { disabled, children } = props
    return (
        <Button
            disabled={disabled}
            type="submit"
            bg="blue.500"
            px={5}
            color="white"
         >
            {children}
        </Button>
    )
}
