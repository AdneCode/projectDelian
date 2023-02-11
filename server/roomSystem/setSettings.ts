import { Rooms, Game, Settings, Room } from '../../globalUtility/types';
export const setSettings = (
    rooms: Rooms,
    socketId: string,
    settings: Settings,
    roomId: string,
): { newRooms: Rooms; newRoom: Game | null } => {
    let newRoom = null;
    const newRooms = rooms.map((i: Room) => {
        if (i.id === roomId && i.hostId === socketId) {
            const modifiedRoom = {
                ...i,
                bombsPerPlayer: settings.bombsPerPlayer,
                boxCount: settings.boxCount,
                livesPerBox: settings.livesPerBox,
            };
            newRoom = modifiedRoom;
            return modifiedRoom;
        }
        return i;
    });
    return { newRooms, newRoom };
};
