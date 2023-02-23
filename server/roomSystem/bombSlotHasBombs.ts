import { BombSlot } from '../../globalUtility/types';

export const bombSlotHasBombs = (bombSlot: BombSlot) => {
    if (bombSlot.bombCount > 0) {
        return true;
    }
    return false;
};

export const countBombsInSlot = (bombSlot: BombSlot) => {
    return bombSlot.bombCount;
};
