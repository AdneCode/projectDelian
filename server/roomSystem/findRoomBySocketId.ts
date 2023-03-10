import { Room } from '../../globalUtility/types';
import { roomHasSocketId } from './roomHasSocketId';
//return the room the socketId is in that is provided
export const findRoomBySocketId = (rooms: Room[], socketId: string) => {
    return rooms.find((i: Room) => {
        return roomHasSocketId(i, socketId);
    });
};
