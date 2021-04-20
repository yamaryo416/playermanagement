import { Box, Flex, Text } from "@chakra-ui/layout";
import { Td } from "@chakra-ui/table";
import { VFC } from "react";
import { Maybe, TrainingType } from "../../types/queriesType";
import { CustomTable } from "../atoms/table/CustomTable";
import { CustomTbody } from "../atoms/tbody/CustomTbody";
import { TrainingFirstTd } from "../atoms/td/TrainingFirstTd";
import { TrainingSecondTd } from "../atoms/td/TrainingSecondTd";
import { TrainingFirstTh } from "../atoms/th/TrainingFirstTh";
import { TrainingSecondTh } from "../atoms/th/TrainingSecondTh";
import { CustomThead } from "../atoms/thead/CustomThead";
import { SectionTitle } from "../atoms/title/SectionTitle";
import { TrainingTr } from "../atoms/tr/TrainingTr";
import { SectionCard } from "../organisms/layout/SectionCard";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { TrainingIcon } from "../molecules/TrainingIcon";


type Props = {
    trainings: {
        edges : Maybe<TrainingType[]>
    } | undefined;
};

export const OneTeamTrainingSection: VFC<Props> = (props) => {
    const { trainings } = props

    return (
        <SectionCard>
            <SectionTitle>トレーニング一覧</SectionTitle>
            <CustomTable>
                <CustomThead>
                     <tr>
                        <TrainingFirstTh>タイトル</TrainingFirstTh>
                        <TrainingSecondTh>回</TrainingSecondTh>
                        <TrainingSecondTh>kg</TrainingSecondTh>
                        <TrainingSecondTh>km</TrainingSecondTh>       
                    </tr>
                </CustomThead>
                <CustomTbody>
                    {trainings?.edges?.map((train) => (
                        <TrainingTr>
                            <Flex alignItems="center">
                                <TrainingFirstTd isClick={false} onClick={() => null}>
                                    {train.node.title}
                                </TrainingFirstTd>
                                <TrainingSecondTd>{train.node.count}</TrainingSecondTd>
                                <TrainingSecondTd>{train.node.load}</TrainingSecondTd>
                                <TrainingSecondTd>{train.node.distance}</TrainingSecondTd>
                                <Flex>
                                    <ThumbUpIcon />
                                    <Text pl={2}>{train.node.niceCount}</Text>
                                </Flex>
                                <Box pl={3}>
                                    <TrainingIcon iconNumber={train.node.iconNumber} color="white" size="50px" />
                                </Box>
                            </Flex>
                        </TrainingTr>
                    ))}
                    
                </CustomTbody>
            </CustomTable>
        </SectionCard>
    )
}