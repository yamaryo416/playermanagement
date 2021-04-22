import { Box, Flex, Heading, Text } from "@chakra-ui/layout"
import { VFC } from "react"
import { TrainingFirstTh } from "../atoms/th/TrainingFirstTh"
import { TrainingSecondTd } from "../atoms/td/TrainingSecondTd"
import { CustomTable } from "../atoms/table/CustomTable"
import { CustomTbody } from "../atoms/tbody/CustomTbody"
import { CustomThead } from "../atoms/thead/CustomThead"
import { SectionCard } from "../organisms/layout/SectionCard"
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { TrainingCreateModal } from "../organisms/modal/TrainingCreateModal"
import { ScheduleCreateModal } from "../organisms/modal/ScheduleCreateModal"
import { Spinner } from "@chakra-ui/spinner"
import { TrainingTr } from "../atoms/tr/TrainingTr"
import { TrainingFirstTd } from "../atoms/td/TrainingFirstTd"
import { TrainingIcon } from "../molecules/TrainingIcon"
import { TrainingSecondTh } from "../atoms/th/TrainingSecondTh"
import { TrainingDetailModal } from "../organisms/modal/TrainingDetailModal"
import { useSetRecoilState } from "recoil"
import { trainingSelectedState } from "../../store/trainingSelectedState"
import { useUpdateTrainingNice } from "../../hooks/queries/useUpdateTrainingNice"
import { useGetMyTrainings } from "../../hooks/queries/useGetMyTrainings"

type Props = {
    myId: string | undefined;
}

export const MyTeamTrainingSection:VFC<Props> = (props) => {
    const { myId } = props

    const { updateTrainingNice } = useUpdateTrainingNice()
    const { loadingMyTrainings, dataMyTrainings, errorMyTrainings } = useGetMyTrainings()

    const setTrainingSelected = useSetRecoilState(trainingSelectedState)
    
    if (loadingMyTrainings) return <Spinner />
    else if (errorMyTrainings) return (
        <h1>Error: {errorMyTrainings.message}</h1>
    )

    return (
        <SectionCard>
             <Heading textAlign="center" fontSize="20px" pb={10} color="rgb(66, 203, 237)">トレーニング一覧</Heading>
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
                    {dataMyTrainings?.myTrainings.edges?.map((train) => (
                        <Box key={train.node.id}>
                            <TrainingTr>
                                <Flex alignItems="center">
                                    <TrainingFirstTd isClick={true} onClick={() => setTrainingSelected({
                                        title: train.node.title,
                                        count: train.node.count,
                                        load: train.node.load,
                                        distance: train.node.distance,
                                        description: train.node.description,
                                        isModalOpen: true
                                    })}>{train.node.title}</TrainingFirstTd>
                                    <TrainingSecondTd>{train.node.count}</TrainingSecondTd>
                                    <TrainingSecondTd>{train.node.load}</TrainingSecondTd>
                                    <TrainingSecondTd>{train.node.distance}</TrainingSecondTd>
                                    <Flex>
                                        {train.node.niceUser.includes(myId!) ?
                                            <ThumbUpIcon onClick={() => updateTrainingNice(train.node.id, myId!)} /> :
                                            <ThumbUpOutlinedIcon onClick={() => updateTrainingNice(train.node.id, myId!)} /> 
                                        }
                                        <Text pl={2}>{train.node.niceCount}</Text>
                                    </Flex>
                                    <Box pl={3}>
                                        <TrainingIcon iconNumber={train.node.iconNumber} color="white" size="50px" />
                                    </Box>
                                </Flex>
                            </TrainingTr>
                        </Box>
                    ))}
                </CustomTbody>
             </CustomTable>
             <TrainingCreateModal/>
             <TrainingDetailModal />
            <ScheduleCreateModal dataMyTrainings={dataMyTrainings} />
        </SectionCard>
    )
}