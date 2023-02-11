import { useContext } from 'react';
import { SocketContext } from '../../socket/socket';
import { Data } from '../../../../globalUtility/types';

const CreateRoomButton = (p: { name: string }) => {
    const { name } = p;
    const socket = useContext(SocketContext);
    const createRoom = () => {
        const data: Data = { playerName: name };
        socket.emit('createRoom', data);
    };

    return <button onClick={() => createRoom()}>Create game</button>;
};

export { CreateRoomButton };
