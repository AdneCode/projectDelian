import { Rooms, Game, Settings, Room } from '../../globalUtility/types';
const globalSettings = {
    minBombsPerPlayer: 1,
    maxBombsPerPlayer: 100,
    minBoxCount: 2,
    maxBoxCount: 25,
    minBoxLives: 1,
    maxBoxLives: 100,
};

export const setSettings = (
    rooms: Rooms,
    socketId: string,
    settings: Settings,
    roomId: string,
): { newRooms: Rooms; newRoom: Game | null } => {
    let newRoom = null;
    if (
        settings.bombsPerPlayer > globalSettings.maxBombsPerPlayer ||
        settings.bombsPerPlayer < globalSettings.minBombsPerPlayer ||
        settings.boxCount < globalSettings.minBoxCount ||
        settings.boxCount > globalSettings.maxBoxCount ||
        settings.livesPerBox < globalSettings.minBoxLives ||
        settings.livesPerBox > globalSettings.maxBoxLives
    ) {
        const newRooms = rooms;
        newRoom = rooms.find((i: Room) => {
            return i.id === roomId;
        });
        return { newRooms, newRoom };
    }
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
