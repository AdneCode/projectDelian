import { useEffect, useContext } from 'react';
import { Data, GameProp } from '../../../../globalUtility/types';
import { SocketContext } from '../../socket/socket';
import { useAppDispatch } from '../../hooks/hooks';
import { gameReducer } from '../../store';
import './scale.css';
import { BoxList } from '../boxes/BoxList';

export function Preparing(p: GameProp) {
    const { game } = p;
    const socket = useContext(SocketContext);
    const dispatch = useAppDispatch();
    console.log(game);
    useEffect(() => {
        socket.on('sendRoom', (data: Data) => {
            if (!data.room) return;
            dispatch(gameReducer({ type: 'GAME_RECEIVED', game: data.room }));
            dispatch(
                gameReducer({ type: 'PHASE_CHANGE', phase: data.room.phase }),
            );
        });
        return () => {
            socket.off('sendRoom');
        };
    }, []);
    return (
        <div className="scale">
            <div className="w-1/2">
                <BoxList game={game} />
            </div>
        </div>
    );
}
