import { useContext } from 'react';
import { Player as PlayerType } from '../../../../globalUtility/types';
import { SocketContext } from '../../socket/socket';

export function Player(p: { player: PlayerType }) {
    const socket = useContext(SocketContext);
    const { player } = p;
    return (
        <div>
            {player.name} {player.id === socket.id ? 'SELF' : 'NOT SELF'}
        </div>
    );
}
