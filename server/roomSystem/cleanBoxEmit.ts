import { Box, Room } from '../../globalUtility/types';

//cleans all boxes in a room from their bombslots, used when emitting roomData to client
export const cleanBoxEmit = (room: Room) => {
    if (!room.boxes) {
        return room;
    }
    const cleanedBoxes = room.boxes.map((i: Box) => {
        if (!i) return i;
        return { id: i.id, lives: i.lives };
    });
    return { ...room, boxes: cleanedBoxes };
};
