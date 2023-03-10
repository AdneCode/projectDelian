import { Player, Room, Rooms } from '../../globalUtility/types';
export const joinRoom = (
    rooms: Rooms,
    roomId: string,
    playerName: string,
    socketId: string,
) => {
    if (rooms.length === 0) return;
    const newPlayer: Player = {
        name: playerName,
        id: socketId,
        bombs: null,
        playerId: null,
        isSpectator: false,
    };
    const room = rooms.find((i: Room) => i.id === roomId);
    const newPlayers = [...room.players, newPlayer];
    const newRoom = { ...room, players: newPlayers };
    const newRooms = rooms.map((i: Room) => {
        if (i.id === roomId) return newRoom;
        return i;
    });
    return { newRooms, newRoom };
};
