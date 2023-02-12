import { useContext } from 'react';
import { Box as BoxType, Game } from '../../../../globalUtility/types';
import { SocketContext } from '../../socket/socket';
import { Box } from './Box';

export const BoxList = (p: {
    game: Game;
    sendData: { bombs: number; slot: number };
}) => {
    const { game, sendData } = p;
    return (
        <>
            <Boxes game={game} sendData={sendData} />
        </>
    );
};

const Boxes = (p: {
    game: Game;
    sendData: { bombs: number; slot: number };
}) => {
    const socket = useContext(SocketContext);
    const fillSlot = (boxId: number, bombs: number, slot: number) => {
        const data = {
            roomId: game.id,
            boxId: boxId,
            slotId: slot,
            bombCount: bombs,
        };
        socket.emit('fillSlot', data);
    };
    const { game, sendData } = p;
    if (!game.boxes) return <></>;
    const boxes = game.boxes.map((i: BoxType) => {
        return (
            <div
                key={i.id + 2}
                onClick={() => fillSlot(i.id, sendData.bombs, sendData.slot)}
            >
                <Box key={i.id} id={i.id} />
            </div>
        );
    });
    return <>{boxes}</>;
};
