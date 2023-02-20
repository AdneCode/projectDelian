import { Player, Room } from '../../globalUtility/types';

//Takes the room and the socketId of the leaver, returns a new hostId
export const getNewHost = (room: Room, socketId: string): string | null => {
    const newHost = room.players.find((i: Player) => {
        if (i.id !== socketId) return true;
        return false;
    });
    if (!newHost) return null;
    console.log(`This user was also host. New hostId is ${newHost.id}`);
    return newHost.id;
};
