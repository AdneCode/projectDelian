import { GameProp } from '../../../../globalUtility/types';
import { useEffect, useContext } from 'react';
import { messageReducer, messageArrayReducer } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { SocketContext } from '../../socket/socket';
import { Data } from '../../../../globalUtility/types';
import { selectMessages } from '../../store';

export const Messages = (p: GameProp) => {
    const socket = useContext(SocketContext);
    const dispatch = useAppDispatch();
    const messages = useAppSelector(selectMessages());
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

    return (
        <div>
            <DisplayedMessages messages={messages} />
        </div>
    );
};

const DisplayedMessages = (p: { messages: string[] | null }) => {
    const { messages } = p;
    if (!messages) return <>No messages</>;
    const renderedMessages = messages.map((i: string) => {
        return <h1>{i}</h1>;
    });
    return <>{renderedMessages}</>;
};
