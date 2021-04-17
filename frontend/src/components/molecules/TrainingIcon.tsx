import { VFC } from "react";
import BrackBarbellIcon from "../../icon/black-barbell.png";
import BlackBarbellSquatIcon from "../../icon/black-barbell-squat.png";
import BlackRunningIcon from "../../icon/black-running.png";
import BlackSquatIcon from "../../icon/black-squat.png";
import WhiteBarbellIcon from "../../icon/white-barbell.png";
import WhiteBarbellSquatIcon from "../../icon/white-barbell-squat.png";
import WhiteRunningIcon from "../../icon/white-running.png";
import WhiteSquatIcon from "../../icon/white-squat.png";
import { Img } from "@chakra-ui/image";


type Props = {
    iconNumber: number | null;
    size: string;
}

export const TrainingIcon: VFC<Props> = (props) => {
    const { iconNumber, size } = props

    switch (iconNumber) {
        case 1:
            return <Img src={WhiteBarbellIcon} boxSize={size} />
        case 2:
            return <Img src={WhiteBarbellSquatIcon} boxSize={size} />
        case 3:
            return <Img src={WhiteRunningIcon} boxSize={size} />
        case 4:
            return <Img src={WhiteSquatIcon} boxSize={size} />
        default:
            return null 
    }
}