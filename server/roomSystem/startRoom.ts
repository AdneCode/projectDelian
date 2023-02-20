import { BombSlot, Box, Player, Room, Rooms } from '../../globalUtility/types';
import { findRoomById, generateNewRooms, emitToRoom, getPlayer } from '.';
export const startRoom = (rooms: Rooms, roomId: string) => {
    if (rooms.length === 0) return;
    const startedRoom: Room = findRoomById(rooms, roomId);
    startedRoom.phase = 'Preparing';
    startedRoom.players = startedRoom.players.map((i: Player) => {
        return { ...i, bombs: startedRoom.bombsPerPlayer };
    });
    let boxes = [];
    for (let i = 1; i <= startedRoom.boxCount; i++) {
        let bombSlots: BombSlot[] = [];
        for (let j = 0; j < startedRoom.livesPerBox; j++) {
            bombSlots = [...bombSlots, { id: j, bombCount: 0, placedBy: [] }];
        }
        const newBox: Box = {
            id: i,
            lives: startedRoom.livesPerBox,
            bombSlots: bombSlots,
        };
        boxes = [...boxes, newBox];
    }
    console.log(`Started room ${startedRoom.id}`);
    startedRoom.boxes = boxes;
    const turnTable = startedRoom.players.map((i: Player) => {
        return i.id;
    });

    startedRoom.turnTable = turnTable;
    startedRoom.currentTurn = turnTable[0];

    const newRooms: Room[] = generateNewRooms(rooms, startedRoom);
    return { newRooms, startedRoom };
};
