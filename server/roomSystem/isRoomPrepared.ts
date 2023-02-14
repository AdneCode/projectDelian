import { Player, Room } from '../../globalUtility/types';

//Checks whether the total bomb count in a room during preparing phase is 0
export const isRoomPrepared = (room: Room): boolean => {
    const bombCountArray = room.players.map((i: Player) => {
        if (!i.bombs) return 0;
        return i.bombs;
    });
    const sum = bombCountArray.reduce((i: number, j: number) => {
        return i + j;
    });
    return sum === 0;
};
