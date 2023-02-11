import { Player, Room } from '../../globalUtility/types';

export const roomHasSocketId = (room: Room, socketId: string) => {
    const foundPlayer = room.players.find((i: Player) => i.id === socketId);
    if (!foundPlayer) return false;
    return true;
};
