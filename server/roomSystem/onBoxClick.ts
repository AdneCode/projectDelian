import { Box, Rooms } from '../../globalUtility/types';
import { findRoomById, findBoxById, generateNewRooms, getNewTurn } from '.';

export const onBoxClick = (
    rooms: Rooms,
    roomId: string,
    boxId: number,
    playerId: string,
) => {
    const foundRoom = findRoomById(rooms, roomId);
    if (foundRoom.currentTurn !== playerId) return null;
    const foundBox = findBoxById(foundRoom, boxId);

    const newBox = { ...foundBox, lives: foundBox.lives - 1 };
    const newBoxes = foundRoom.boxes.map((i: Box) => {
        if (i.id === boxId) return newBox;
        return i;
    });
    const newTurnId = getNewTurn(foundRoom);
    const newRoom = { ...foundRoom, boxes: newBoxes, currentTurn: newTurnId };
    const newRooms = generateNewRooms(rooms, newRoom);

    return { newRoom, newRooms };
};
