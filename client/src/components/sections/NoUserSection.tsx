import { useState, useContext, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { SocketContext } from '../../socket/socket';
import { CreateRoomButton } from '../buttons';
import { Data } from '../../../../globalUtility/types';
import { gameReducer } from '../../store';

export function NoUserSection() {
    const dispatch = useAppDispatch();
    const [name, setName] = useState<string>('');
    const [roomId, setRoomId] = useState<string>('');
    const socket = useContext(SocketContext);
    const joinRoom = () => {
        const data: Data = { playerName: name, roomId };
        socket.emit('joinRoom', data);
    };
    useEffect(() => {
        socket.on('sendRoom', (data: Data) => {
            console.log(data);
            if (!data.room) return;
            dispatch(gameReducer({ type: 'GAME_RECEIVED', game: data.room }));
            dispatch(gameReducer({ type: 'SET_CONNECTED' }));
        });
        return () => {
            socket.off('sendRoom');
        };
    }, []);
    return (
        <>
            <CreateRoomButton name={name} />
            <div>
                <input
                    className="text-black"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="text-black"
                    placeholder="Room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                />
                <button onClick={() => joinRoom()}>Join game</button>
            </div>
        </>
    );
}
