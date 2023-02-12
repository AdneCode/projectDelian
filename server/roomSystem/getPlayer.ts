import { Player } from '../../globalUtility/types';
export const getPlayer = (socketId: string, players: Player[]) => {
    const foundPlayer = players.find((i: Player) => {
        return i.id === socketId;
    });
    return foundPlayer;
};
