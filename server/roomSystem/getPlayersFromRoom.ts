import { Player, Room } from '../../globalUtility/types';

export const getPlayersFromRoom = (room: Room): Player[] => {
    return room.players;
};
