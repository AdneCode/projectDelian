import { Rooms, Room } from '../../globalUtility/types';
export const findRoomById = (rooms: Rooms, roomId: string): Room => {
    return rooms.find((i: Room) => i.id === roomId);
};
