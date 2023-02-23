import { GameProp } from '../../../../globalUtility/types';
import { useEffect, useContext, useState } from 'react';
import { messageReducer, messageArrayReducer } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { SocketContext } from '../../socket/socket';
import { Data } from '../../../../globalUtility/types';
import { selectMessages } from '../../store';

export const Messages = (p: GameProp) => {
    const messageOffset = 3;
    const socket = useContext(SocketContext);
    const dispatch = useAppDispatch();
    const messages = useAppSelector(selectMessages());
    const [offset, setOffset] = useState<number>(messageOffset);

    const { game } = p;
    useEffect(() => {
        socket.on('receiveMessage', (data: Data) => {
            if (!data.message) return;
            dispatch(messageReducer(data.message));
            setOffset(messageOffset);
        });
        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    useEffect(() => {
        if (!game.messages || game.messages.length === 0) return;
        dispatch(messageArrayReducer(game.messages));
    }, [game]);

    useEffect(() => {
        const onScroll = (e: any) => {
            if (
                e.deltaY > 0 &&
                messages &&
                offset < messages.length - messageOffset
            ) {
                setOffset(offset + 1);
            }
            if (e.deltaY < 0 && messages && offset > messageOffset) {
                setOffset(offset - 1);
            }
        };
        console.log(offset);
        window.removeEventListener('wheel', onScroll);
        window.addEventListener('wheel', onScroll, { passive: true });
    }, [offset]);

    return (
        <div>
            <DisplayedMessages
                messages={messages}
                messageOffset={messageOffset}
                offset={offset}
            />
        </div>
    );
};

const DisplayedMessages = (p: {
    messages: string[] | null;
    messageOffset: number;
    offset: number;
}) => {
    const { messages, messageOffset, offset } = p;
    if (!messages) return <>No messages</>;
    const renderedMessages = messages.map((i: string, index: number) => {
        console.log('OFFSET', offset);
        console.log(index);

        if (index - messageOffset < offset && index + messageOffset > offset)
            return (
                <div key={index}>
                    <h1>{i}</h1>
                </div>
            );
    });
    return <>{renderedMessages}</>;
};
