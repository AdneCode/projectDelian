import { Room, Rooms } from '../../globalUtility/types';
export const generateNewRooms = (rooms: Rooms, newRoom: Room): Rooms => {
    return rooms.map((i: Room) => {
        if (i.id === newRoom.id) return newRoom;
        return i;
    });
};
