import { Box, Room } from '../../globalUtility/types';

export const findBoxById = (room: Room, boxId: number): Box => {
    const foundBox = room.boxes.find((i: Box) => {
        return i.id === boxId;
    });
    return foundBox;
};
