import { Box, Flex, Heading, Text } from "@chakra-ui/layout"
import { VFC } from "react"
import { useTraining } from "../../hooks/useTraining"
import { MyTrainingsType } from "../../types/queriesType"
import { TrainingFirstTh } from "../atoms/th/TrainingFirstTh"
import { TrainingSecondTd } from "../atoms/td/TrainingSecondTd"
import { CustomSecondTh } from "../atoms/th/CustomSecondTh"
import { CustomTable } from "../atoms/table/CustomTable"
import { CustomTbody } from "../atoms/tbody/CustomTbody"
import { CustomThead } from "../atoms/thead/CustomThead"
import { SectionCard } from "../organisms/layout/SectionCard"
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { TrainingCreateModal } from "../organisms/modal/TrainingCreateModal"
import { ScheduleCreateModal } from "../organisms/modal/ScheduleCreateModal"
import { Spinner } from "@chakra-ui/spinner"
import { useQuery } from "@apollo/client"
import { GET_MY_TRAININGS } from "../../queries"
import { TrainingTr } from "../atoms/tr/TrainingTr"
import { TrainingFirstTd } from "../atoms/td/TrainingFirstTd"
import { TrainingThirdTd } from "../atoms/td/TrainingThirdTd"
import { TrainingIcon } from "../molecules/TrainingIcon"

type Props = {
    userId: string | undefined;
}

export const TrainingSection:VFC<Props> = (props) => {
    const { userId } = props

    const { loading: loadingMyTrainings, data: dataMyTrainings, error: errorMyTrainings } = useQuery<MyTrainingsType>(GET_MY_TRAININGS, {
        fetchPolicy: "cache-and-network",
    })

    const { onClickSelectedTraining, updateTrainingNice } = useTraining()
    
    if (loadingMyTrainings) return <Spinner />
    else if (errorMyTrainings) return (
        <h1>Error: {errorMyTrainings.message}</h1>
    )

    return (
        <SectionCard>
             <Heading textAlign="center" fontSize="20px" pb={10}>トレーニング一覧</Heading>
              <CustomTable>
                <CustomThead>
                    <tr>
                        <TrainingFirstTh>タイトル</TrainingFirstTh>
                        <CustomSecondTh>回数(回) </CustomSecondTh>
                        <CustomSecondTh>距離(km)</CustomSecondTh>
                    </tr>
                </CustomThead>
                <CustomTbody>
                    {dataMyTrainings?.myTrainings.edges?.map((train) => (
                        <TrainingTr>
                            <Flex alignItems="center">
                                <TrainingFirstTd onClick={() => onClickSelectedTraining(
                                    train.node.title,
                                    train.node.count,
                                    train.node.distance,
                                    train.node.description
                                )}>{train.node.title}</TrainingFirstTd>
                                <TrainingSecondTd>{train.node.count}</TrainingSecondTd>
                                <TrainingThirdTd>{train.node.distance}</TrainingThirdTd>
                                <Flex>
                                    {train.node.niceUser.includes(userId!) ? <ThumbUpIcon onClick={() => updateTrainingNice(train.node.id, userId!)} /> : <ThumbUpOutlinedIcon onClick={() => updateTrainingNice(train.node.id, userId!)} /> }
                                    <Text pl={2}>{train.node.niceCount}</Text>
                                </Flex>
                                <Box pl={3}>
                                    <TrainingIcon iconNumber={train.node.iconNumber} size="50px" />
                                </Box>
                            </Flex>
                        </TrainingTr>
                    ))}
                </CustomTbody>
             </CustomTable>
             <TrainingCreateModal/>
            <ScheduleCreateModal dataMyTrainings={dataMyTrainings} />
        </SectionCard>
    )
}