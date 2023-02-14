import { useEffect, useContext } from 'react';
import { Data, GameProp } from '../../../../globalUtility/types';
import { SocketContext } from '../../socket/socket';
import { useAppDispatch } from '../../hooks/hooks';
import { gameReducer } from '../../store';
import { BoxList } from '../boxes/BoxList';
import './scale.css';

export function InGame(p: GameProp) {
    const { game } = p;
    const socket = useContext(SocketContext);
    const dispatch = useAppDispatch();
    useEffect(() => {
        socket.on('sendRoom', (data: Data) => {
            if (!data.room) return;
            dispatch(gameReducer({ type: 'GAME_RECEIVED', game: data.room }));
            dispatch(
                gameReducer({ type: 'PHASE_CHANGE', phase: data.room.phase }),
            );
        });
        socket.on('getRoom', (data: Data) => {
            console.log(data);
        });
        return () => {
            socket.off('sendRoom');
            socket.off('getRoom');
        };
    }, []);

    return (
        <div className="scale">
            <div className="w-1/2">
                <button onClick={() => socket.emit('testing')}>TEST</button>

                <BoxList game={game} />
            </div>
        </div>
    );
}
