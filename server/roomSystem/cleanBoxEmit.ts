import { Box, Room } from '../../globalUtility/types';

//cleans all boxes in a room from their bombslots, used when emitting roomData to client
export const cleanBoxEmit = (room: Room) => {
    const cleanedBoxes = room.boxes.map((i: Box) => {
        return { id: i.id, lives: i.lives };
    });

    return { ...room, boxes: cleanedBoxes };
};
