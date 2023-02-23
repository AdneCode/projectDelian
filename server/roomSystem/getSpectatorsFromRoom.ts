import { Player, Room } from '../../globalUtility/types';

//returns an array with the id of all spectators from a given room
export const getSpectatorsFromRoom = (room: Room): string[] => {
    const spectatorIdArray = room.players
        .filter((i: Player) => {
            return i.isSpectator;
        })
        .map((i: Player) => {
            return i.id;
        });
    return spectatorIdArray;
};
