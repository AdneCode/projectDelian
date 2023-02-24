import { Room } from '../../globalUtility/types';

export const getNewTurn = (room: Room): string => {
    const { currentTurn, turnTable } = room;
    const currentIndex = turnTable.findIndex((i: string) => currentTurn === i);

    if (turnTable.length === currentIndex + 1 || turnTable.length <= 1) {
        return turnTable[0];
    }
    return turnTable[currentIndex + 1];
};
