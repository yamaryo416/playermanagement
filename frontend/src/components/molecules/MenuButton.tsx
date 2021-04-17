import { Button } from "@chakra-ui/button"
import { Box, Text} from "@chakra-ui/layout"
import { ReactNode, VFC } from "react"

type Props = {
    title: string;
    onOpen: () => void;
    children: ReactNode;
}

export const MenuButton: VFC<Props> = (props) => {
    const { title, onOpen, children } = props;
    return (
        <div>
            <Box 
                textAlign="center"
                pt={6}
                px={3}
                onClick={() => onOpen()}
            >
                <Box>
                    {children}
                </Box>
                <Text>{title}</Text>
            </Box>
        </div>
    )
}
