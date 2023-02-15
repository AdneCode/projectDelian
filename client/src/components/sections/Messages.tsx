import { GameProp } from '../../../../globalUtility/types';
import { useEffect, useContext } from 'react';
import { messageReducer, messageArrayReducer } from '../../store';
import { useAppDispatch } from '../../hooks/hooks';
import { SocketContext } from '../../socket/socket';
import { Data } from '../../../../globalUtility/types';

export const Messages = (p: GameProp) => {
    const socket = useContext(SocketContext);
    const dispatch = useAppDispatch();
    const { game } = p;
    useEffect(() => {
        socket.on('receiveMessage', (data: Data) => {
            if (!data.message) return;
            dispatch(messageReducer(data.message));
        });
        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    useEffect(() => {
        if (!game.messages || game.messages.length === 0) return;
        dispatch(messageArrayReducer(game.messages));
    }, [game]);

    return <div>Messages</div>;
};
