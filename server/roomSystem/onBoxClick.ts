import { Box, Rooms, Room } from '../../globalUtility/types';
import {
    findRoomById,
    findBoxById,
    bombSlotHasBombs,
    getNewTurn,
    getPlayer,
    emitToRoom,
    countBombsInSlot,
} from '.';

export const onBoxClick = (
    rooms: Rooms,
    roomId: string,
    boxId: number,
    playerId: string,
    io: any,
): Room | null => {
    const foundRoom = findRoomById(rooms, roomId);
    if (foundRoom.currentTurn !== playerId) return null;
    const newTurnId = getNewTurn(foundRoom);
    let playerFoundBomb: boolean = false;
    const foundBox: Box = findBoxById(foundRoom, boxId);
    if (bombSlotHasBombs(foundBox.bombSlots[foundBox.lives - 1])) {
        playerFoundBomb = true;
    }
    if (playerFoundBomb) {
        emitToRoom(
            rooms,
            foundRoom.id,
            {
                message: `${
                    getPlayer(playerId, foundRoom.players).name
                } found ${countBombsInSlot(
                    foundBox.bombSlots[foundBox.lives - 1],
                )} bombs. It's now the turn of ${
                    getPlayer(newTurnId, foundRoom.players).name
                }`,
            },
            io,
            'receiveMessage',
        );
    }
    if (!playerFoundBomb) {
        emitToRoom(
            rooms,
            foundRoom.id,
            {
                message: `${
                    getPlayer(playerId, foundRoom.players).name
                } found no bombs.`,
            },
            io,
            'receiveMessage',
        );
    }
    //HIER
    const newBox = { ...foundBox, lives: foundBox.lives - 1 };
    const newBoxes = foundRoom.boxes.map((i: Box) => {
        if (i.id === boxId) return newBox;
        return i;
    });
    return { ...foundRoom, boxes: newBoxes, currentTurn: newTurnId };
};
