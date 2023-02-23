import { useContext } from 'react';
import { GameProp, Player } from '../../../../globalUtility/types';
import { SocketContext } from '../../socket/socket';

export const SpectatorToggle = (p: GameProp) => {
    const socket = useContext(SocketContext);
    const { game } = p;
    const self = game.players.find((i: Player) => {
        return i.id === socket.id;
    });
    if (!self) return <></>;
    return (
        <input
            type="checkbox"
            checked={self.isSpectator}
            onClick={() => socket.emit('toggleSpectator')}
        />
    );
};
