import { GameProp } from '../../../../globalUtility/types';
import { useEffect, useContext, useState } from 'react';
import { messageReducer, messageArrayReducer } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { SocketContext } from '../../socket/socket';
import { Data } from '../../../../globalUtility/types';
import { selectMessages } from '../../store';

export const Messages = () => {
    const messageOffset = 2;
    const socket = useContext(SocketContext);
    const dispatch = useAppDispatch();
    const messages = useAppSelector(selectMessages());
    const [offset, setOffset] = useState<number>(messageOffset);

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

    // useEffect(() => {
    //     if (!game.messages || game.messages.length === 0) return;
    //     dispatch(messageArrayReducer(game.messages));
    // }, [game]);

    useEffect(() => {
        const onScroll = (e: any) => {
            if (
                e.deltaY > 0 &&
                messages &&
                offset < messages.length - messageOffset - 1
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
        return () => {
            window.removeEventListener('wheel', onScroll);
        };
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
        if (
            messages.length <= messageOffset ||
            (index >= offset - messageOffset && index <= offset + messageOffset)
        )
            return (
                <div key={index} className="py-4">
                    <h1>{i}</h1>
                </div>
            );
    });
    return (
        <>
            {renderedMessages} {offset - messageOffset}
        </>
    );
};
