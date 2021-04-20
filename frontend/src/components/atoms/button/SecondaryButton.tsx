import { Button } from "@chakra-ui/button"
import { ReactNode, VFC } from "react"

type Props = {
    onClick: () => void;
    children: ReactNode;
}

export const SecondaryButton: VFC<Props> = (props) => {
    const { onClick, children } = props
    return (
        <Button
            bg="gray.500"
            color="white"
            _hover={{
                opacity: 0.7
            }}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}