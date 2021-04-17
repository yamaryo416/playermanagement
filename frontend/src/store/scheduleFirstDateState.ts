import { atom } from 'recoil'
import { STARTDATE } from '../constants';

export const scheduleFirstDateState = atom({
    key: "scheduleFirstDateState",
    default: STARTDATE,
});