import { Game, Rooms } from '../../globalUtility/types';
const { v4: uuidv4 } = require('uuid');
export const createRoom = (rooms: Rooms, hostName: string, hostId: string) => {
    const room: Game = {
        id: uuidv4().split('-')[0],
        hostId,
        players: [
            {
                name: hostName,
                id: hostId,
                bombs: null,
                playerId: null,
                isSpectator: false,
            },
        ],
        phase: 'PreGame',
        bombsPerPlayer: 3,
        boxCount: 2,
        livesPerBox: 10,
        boxes: null,
        turnTable: null,
        currentTurn: null,
    };
    return { newRooms: [...rooms, room], newRoom: room };
};
