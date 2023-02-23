import { Player, Room } from '../../globalUtility/types';
import { getPlayersFromRoom } from './getPlayersFromRoom';

//takes a room and returns a new room with the spectator status changed
export const toggleSpectator = (room: Room, socketId: string) => {
    console.log(room);
    console.log(room.players);
    const players = getPlayersFromRoom(room);
    console.log(players);
    const newPlayer = players.find((i: Player) => {
        return i.id === socketId;
    });
    const newPlayers = players.map((i: Player) => {
        if (i.id === socketId) {
            return { ...i, isSpectator: !i.isSpectator };
        }
        return i;
    });
    newPlayer.isSpectator = !newPlayer.isSpectator;
    return { ...room, players: newPlayers };
};
