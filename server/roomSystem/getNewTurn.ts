import { Room } from '../../globalUtility/types';

export const getNewTurn = (room: Room) => {
    const { currentTurn, turnTable } = room;
    const currentIndex = turnTable.findIndex((i: string) => currentTurn === i);
    if (turnTable.length === currentIndex) {
        return turnTable[0];
    }
    return turnTable[currentTurn + 1];
};
