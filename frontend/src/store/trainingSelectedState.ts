import { atom } from 'recoil'

type trainingSelectedStateStateType = {
    title: string;
    count: number | null;
    distance: number | null;
    description: string;
}

export const trainingSelectedState = atom<trainingSelectedStateStateType>({
    key: "trainingSelectedState",
    default: {
        title: "",
        count: null,
        distance: null,
        description: ""
    }
});