import { Box } from "@chakra-ui/layout"
import { ReactNode, VFC } from "react"

type Props = {
    children: ReactNode;
}

export const SectionCard: VFC<Props> = (props) => {
    const { children } = props;

    return (
        <Box w="500px" p={5} borderColor="gray.600" borderStyle="solid" borderWidth="1px">
            {children}
        </Box>
    )
}