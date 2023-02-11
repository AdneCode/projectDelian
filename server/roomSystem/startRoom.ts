import { Player, Room, Rooms } from '../../globalUtility/types';
import { findRoomById, generateNewRooms } from '.';
export const startRoom = (rooms: Rooms, roomId: string) => {
    if (rooms.length === 0) return;
    const startedRoom = findRoomById(rooms, roomId);
    startedRoom.phase = 'Preparing';
    const startedRooms = generateNewRooms(rooms, startedRoom);
    return { startedRooms, startedRoom };
};
