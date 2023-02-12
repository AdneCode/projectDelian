import { BombSlot, Box, Player, Room, Rooms } from '../../globalUtility/types';
import { findRoomById, generateNewRooms } from '.';
export const startRoom = (rooms: Rooms, roomId: string) => {
    if (rooms.length === 0) return;
    const startedRoom: Room = findRoomById(rooms, roomId);
    startedRoom.phase = 'Preparing';
    startedRoom.players = startedRoom.players.map((i: Player) => {
        return { ...i, bombs: startedRoom.bombsPerPlayer };
    });
    let boxes = [];
    for (let i = 1; i < startedRoom.boxCount; i++) {
        let bombSlots: BombSlot[] = [];
        for (let j = 0; j < startedRoom.livesPerBox; j++) {
            bombSlots = [...bombSlots, { id: j, bombCount: 0, placedBy: [] }];
        }
        const newBox: Box = {
            id: i,
            bombSlots: bombSlots,
        };
        boxes = [...boxes, newBox];
    }
    console.log(boxes);
    startedRoom.boxes = boxes;
    const startedRooms: Room[] = generateNewRooms(rooms, startedRoom);
    return { startedRooms, startedRoom };
};
